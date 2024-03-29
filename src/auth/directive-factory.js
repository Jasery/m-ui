const SCOPE_KEY = "__AUTH_SCOPE__";

const hasScope = elNode => typeof elNode[SCOPE_KEY] === "string";

function getAuthScope(el) {
  let node = el;
  while (node) {
    if (hasScope(node)) {
      return node[SCOPE_KEY];
    }
    node = node.parentNode;
  }
  return "";
}

function getAuthKeys(el, value) {
  let authScope = el[SCOPE_KEY] ? getAuthScope(el) : "";
  let authKeys = value;
  if (typeof authKeys === "string") {
    authKeys = [authKeys];
  }
  return authKeys.map(key => (authScope ? `${authScope}.${key}` : key));
}

function checkAuth(el, authKeys, $auth) {
  let hasPermission = authKeys.some(key => $auth.checkAuth(key));
  if (hasPermission) {
    if (el.commentNode) {
      let parent = el.commentNode.parentNode;
      parent.insertBefore(el, el.commentNode);
      parent.removeChild(el.commentNode);
      delete el.commentNode;
    }
  } else {
    if (!el.commentNode) {
      let commentNode = document.createComment("v-auth");
      el.commentNode = commentNode;
      el.parentNode.insertBefore(commentNode, el);
      el.parentNode.removeChild(el);
    }
  }
}

function handleAuthDirective(el, binding, $auth) {
  let { arg, value } = binding;
  if (!arg) {
    let authKeys = getAuthKeys(el, value);
    $auth.subscribe(el, function() {
      checkAuth(el, authKeys, $auth);
    });
  } else if (arg === "scope" && value) {
    $auth.subscribe(el, function() {
      checkAuth(el, [value], $auth);
    });
  }
}

export default function($auth) {
  return {
    bind(el, binding) {
      let { arg, value } = binding;
      if (arg === "scope") {
        if (value) {
          el[SCOPE_KEY] = value;
        } else {
          el[SCOPE_KEY] = true;
        }
      }
    },
    inserted(el, binding) {
      handleAuthDirective(el, binding, $auth);
    },

    update(el, binding) {
      let { arg, value, oldValue } = binding;
      if (value !== oldValue) {
        if (!arg) {
          handleAuthDirective(el, binding, $auth);
        } else if (arg === "scope") {
          el[SCOPE_KEY] = value;
        }
      }
    },

    unbind(el) {
      $auth.unsubscribe(el);
      if (el[SCOPE_KEY]) {
        delete el[SCOPE_KEY];
      }
    }
  };
}
