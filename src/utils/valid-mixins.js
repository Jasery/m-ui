export default {
  methods: {
    validator(rule, value, callback) {
      return this.validate(rule, value)
        .then(valid => {
          if (valid) {
            callback();
          } else {
            callback(new Error(valid));
          }
        })
        .catch(err => callback(err));
    }
  }
};
