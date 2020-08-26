export default function(config) {
  let jsRule = config.module.rule("js");
  let values = jsRule.exclude.values();
  jsRule.exclude.clear().add(filepath => {
    if (/m-ui/.test(filepath)) {
      return false;
    }
    return values
      .filter(ex => typeof ex === "function")
      .some(exclude => exclude(filepath));
  });
  values.filter(ex => typeof ex !== "function").forEach(jsRule.exclude.add);
}
