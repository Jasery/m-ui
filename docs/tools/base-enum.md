### 说明
js模拟枚举的基类，新的枚举可以通过继承此基类，然后通过静态属性定义枚举值

### 基本示例
```ts
class Color extends BaseEnum {
  static Red = 1;
  static Green = 2;
  static Blue = 3;

  __props = {
    [this.Red] = { label: "红" },
    [this.Green] = { label: "绿" },
    [this.Blue] = { label: "蓝" },
  }
}

export default {
  data() {
    return {
      options: Color.getEntities();
    }
  }
}
```

> 说明：__props字段定义各个枚举值的附加信息，内容随意，但是约定label字段为显示的内容，可以通过getLabel(value)方法直接获取，getEntities也会直接返回

---

### 方法
1. getEntities()
获取枚举数据列表，每个元素数据结构如下
```json
{
  "key": "key",
  "value": "value",
  "label": "label",
  "props": {...},
}
```

2. getEnumObj()
获取枚举值的对象形式，格式如下：
```json
{
  "enum1": "value1",
  "enum2": "value2",
  "enum3": "value3",
}
```

3. getLabel(enumVal)
获取枚举定义的label


4. getProps(enumVal)
获取枚举定义的附加数据

5. isEnum(val)
判断值是否为当前枚举
