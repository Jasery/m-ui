<template>
  <div class="m-login">
    <h3 class="title">{{ title }}</h3>
    <m-form
      :model="model"
      label-width="0"
      ref="form"
      size="large"
      :rules="rules"
    >
      <el-form-item prop="username">
        <el-input
          v-model="model.username"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="model.password"
          placeholder="请输入密码"
          prefix-icon="el-icon-user"
          auto-complete="off"
          @keydown.native.enter="onLogin"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="captchaSrc" prop="captcha">
        <div class="captcha-container">
          <el-input
            v-model="model.captcha"
            placeholder="验证码"
            auto-complete="off"
            @keyup.native.enter="onLogin"
          >
          </el-input>
          <img
            :src="captchaSrc"
            class="cur-p"
            alt="验证码"
            title="点击刷新验证码"
            @click="setCaptcha"
          />
        </div>
      </el-form-item>
      <el-form-item prop="remember">
        <el-checkbox v-model="model.remember" @change="onRememberChange"
          >记住密码</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          style="width: 100%"
          @click="onLogin"
          >登 录</el-button
        >
      </el-form-item>
    </m-form>
  </div>
</template>

<script>
import MForm from "../m-form/MForm.vue";
import { getLocalStore, setLocalStore, removeLocalStore } from "../utils";
import { setMaxDigits, RSAKeyPair, encryptedString } from "./Rsa.js";
import md5 from "blueimp-md5";

const RememberKey = "_m-login-remember_";
const UsernameKey = "_m-login-username_";
const PasswordKey = "_m-login-password_";

export default {
  name: "MLogin",
  components: { MForm },
  props: {
    title: {
      type: String,
      default: "系统登录"
    },
    captchaUrl: {
      type: String,
      default: "/captcha"
    },
    encryptPassword: {
      type: Boolean,
      default: true
    },
    loginHandle: Function
  },

  data() {
    const captchaValidator = (rule, value, callback) => {
      if (this.captchaSrc && !this.model.captcha) {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      model: {},
      captchaSrc: "",
      loading: false,
      captchaError: "",
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
        captcha: [{ validator: captchaValidator }]
      }
    };
  },

  mounted() {
    this.model = {
      username: getLocalStore(UsernameKey),
      password: getLocalStore(PasswordKey),
      remember: getLocalStore(RememberKey, false),
      captcha: undefined
    };
  },

  methods: {
    onRememberChange() {
      setLocalStore(RememberKey, this.model.remember);
    },
    async onLogin() {
      let valid = await this.$refs.form.validate();
      if (valid) {
        let loginData = {
          username: this.model.username,
          password: this.getPassword(),
          captcha: this.model.captcha
        };
        try {
          this.loading = true;
          let res = await this.loginHandle(loginData);
          if (res.ret === 0) {
            this.$emit("success", res.data);
            if (this.model.remember) {
              setLocalStore(UsernameKey, this.model.username);
              setLocalStore(PasswordKey, this.model.password);
            } else {
              removeLocalStore(UsernameKey);
              removeLocalStore(PasswordKey);
            }
          } else {
            this.$message.error(res.msg);
            // TODO: check captcha
            if (res.errcount >= 3) {
              this.setCaptcha();
            }
          }
        } catch (error) {
          this.$message.error(error.message || error);
        } finally {
          this.loading = false;
        }
      }
    },
    setCaptcha() {
      this.captchaSrc = `${this.captchaUrl}?${Math.random()}`;
    },
    getPassword() {
      if (!this.encryptPassword) {
        return this.model.password;
      }
      const rsaN =
        "D1F0795CC5A8D0BE60B83FF555F055CE7A44A0EC17BE365587A39696F76D4067BAE06D0026836E873CDAFC5409F1D53C6C931E6819D9B126516A5320CC30DB1B055B1AD9A2764814F8075659455A320006FD262F72B9AFE7B2778F2D20405CC9510BCE96137D56749BE169475DA6A6FAE4D955775988DFBE47A5E4B4E8494DD9C8658CE8A066D02B9C8165CD6E3C3CC803CA810B62529611A5AB87B9475322D490F9E47A1941BD8CEE395AACDC4A2E55964A03F7C575C036B79CD82490D404AE00F315A0700B8A1FE15C358FD071CDFB29761B78600ACD240DAFEB8516E1C8FF42C38C8E732DAC293FA202444FD218D5DC5DA5308D73363FCFD2EC1CF6D716EF";
      setMaxDigits(259); // 259 => n的十六进制位数/2+3
      const key = new RSAKeyPair("10001", "", rsaN); // 10001 => e的十六进制
      return encryptedString(key, md5(this.model.password));
    }
  }
};
</script>

<style lang="scss" scoped>
.m-login {
  .title {
    text-align: center;
    margin-bottom: 30px;
  }
  .captcha-container {
    display: flex;
  }
}
</style>
