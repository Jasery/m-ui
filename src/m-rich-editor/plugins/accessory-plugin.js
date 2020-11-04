import E from "wangeditor";
import uploader from "./uploader";

const { BtnMenu } = E;

const icon = `<svg t="1602670754569" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2471" width="16" height="16" data-spm-anchor-id="a313x.7781069.0.i6"><path d="M672.1 64.2c25.7 0 51.4 6.4 70.7 12.9C820 109.2 865 180 865 263.6c0 51.4-19.3 102.9-57.9 141.5L447 771.6c-12.9 12.9-25.7 19.3-38.6 25.7-12.9 6.4-25.7 6.4-45 6.4-12.9 0-32.2 0-45-6.4-12.9-6.4-25.7-12.9-32.2-25.7-12.9-12.9-19.3-25.7-25.7-38.6-6.4-12.9-6.4-32.1-6.4-45 0-32.2 12.9-64.3 32.2-83.6l328-340.8c6.4-6.4 19.3-12.9 25.7-12.9 12.9 0 25.7 6.4 32.2 12.9 6.4 6.4 12.9 19.3 12.9 25.7-6.4 12.9-6.4 19.3-12.9 32.2L337.7 655.8c-6.4 6.4-12.9 19.3-12.9 32.2 0 19.3 19.3 38.6 38.6 38.6 12.9 0 19.3-6.4 25.7-12.9l360.1-366.5c25.7-25.7 32.1-51.4 32.1-83.6 0-32.2-12.9-57.9-32.1-83.6-19.3-25.7-45-38.6-77.2-38.6s-64.3 12.9-83.6 38.6l-360 366.5c-19.3 19.3-32.2 38.6-45 64.3-19.3 45-19.3 102.9 0 147.9 12.9 25.7 25.7 45 45 64.3 38.6 38.6 83.6 57.9 135 57.9 51.4 0 102.9-19.3 135-57.9L865 462.9c6.4-12.9 12.9-12.9 25.7-12.9 12.9 0 19.3 6.4 25.7 12.9 6.4 6.4 12.9 12.9 12.9 25.7s-6.4 19.3-12.9 25.7L556.3 880.9c-25.7 25.7-57.9 45-90 64.3-32.2 12.9-64.3 19.3-102.9 19.3-38.6 0-70.7-6.4-102.9-19.3s-64.3-32.2-90-64.3c-25.7-25.7-45-57.9-57.9-90-12.8-32.2-19.2-70.8-19.2-102.9 0-38.6 6.4-70.7 19.3-109.3 12.9-32.2 32.2-64.3 57.9-90l360.1-366.5c38.5-38.7 89.9-58 141.4-58z m0 0" p-id="2472"></path></svg>`;

class AccessoryMenu extends BtnMenu {
  constructor(editor) {
    const $elem = E.$(`
      <div class="w-e-menu">
        ${icon}
      </div>`);
    super($elem, editor);
    this.bindDropEvent();
  }

  static menu = "assessory";

  bindDropEvent() {
    let editor = this.editor;
    editor.txt.eventHooks.dropEvents.push(e => {
      const files = e.dataTransfer && e.dataTransfer.files;
      if (!files || !files.length) {
        return;
      }
      let file = files[0];
      if (
        this.isIgnoreFileType(file.name) ||
        this.isForbiddenFileType(file.name)
      ) {
        return;
      }
      this.uploadAccessory(file);
    });
  }

  // 菜单点击事件
  clickHandler() {
    let input = this.getFileInput();
    let uploadAccessory = this.uploadAccessory.bind(this);
    input.onchange = function() {
      let file = this.files[0];
      uploadAccessory(file);
    };
    input.click();
  }

  getFileInput() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    return input;
  }

  tryChangeActive() {}

  isIgnoreFileType(filename) {
    return /\.(jpg|jpeg|png|bmp|gif|webp|docx|mp4)$/i.test(filename);
  }

  isForbiddenFileType(filename) {
    // TODO:
    return /\.(php|exe)/.test(filename);
  }

  uploadAccessory(file) {
    if (this.isForbiddenFileType(file.name)) {
      const customAlert = this.editor.config.customAlert || alert;
      customAlert("禁止上传此类型文件");
      return;
    }
    let editor = this.editor;
    editor.config.showLoading && editor.config.showLoading();
    uploader([file], editor)
      .then(urls => {
        let tag = `<br ><a href="${urls[0]}" target="_blank">附件：${file.name}</a>`;
        editor.cmd.do("insertHTML", tag);
      })
      .catch(msg => {
        let customAlert = editor.config.customAlert || alert;
        customAlert(msg);
      })
      .finally(() => {
        editor.config.hideLoading && editor.config.hideLoading();
      });
  }
}

export default function(editor) {
  editor.menus.extend(AccessoryMenu.menu, AccessoryMenu);
}
