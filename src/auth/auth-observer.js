const defaultOptions = {
  // 没有权限信息时返回的默认鉴权结果
  defaultAuth: true
};

export default class AuthObserver {
  constructor(options = {}) {
    this.__options = Object.assign({}, defaultOptions, options);
    this.__authData = null;
    this.__listeners = new Map();
  }

  subscribe(context, func) {
    if (this.__listeners.has(context)) {
      let listener = this.__listeners.get(context);
      listener.push(func);
    } else {
      this.__listeners.set(context, [func]);
    }
    if (this.__authData) {
      this._callSubscribe(context, func);
    }
  }

  _callSubscribe(context, func) {
    let _call = (f, context, ...args) => {
      try {
        f.call(context, ...args);
      } catch (e) {
        console.error("error in auth subscribe", e);
      }
    };
    if (func) {
      _call(func, context, this);
    } else {
      let listeners = this.__listeners.get(context) || [];
      for (let f of listeners) {
        _call(f, context, this);
      }
    }
  }

  unsubscribe(context, func) {
    if (this.__listeners.has(context)) {
      if (func) {
        let listeners = this.__listeners.get(context).filter(f => f !== func);
        if (listeners.length) {
          this.__listeners.set(context, listeners);
        } else {
          this.__listeners.delete(context);
        }
      } else {
        this.__listeners.delete(context);
      }
    }
  }

  setAuth(data) {
    this.__authData = data;
    for (let [context] of this.__listeners) {
      this._callSubscribe(context);
    }
  }

  checkAuth(key) {
    if (!this.__authData) {
      return this.__options.defaultAuth;
    }
    if (typeof key !== "string") {
      throw new Error("auth key must be string");
    }
    let authKeys = key.split(".");
    if (!authKeys.length) {
      return true;
    }
    let authObj = this.__authData;
    for (let authKey of authKeys) {
      if (!authObj[authKey]) {
        return false;
      }
      authObj = authObj[authKey];
    }
    return true;
  }

  hasSetAuth() {
    return !!this.__authData;
  }

  destroy() {
    this.__options = null;
    this.__authData = null;
    this.__listeners.clear();
    this.__listeners = null;
  }
}
