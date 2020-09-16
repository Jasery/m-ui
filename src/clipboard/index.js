import directive from "./clipboard";
import Clipboard from "clipboard";
import { isString } from "../utils";

export default {
  install(Vue) {
    Vue.directive("clipboard", directive);

    Vue.prototype.$copyText = function(options) {
      return new Promise((resolve, reject) => {
        const fakeElement = document.createElement("button");
        let _options = {
          action: () => "copy"
        };
        if (isString(options)) {
          _options.text = () => options;
        } else {
          if (options.action === "cut") {
            _options.action = () => "cut";
          }
          if (options.text) {
            _options.text = () => options.text;
          }
          if (options.target) {
            _options.target = () =>
              options.target instanceof HTMLElement
                ? options.target
                : document.querySelector(options.target);
          }
          if (options.container) {
            _options.container =
              options.container instanceof HTMLElement
                ? options.container
                : document.querySelector(options.container);
          }
        }
        const clipboard = new Clipboard(fakeElement, _options);
        clipboard.on("success", e => {
          e.clearSelection();
          clipboard.destroy();
          resolve(e);
        });
        clipboard.on("error", e => {
          e.clearSelection();
          clipboard.destroy();
          reject(e);
        });
        fakeElement.click();
      });
    };
  }
};
