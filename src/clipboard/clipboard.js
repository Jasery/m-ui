import Clipboard from "clipboard";

function initClipboard(el, options) {
  let clipboard = new Clipboard(el, options);
  clipboard.on("success", function(e) {
    e.clearSelection();
    let callback = el._vClipboard_success;
    callback && callback(e);
  });
  clipboard.on("error", function(e) {
    e.clearSelection();
    let callback = el._vClipboard_error;
    callback && callback(e);
  });
  el._vClipboard = clipboard;
}

function getOptions({ action, target, text }) {
  let options = {
    action: getActionFunc(action)
  };
  if (target) {
    options.target = () => document.querySelector(target);
  }
  if (text) {
    options.text = () => text;
  }
  return options;
}

function getActionFunc(action) {
  return () => (action === "cut" ? "cut" : "copy");
}

function updateClipboard(el, options) {
  const clipboard = el._vClipboard;
  if (!clipboard) {
    return;
  }
  if (options.action) {
    clipboard.action = getActionFunc(options.action);
  }
  if (options.text) {
    clipboard.text = () => options.text;
  }
  if (options.target) {
    clipboard.target = () => document.querySelector(options.target);
  }
  if (options.success) {
    el._vClipboard_success = options.success;
  }
  if (options.error) {
    el._vClipboard_error = options.error;
  }
}

export default {
  bind(el, binding) {
    let { arg, value } = binding;
    let options = null;
    switch (arg) {
      case "action":
        el._vClipboard_action = value;
        break;
      case "success":
        el._vClipboard_success = binding.value;
        break;
      case "error":
        el._vClipboard_error = binding.value;
        break;
      case "text":
        options = getOptions({
          action: el._vClipboard_action,
          text: value
        });
        initClipboard(el, options);
        break;
      case "target":
        options = getOptions({
          action: el._vClipboard_action,
          target: value
        });
        initClipboard(el, options);
        break;
      default:
        if (document.querySelector(value)) {
          options = getOptions({
            action: el._vClipboard_action,
            target: value
          });
        } else {
          options = getOptions({
            action: el._vClipboard_action,
            text: value
          });
        }
        initClipboard(el, options);
        break;
    }
  },
  update(el, binding) {
    let { arg, value, oldValue } = binding;
    if (value === oldValue) {
      return;
    }
    if (!arg) {
      let target = document.querySelector(target);
      if (target) {
        arg = "target";
      } else {
        arg = "text";
      }
    }
    updateClipboard(el, { [arg]: value });
  },
  unbind(el, binding) {
    if (binding.arg === "success") {
      delete el._vClipboard_success;
    } else if (binding.arg === "error") {
      delete el._vClipboard_error;
    } else if (el._vClipboard) {
      el._vClipboard.destroy();
      delete el._vClipboard;
    }
  }
};
