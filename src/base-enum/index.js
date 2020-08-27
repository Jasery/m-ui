export default class BaseEnum {
  /**
   * 用于存放枚举附加信息
   * 例子：
   * static step1 = 1
   * static step2 = 2
   * static __props = {
   *   [this.step1]: {label: '步骤1', desc: '这是第一步'},
   *   [this.step2]: {label: '步骤2', desc: '这是第二步'}
   * }
   */
  static __props;

  /**
   * 根据枚举值获取附加信息
   * @param {string|number} value 枚举值
   * @return {*} 自定义的附加信息
   */
  static getProps(value) {
    return this.__props && this.__props[value];
  }

  /**
   * 获取指定key的prop
   * @param {string|Number} value 枚举值
   * @param {string} key prop key
   */
  static getProp(value, key) {
    let props = this.getProps(value);
    if (props) {
      return props[key];
    }
    return null;
  }

  /**
   * 获取枚举列表
   * @return {{value: *, key: string, label: string props: *}[]} 枚举列表
   */
  static getEntities() {
    return Object.keys(this)
      .filter(key => typeof this[key] !== "function" && !key.startsWith("_"))
      .map(key => ({
        key,
        value: this[key],
        props: this.getProps(this[key]),
        label: this.getLabel(this[key])
      }));
  }

  /**
   * 获取枚举对象形式
   * @return {{}} 对象
   */
  static getEnumObject() {
    let obj = {};
    for (let entity of this.getEntities()) {
      obj[entity.key] = entity.value;
    }
    return Object.freeze(obj);
  }

  static getLabel(value) {
    let props = this.getProps(value);
    return props && props.label;
  }

  static isEnum(value) {
    return this.getEntities().some(entity => entity.value === value);
  }
}
