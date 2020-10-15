import E from "wangeditor";
import docx2html from "docx2html";
import uploader from "./uploader";

const { BtnMenu } = E.menuConstructors;

const icon = `<svg t="1602670824624" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1255" width="16" height="16"><path d="M1006.933333 85.333333H580.266667V34.133333c0-6.826667-3.413333-10.24-6.826667-13.653333s-10.24-3.413333-13.653333-3.413333l-546.133334 136.533333c-6.826667 3.413333-13.653333 10.24-13.653333 17.066667v716.8c0 6.826667 6.826667 13.653333 13.653333 17.066666l546.133334 102.4h3.413333c3.413333 0 6.826667 0 10.24-3.413333 3.413333-3.413333 6.826667-6.826667 6.826667-13.653333v-51.2h426.666666c10.24 0 17.066667-6.826667 17.066667-17.066667V102.4c0-10.24-6.826667-17.066667-17.066667-17.066667zM477.866667 382.293333l-102.4 307.2c-3.413333 6.826667-10.24 10.24-17.066667 10.24s-13.653333-6.826667-17.066667-13.653333l-51.2-187.733333c-3.413333-13.653333-27.306667-13.653333-34.133333 0L204.8 686.08c-3.413333 6.826667-6.826667 13.653333-17.066667 13.653333s-13.653333-6.826667-13.653333-10.24l-102.4-307.2c-3.413333-10.24 3.413333-17.066667 10.24-20.48h6.826667c6.826667 0 13.653333 3.413333 17.066666 10.24l68.266667 201.386667c3.413333 6.826667 10.24 10.24 17.066667 10.24s13.653333-6.826667 17.066666-13.653333l54.613334-197.973334c3.413333-13.653333 27.306667-13.653333 34.133333 0l54.613333 197.973334c3.413333 6.826667 6.826667 13.653333 17.066667 13.653333 6.826667 0 13.653333-3.413333 17.066667-10.24l68.266666-201.386667c3.413333-10.24 13.653333-13.653333 20.48-10.24 0 0 6.826667 10.24 3.413334 20.48z m512 522.24H580.266667v-102.4h324.266666c10.24 0 17.066667-6.826667 17.066667-17.066666s-6.826667-17.066667-17.066667-17.066667H580.266667v-102.4h324.266666c10.24 0 17.066667-6.826667 17.066667-17.066667s-6.826667-17.066667-17.066667-17.066666H580.266667v-102.4h324.266666c10.24 0 17.066667-6.826667 17.066667-17.066667s-6.826667-17.066667-17.066667-17.066667H580.266667v-102.4h324.266666c10.24 0 17.066667-6.826667 17.066667-17.066666s-6.826667-17.066667-17.066667-17.066667H580.266667v-102.4h324.266666c10.24 0 17.066667-6.826667 17.066667-17.066667s-6.826667-17.066667-17.066667-17.066666H580.266667v-102.4h409.6v785.066666z" fill="" p-id="1256"></path></svg>`;

function uploadImage(buffer, editor) {
  let types = {
    FFD8FF: "jpg",
    "89504E": "png",
    "474946": "gif"
  };
  let type = "png";
  let headData = [buffer[0], buffer[1], buffer[2]]
    .map(item => item.toString(16))
    .join("")
    .toUpperCase();
  console.log(headData, types[headData]);
  type = types[headData] || type;

  let fileName = "image." + type;
  let file = new File([buffer], fileName, {
    type: "image/" + type
  });
  return uploader([file], editor);
}

function convertDocx(file, editor) {
  let imgUploaders = [];
  let options = {
    convertImage(buffer) {
      let p = uploadImage(buffer, editor);
      imgUploaders.push(p);
      return p;
    }
  };
  return docx2html(file, options).then(() => {
    imgUploaders.forEach((imgUpload, index) => {
      imgUpload.then(url => {
        let img = editor.$textElem.elems[0].querySelectorAll("img")[index];
        if (img) {
          img.src = url;
        }
      });
    });
    return Promise.all(imgUploaders);
  });
}

class DocxImportMenu extends BtnMenu {
  constructor(editor) {
    const $elem = E.$(
      `<div class="w-e-menu">
        ${icon}
      </div>`
    );
    super($elem, editor);
    this.bindDropEvent(editor);
  }

  static menu = "docx";

  bindDropEvent(editor) {
    editor.txt.eventHooks.dropEvents.push(e => {
      const files = e.dataTransfer && e.dataTransfer.files;
      if (!files || !files.length) {
        return;
      }
      let file = files[0];
      if (!file.name.endsWith(".docx")) {
        return;
      }
      convertDocx(file, editor).then(() => editor.change());
    });
  }

  // 菜单点击事件
  clickHandler() {
    const editor = this.editor;
    const customAlert = this.editor.config.customAlert || alert;
    let input = this.getFileInput();
    input.onchange = function() {
      let file = this.files[0];
      if (!file.name.endsWith(".docx")) {
        customAlert("您选择的不是docx文件，请选择一个docx文件");
        return;
      }
      convertDocx(file, editor).then(() => editor.change());
    };
    input.click();
  }

  getFileInput() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute(
      "accept",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    return input;
  }

  tryChangeActive() {}
}

export default function(editor) {
  editor.menus.extend(DocxImportMenu.menu, DocxImportMenu);
}
