let gid = 0;
export default {
  /**
   * 十位时间戳转Date对象
   * @param {number} unix 十位时间戳
   */
  unixToDate(unix) {
    if (typeof unix !== "number") {
      return null;
    }
    return new Date(unix * 1000);
  },

  /**
   * Date对象转十位时间戳
   * @param {Date} date Date对象
   */
  dateToUnix(date) {
    if (date instanceof Date) {
      return Math.floor(date.getTime() / 1000);
    }
    return 0;
  },

  /**
   * 移除数组的指定元素
   * @param {Array} arr 要移除元素的数组
   * @param {*}} item 要移除的元素
   */
  removeItem(arr, item) {
    if (!Array.isArray(arr)) {
      return null;
    }
    let index = arr.findIndex(_item => _item === item);
    if (index < 0) {
      return null;
    }
    arr.splice(index, 1);
    return item;
  },

  setLocalStore(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  getLocalStore(key) {
    let store = localStorage.getItem(key);
    if (store === null || store === undefined) {
      return store;
    }
    return JSON.parse(store);
  },

  remoteLocalStore(key) {
    localStorage.removeItem(key);
  },

  isString(arg) {
    return typeof arg === "string";
  },

  isNumber(arg) {
    return Number.isFinite(arg);
  },

  isUndefined(arg) {
    return typeof arg === "undefined";
  },

  gid(prefix) {
    gid++;
    if (typeof prefix === "undefined") {
      return gid;
    }
    return prefix.toString() + gid;
  }
};
