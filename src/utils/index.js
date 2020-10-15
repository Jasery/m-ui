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

export function remoteLocalStore(key) {
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
