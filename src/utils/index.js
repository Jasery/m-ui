import { getConfig } from "../utils/config";

let _gid = 0;
/**
 * 十位时间戳转Date对象
 * @param {number} unix 十位时间戳
 */
export function unixToDate(unix) {
  if (typeof unix !== "number") {
    return null;
  }
  return new Date(unix * 1000);
}

/**
 * Date对象转十位时间戳
 * @param {Date} date Date对象
 */
export function dateToUnix(date) {
  if (date instanceof Date) {
    return Math.floor(date.getTime() / 1000);
  }
  return 0;
}

/**
 * 移除数组的指定元素
 * @param {Array} arr 要移除元素的数组
 * @param {*}} item 要移除的元素
 */
export function removeItem(arr, item) {
  if (!Array.isArray(arr)) {
    return null;
  }
  let index = arr.findIndex(_item => _item === item);
  if (index < 0) {
    return null;
  }
  arr.splice(index, 1);
  return item;
}

export function setLocalStore(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStore(key, defaultVal) {
  let store = localStorage.getItem(key);
  if (store === null || store === undefined) {
    return defaultVal;
  }
  return JSON.parse(store);
}

export function removeLocalStore(key) {
  localStorage.removeItem(key);
}

export function isString(arg) {
  return typeof arg === "string";
}

export function isNumber(arg) {
  return Number.isFinite(arg);
}

export function isUndefined(arg) {
  return typeof arg === "undefined";
}

export function isFunction(arg) {
  return typeof arg === "function";
}

export function gid(prefix) {
  _gid++;
  if (isUndefined(prefix)) {
    return _gid;
  }
  return prefix.toString() + _gid;
}

/**
 * 判断是否为空对象或空数组
 *
 * @param {Object} obj 对象
 * @return {Boolean}
 */
export function isEmpty(obj) {
  for (const _ in obj) {
    return false;
  }
  return true;
}

export function eachTree(
  treeData,
  callback,
  childrenKey = "children",
  parentNode
) {
  if (!treeData) {
    return;
  }
  if (Array.isArray(treeData)) {
    treeData.forEach((item, index) => {
      callback(item, index, parentNode);
      eachTree(item[childrenKey], callback, childrenKey, item);
    });
  } else if (Array.isArray(treeData[childrenKey])) {
    eachTree(treeData[childrenKey], callback, childrenKey, treeData);
  }
}

export function filterTree(
  treeData = [],
  callback,
  childrenKey = "children",
  parentNode = null
) {
  let filterTreeData = treeData;
  if (Array.isArray(treeData)) {
    filterTreeData = treeData.filter(item => {
      try {
        let res = callback(item, parentNode);
        if (res && item[childrenKey]) {
          item[childrenKey] = filterTree(
            item[childrenKey],
            callback,
            childrenKey,
            item
          );
        }
        return res;
      } catch (e) {
        console.error("filter tree err", e);
        return false;
      }
    });
  } else if (Array.isArray(treeData[childrenKey])) {
    filterTreeData = filterTree(
      treeData[childrenKey],
      callback,
      childrenKey,
      treeData
    );
  }
  return filterTreeData;
}

/**
 * 查找树型数据的某个节点
 * @param treeData 树形数据
 * @param callback 条件回调函数，返回true表示需要查找的节点接收当前节点跟当前父节点两个参数
 * @param childrenKey 子节点的key
 * @param parentNode 默认callback父节点，可不传
 * @returns {any|null} 查找到的节点
 */
export function findTreeNode(
  treeData,
  callback,
  childrenKey = "children",
  parentNode = null
) {
  if (!treeData) {
    return null;
  }
  if (Array.isArray(treeData)) {
    for (const item of treeData) {
      try {
        let hasFind = callback(item, parentNode);
        if (hasFind) {
          return item;
        }
        if (Array.isArray(item[childrenKey])) {
          let targetItem = findTreeNode(
            item[childrenKey],
            callback,
            childrenKey,
            item
          );
          if (targetItem) {
            return targetItem;
          }
        }
      } catch (e) {
        console.error("error in findTreeNode callback", e);
      }
    }
  } else if (Array.isArray(treeData[childrenKey])) {
    return findTreeNode(treeData[childrenKey], callback, childrenKey, treeData);
  }
  return null;
}

/**
 * 样式数值转换为数字，不能转换成功则原样返回
 * @param {*} val 需要转换的内容
 */
export function parseStyleNum(val) {
  if (isNumber(val)) {
    return val;
  }
  let num = Number.parseFloat(val);
  return Number.isNaN(num) ? val : num;
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 遍历对象
 * @param {Object} obj 目标对象
 * @param {Function} fn 遍历方法
 */
export function objEach(obj, fn) {
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const result = fn(key, obj[key]);
      if (result === false) {
        break;
      }
    }
  }
}

/**
 * 打印方法，可将对象展开，并只打印瞬时值
 * @param  {...any} args args
 */
export function log(...args) {
  if (!args.length) {
    return;
  }
  args = args.map(arg =>
    isString(arg) ? arg : JSON.stringify(arg, null, "  ")
  );
  console.log(...args);
}

/**
 * 移除对象指定的key，返回浅拷贝对象
 * @param {object}} obj 目标对象
 * @param {Array} keys 需要移除的key数组
 */
export function removeKeys(obj, keys) {
  return Object.keys(obj)
    .filter(key => !keys.includes(key))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
}

let microApp;
function getPublicPath(publicPath = "/web/") {
  return (
    (window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || "").replace(/\/$/, "") +
    publicPath
  );
}

/**
 * 初始化微前端环境
 * @param {Function}} render 挂载方法，返回根实例
 * @param {Object} hooks qiankun的生命周期钩子
 */
export function initMicroApp(render, hooks) {
  if (!window.__POWERED_BY_QIANKUN__) {
    render();
  }
  return {
    bootstrap: async () => {
      let options = getConfig();
      // eslint-disable-next-line
      __webpack_public_path__ = getPublicPath(options?.publicPath);
      return isFunction(hooks?.bootstrap) ? hooks?.bootstrap() : null;
    },
    mount: async props => {
      microApp = render(props);
      return isFunction(hooks?.mount) ? hooks?.mount(props) : null;
    },
    unmount: async props => {
      if (microApp.$auth) {
        microApp.$auth.destroy();
      }
      microApp && microApp.$destroy();
      return isFunction(hooks?.unmount) ? hooks?.unmount(props) : null;
    },
    update: async props => {
      return isFunction(hooks?.update) ? hooks?.update(props) : null;
    }
  };
}

/**
 * 获取资源的路径，针对微前端环境
 * @param {string} path 资源路径
 */
export function resolveResource(path) {
  if (window.__POWERED_BY_QIANKUN__) {
    const config = getConfig();
    return getPublicPath(config?.publicPath) + path;
  }
  return path;
}
