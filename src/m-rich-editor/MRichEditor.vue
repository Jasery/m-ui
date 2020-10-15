<template>
  <div :id="id"></div>
</template>

<script>
import E from "wangeditor";
import { gid, objEach } from "../utils";
import docxImagePlugin from "./plugins/docx-image-plugin";
import excelPastePlugin from "./plugins/excel-paste-plugin";
import videoPlugin from "./plugins/video-plugin";
import accessoryPlugin from "./plugins/accessory-plugin";

export default {
  name: "MRichEditor",
  components: {},
  props: {
    value: String,
    height: {
      type: Number,
      default: 500
    },
    placeholder: String,
    uploadUrl: {
      type: String,
      default: "/upload"
    },
    memus: {
      type: Array,
      default() {
        return [
          "head",
          "bold",
          "fontSize",
          "fontName",
          "italic",
          "underline",
          "strikeThrough",
          "indent",
          "lineHeight",
          "foreColor",
          "backColor",
          "link",
          "list",
          "justify",
          "quote",
          "emoticon",
          "image",
          "insertVideo",
          "table",
          "code",
          "splitLine",
          "undo",
          "redo",
          "docx",
          "assessory"
        ];
      }
    },
    editorOptions: Object,
    disabled: Boolean
  },
  data() {
    return {
      id: "",
      init: {}
    };
  },
  watch: {
    disabled: "setEditorStatus"
  },
  created() {
    this.id = gid("__m_rich_editor__");
  },
  mounted() {
    const editor = new E("#" + this.id);
    this.editor = editor;
    this.initConfig(editor);
    this.initPlugins(editor);
    editor.create();
    if (this.value) {
      editor.txt.html(this.value);
    }
    this.setEditorStatus();
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
    }
  },
  methods: {
    initConfig(editor) {
      editor.config.height = this.height;
      editor.config.placeholder = this.placeholder || "";
      editor.config.pasteFilterStyle = false;
      editor.config.onchange = newHtml => {
        this.$emit("input", newHtml);
        this.$emit("change", newHtml);
      };
      editor.config.uploadImgServer = this.uploadUrl;
      editor.config.customAlert = this.$message.error || alert;
      editor.config.menus = this.memus;

      if (this.editorOptions) {
        objEach(this.editorOptions, (key, value) => {
          this.editor.config[key] = value;
        });
      }
    },

    initPlugins(editor) {
      docxImagePlugin(editor);
      excelPastePlugin(editor);
      videoPlugin(editor);
      accessoryPlugin(editor);
    },

    getEditor() {
      return this.editor;
    },

    setEditorStatus() {
      if (this.editor) {
        this.editor.$textElem.attr("contenteditable", !this.disabled);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
