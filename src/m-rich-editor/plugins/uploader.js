export default function uploader(files, editor) {
  let config = editor.config;
  // 服务端地址
  let uploadImgServer = config.uploadImgServer;

  const uploadImgParams = config.uploadImgParams;
  // 参数拼接到 url 中
  const uploadImgParamsWithUrl = config.uploadImgParamsWithUrl;
  // 自定义 header
  const uploadImgHeaders = config.uploadImgHeaders;
  // 上传图片超时时间
  const timeout = config.uploadImgTimeout;

  const formData = new FormData();

  files.forEach(file => {
    formData.append(file.name, file, file.name);
  });

  const uploadImgServerArr = uploadImgServer.split("#");
  uploadImgServer = uploadImgServerArr[0];
  const uploadImgServerHash = uploadImgServerArr[1] || "";
  Object.keys(uploadImgParams || {}).forEach(key => {
    let val = uploadImgParams[key];
    if (uploadImgParamsWithUrl) {
      if (uploadImgServer.indexOf("?") > 0) {
        uploadImgServer += "&";
      } else {
        uploadImgServer += "?";
      }
      uploadImgServer = uploadImgServer + key + "=" + val;
    }
    formData.append(key, val);
  });
  if (uploadImgServerHash) {
    uploadImgServer += "#" + uploadImgServerHash;
  }

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.timeout = timeout;
    xhr.withCredentials = false;

    if (uploadImgHeaders) {
      Object.keys(uploadImgHeaders).forEach(key => {
        xhr.setRequestHeader(key, uploadImgHeaders[key]);
      });
    }

    xhr.open("POST", uploadImgServer);
    xhr.onload = function() {
      if (xhr.status !== 200) {
        reject(xhr.responseText);
      } else {
        try {
          let res = JSON.parse(xhr.responseText);
          if (res && res.errno === 0) {
            resolve(res.data);
          } else {
            let msg = res.msg || xhr.responseText;
            reject(msg);
          }
        } catch (error) {
          reject(xhr.responseText);
        }
      }
    };
    xhr.onerror = function(err) {
      reject(err);
    };
    xhr.send(formData);
  });
}
