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
