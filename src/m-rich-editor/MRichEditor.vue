<template>
  <div class="m-rich-editor">
    <div class="editor" :id="id"></div>
    <div
      class="loading"
      v-show="loading"
      v-loading="loading"
      ref="loading"
    ></div>
  </div>
</template>

<script>
import E from "wangeditor";
import { gid, objEach } from "../utils";
import docxImagePlugin from "./plugins/docx-image-plugin";
import excelPastePlugin from "./plugins/excel-paste-plugin";
import videoPlugin from "./plugins/video-plugin";
import accessoryPlugin from "./plugins/accessory-plugin";

export default {
  name: "MRichEditor",
  components: {},
  props: {
    value: String,
    height: {
      type: Number,
      default: 500
    },
    placeholder: String,
    uploadUrl: {
      type: String,
      default: "/upload"
    },
    memus: {
      type: Array,
      default() {
        return [
          "head",
          "bold",
          "fontSize",
          "fontName",
          "italic",
          "underline",
          "strikeThrough",
          "indent",
          "lineHeight",
          "foreColor",
          "backColor",
          "link",
          "list",
          "justify",
          "quote",
          "emoticon",
          "image",
          "insertVideo",
          "table",
          "code",
          "splitLine",
          "undo",
          "redo",
          "docx",
          "assessory"
        ];
      }
    },
    editorOptions: Object,
    disabled: Boolean
  },
  data() {
    return {
      id: "",
      loading: false
    };
  },
  watch: {
    disabled: "setEditorStatus"
  },
  created() {
    this.id = gid("__m_rich_editor__");
  },
  mounted() {
    const editor = new E("#" + this.id);
    this.editor = editor;
    this.initConfig(editor);
    this.initPlugins(editor);
    editor.create();
    if (this.value) {
      editor.txt.html(this.value);
    }
    this.setEditorStatus();
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
    }
  },
  methods: {
    initConfig(editor) {
      editor.config.height = this.height;
      editor.config.placeholder = this.placeholder || "";
      editor.config.pasteFilterStyle = false;
      editor.config.onchange = newHtml => {
        this.$emit("input", newHtml);
        this.$emit("change", newHtml);
      };
      editor.config.uploadImgServer = this.uploadUrl;
      editor.config.customAlert = this.$message.error || alert;
      editor.config.menus = this.memus;
      editor.config.showLoading = this.showLoading.bind(this);
      editor.config.hideLoading = this.hideLoading.bind(this);
      if (this.editorOptions) {
        objEach(this.editorOptions, (key, value) => {
          this.editor.config[key] = value;
        });
      }
    },

    initPlugins(editor) {
      docxImagePlugin(editor);
      excelPastePlugin(editor);
      videoPlugin(editor);
      accessoryPlugin(editor);
    },

    getEditor() {
      return this.editor;
    },

    setEditorStatus() {
      if (this.editor) {
        this.editor.$textElem.attr("contenteditable", !this.disabled);
      }
    },

    showLoading() {
      let editorContainer = this.$el.querySelector(".w-e-text-container");
      let rect = editorContainer.getBoundingClientRect();
      let loadingEl = this.$refs.loading;
      loadingEl.style.top = rect.top + "px";
      loadingEl.style.left = rect.left + "px";
      loadingEl.style.width = rect.width + "px";
      loadingEl.style.height = rect.height + "px";
      this.loading = true;
    },

    hideLoading() {
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.m-rich-editor {
  .loading {
    position: fixed;
    z-index: 10086;
  }
}
</style>
