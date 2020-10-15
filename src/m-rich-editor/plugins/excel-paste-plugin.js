import _ from "lodash";
import { objEach } from "../../utils";

function convertClass(styleContent = "") {
  styleContent = styleContent.trim().replace(/(<!--|-->)/g, "");
  let styleReg = /\s*\..*\s+{([^}]*|\s|\n)+}/gm;
  let result = styleReg.exec(styleContent);
  let classes = {};
  while (result) {
    let classContent = result[0];
    if (classContent) {
      let tempArr = classContent.split("{");
      let name = tempArr[0].trim().replace(".", "");
      let stylesObj = tempArr[1]
        .replace("}", "")
        .split(";")
        .map(item => item.split(":").map(s => s.trim()))
        .filter(arr => arr[1] && !arr[1].startsWith('"'))
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
      classes[name] = stylesObj;
    }
    result = styleReg.exec(styleContent);
  }
  return classes;
}

export default function excelPastePlugin(editor) {
  function pasteHook(e) {
    const clipboardData = e.clipboardData;
    let pasteHtml = "";
    if (clipboardData) {
      pasteHtml = clipboardData.getData("text/html");
    }
    if (!pasteHtml) {
      return;
    }
    let regexp = new RegExp("([0-9\\.]+)pt", "g");
    pasteHtml = pasteHtml.replace(regexp, (_, $1) => {
      return ((Number($1) * 4) / 3).toFixed(2) + "px";
    });

    let domParse = new DOMParser();
    let pasetDom = domParse.parseFromString(pasteHtml, "text/html");
    if (!pasetDom || !pasetDom.body) {
      return;
    }
    if (
      pasetDom.body.children.length === 1 &&
      pasetDom.body.children[0].tagName === "TABLE"
    ) {
      let styleContent = pasetDom.querySelector("style");
      if (styleContent) {
        let classesObj = convertClass(styleContent.innerHTML);
        objEach(classesObj, (className, classObj) => {
          [].forEach.call(
            pasetDom.querySelectorAll("." + className),
            element => {
              objEach(classObj, (prop, value) => {
                element.style[_.camelCase(prop)] = value;
              });
            }
          );
        });
      }
      let body = pasetDom.body.innerHTML;
      editor.cmd.do("insertHTML", body);
    }
  }

  let oldPasteTextHandle = editor.config.pasteTextHandle;
  editor.config.pasteTextHandle = function(pasteStr) {
    let isExcel =
      pasteStr.startsWith("<table") && pasteStr.includes('style="undefined"');
    if (isExcel) {
      return "";
    }
    if (oldPasteTextHandle) {
      return oldPasteTextHandle(pasteStr);
    }
    return pasteStr;
  };
  editor.txt.eventHooks.pasteEvents.push(pasteHook);
}
