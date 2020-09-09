import directive from "./clipboard";
import Clipboard from "clipboard";

export default {
  install(Vue) {
    Vue.directive("clipboard", directive);

    Vue.prototype.$copyText = function(text) {
      return new Promise((resolve, reject) => {
        const fakeElement = document.createElement("button");
        const clipboard = new Clipboard(fakeElement, {
          text: () => text,
          action: () => "copy"
        });
        clipboard.on("success", e => {
          clipboard.destroy();
          resolve(e);
        });
        clipboard.on("error", e => {
          clipboard.destroy();
          reject(e);
        });
        fakeElement.click();
      });
    };
  }
};
