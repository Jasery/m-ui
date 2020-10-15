import E from "wangeditor";
import uploader from "./uploader";
import { gid } from "../../utils";

const { PanelMenu, Panel } = E.menuConstructors;

function insertVideo(src, editor) {
  let video = `<video src="${src}" controls></video>`;
  editor.cmd.do("insertHTML", video);
}

class VideoMenu extends PanelMenu {
  constructor(editor) {
    const $elem = E.$(`
      <div class="w-e-menu">
        <i class="w-e-icon-play"></i>
      </div>`);
    super($elem, editor);
    this.bindDropEvent();
  }

  static menu = "insertVideo";

  bindDropEvent() {
    let editor = this.editor;
    editor.txt.eventHooks.dropEvents.push(e => {
      const files = e.dataTransfer && e.dataTransfer.files;
      if (!files || !files.length) {
        return;
      }
      let file = files[0];
      if (!file.name.endsWith(".mp4")) {
        return;
      }
      this.uploadVideo(file);
    });
  }

  // 菜单点击事件
  clickHandler() {
    this.createPanel();
  }

  createPanel() {
    const conf = this.getPanelConf();
    const panel = new Panel(this, conf);
    panel.create();
  }

  getPanelConf() {
    let editor = this.editor;
    let upTriggerId = gid("__video_upTriggerId");
    let upFileId = gid("__video_upFileId");
    let linkUrlId = gid("__video_linkUrlId");
    let linkBtnId = gid("__video_linkBtnId");
    return {
      width: 300,
      height: 0,
      tabs: [
        {
          title: "上传视频",
          tpl: `<div class="w-e-up-img-container">
                  <div id="${upTriggerId}" class="w-e-up-btn">
                      <i class="w-e-icon-upload2"></i>
                  </div>
                  <div style="display:none;">
                      <input id="${upFileId}" type="file" accept="video/mp4"/>
                  </div>
              </div>`,
          events: [
            {
              selector: "#" + upTriggerId,
              type: "click",
              fn: () => {
                const $file = E.$("#" + upFileId);
                const fileElem = $file.elems[0];
                if (fileElem) {
                  fileElem.click();
                } else {
                  return true;
                }
              }
            },
            {
              selector: "#" + upFileId,
              type: "change",
              fn: () => {
                const $file = E.$("#" + upFileId);
                const fileElem = $file.elems[0];
                if (!fileElem) {
                  return true;
                }

                let file = fileElem.files[0];
                if (!file.name.endsWith(".mp4")) {
                  const customAlert = this.editor.config.customAlert || alert;
                  customAlert("插入视频只支持mp4文件，其他文件请作为附件上传");
                  return;
                }
                this.uploadVideo(file);
                return true;
              }
            }
          ]
        },

        {
          title: "网络视频",
          tpl: `<div>
                  <input
                      id="${linkUrlId}"
                      type="text"
                      class="block"
                      placeholder="视频链接"/>
                  </td>
                  <div class="w-e-button-container">
                      <button id="${linkBtnId}" class="right">插入</button>
                  </div>
              </div>`,
          events: [
            {
              selector: "#" + linkBtnId,
              type: "click",
              fn: () => {
                const $linkUrl = E.$("#" + linkUrlId);
                const url = $linkUrl.val().trim();

                if (!url) return;
                insertVideo(url, editor);
                return true;
              }
            }
          ]
        }
      ]
    };
  }

  uploadVideo(file) {
    let editor = this.editor;
    editor.config.showLoading && editor.config.showLoading();
    uploader([file], editor)
      .then(urls => {
        insertVideo(urls[0], editor);
      })
      .catch(msg => {
        let customAlert = editor.config.customAlert || alert;
        customAlert(msg);
      })
      .finally(() => {
        editor.config.hideLoading && editor.config.hideLoading();
      });
  }

  tryChangeActive() {}
}

export default function(editor) {
  editor.menus.extend(VideoMenu.menu, VideoMenu);
}
