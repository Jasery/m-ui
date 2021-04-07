import FileSaver from "file-saver";

import { isString } from "../utils";

const defaultOptions = {
  filename: "",
  url: "",
  method: "get",
  data: null,
  content: null
};

function getUrlString(url = "", data = {}) {
  if (!url.startsWith("http")) {
    if (!url.startsWith("/")) {
      let pathname = location.pathname;
      if (!pathname.endsWith("/")) {
        pathname = pathname + "/";
      }
      url = pathname + url;
    }
    let base = window.__POWERED_BY_QIANKUN__
      ? window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
      : window.location.origin;
    url = base + url;
  }
  let urlObject = new URL(url);
  Object.keys(data || {}).forEach(key => {
    urlObject.searchParams.set(key, data[key]);
  });
  console.log(urlObject.toString());
  return urlObject.toString();
}

/**
 * 下载文件
 * @param {Object}} options 下载配置
 */
function download(options) {
  if (isString(options)) {
    options = {
      url: options
    };
  }
  options = Object.assign({}, defaultOptions, options);
  if (options.content) {
    if (!options.filename) {
      throw new Error("[m-ui] download.js: filename is required.");
    }
    let file;
    if (options.content instanceof Blob) {
      file = options.content;
    } else if (isString(options.content)) {
      file = new File([options.content], { type: "text/plain;charset=utf-8" });
    } else {
      throw new Error("[m-ui] download.js: content not support.");
    }
    FileSaver.saveAs(file, options.filename);
  } else {
    if (!options.url) {
      throw new Error("[m-ui] download.js: url is required.");
    }
    if (options.method.toLowerCase() === "get") {
      FileSaver.saveAs(
        getUrlString(options.url, options.data),
        options.filename
      );
    } else {
      let form = document.createElement("form");
      form.style.display = "none";
      form.enctype = "multipart/form-data";
      form.target = "_blank";
      form.method = "post";
      form.action = getUrlString(options.url);
      Object.keys(options.data || {}).forEach(key => {
        let value = options.data[key];
        let input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = isString(value) ? value : JSON.stringify(value);
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    }
  }
}

download.install = function(Vue) {
  Vue.prototype.$download = download;
};

export default download;
