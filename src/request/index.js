import axios from "axios";

const defaultConfig = {
  timeout: 5000,
  validateStatus(status) {
    return status >= 200 && status < 500;
  }
};

const commonRequestInterceptor = [
  config => {
    if (globalHeaders) {
      const otherHeaders = globalHeaders();
      if (otherHeaders) {
        config.headers = {
          ...config.headers,
          ...otherHeaders
        };
      }
    }
    return config;
  }
];

let instance;
let globalHeaders;
let requestInterceptorId;

function setConfig(config = {}) {
  let cfg = Object.assign({}, defaultConfig, config);
  instance = axios.create(cfg);
  requestInterceptorId = addRequestInterceptor(...commonRequestInterceptor);
}
setConfig();

const setGlobalHeader = func => {
  globalHeaders = func;
};

function addRequestInterceptor(onFulfilled, onRejected) {
  let isCommon = onFulfilled === commonRequestInterceptor[0];
  if (!isCommon) {
    instance.interceptors.request.eject(requestInterceptorId);
  }
  let ret = instance.interceptors.request.use(onFulfilled, onRejected);
  if (!isCommon) {
    addRequestInterceptor(...commonRequestInterceptor);
  }
  return ret;
}

function addResponseInterceptor(onFulfilled, onRejected) {
  return instance.interceptors.response.use(onFulfilled, onRejected);
}

function request(...args) {
  return instance.request(...args);
}

function post(...args) {
  return instance.post(...args);
}

function put(...args) {
  return instance.put(...args);
}

function patch(...args) {
  return instance.patch(...args);
}

function del(url, params, options = {}) {
  options.params = params;
  return instance.delete(url, options);
}

function get(url, params, options = {}) {
  options.params = params;
  return instance.get(url, options);
}

export default {
  instance,
  setConfig,
  setGlobalHeader,
  addRequestInterceptor,
  addResponseInterceptor,
  request,
  get,
  del,
  patch,
  put,
  post
};
