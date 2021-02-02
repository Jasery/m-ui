<template>
  <div class="e-charts"></div>
</template>

<script>
import * as echarts from "echarts";
import _ from "lodash";
import {
  addResizeListener,
  removeResizeListener
} from "element-ui/lib/utils/resize-event";

const INIT_TRIGGERS = ["theme", "initOptions", "autoresize"];
const REWATCH_TRIGGERS = ["manualUpdate", "watchShallow"];

export default {
  name: "ECharts",
  props: {
    options: Object,
    theme: [String, Object],
    initOptions: Object,
    group: String,
    autoresize: Boolean,
    watchShallow: Boolean,
    manualUpdate: Boolean,
    loading: Boolean
  },
  data() {
    return {
      lastArea: 0
    };
  },
  watch: {
    group(group) {
      this.chart.group = group;
    },
    loading() {
      if (this.chart) {
        let method = this.loading ? "showLoading" : "hideLoading";
        this.delegateMethod(method);
      }
    }
  },
  methods: {
    // provide an explicit merge option method
    mergeOptions(options, notMerge, lazyUpdate) {
      if (this.manualUpdate) {
        this.manualOptions = options;
      }

      if (!this.chart) {
        this.init(options);
      } else {
        this.delegateMethod("setOption", options, notMerge, lazyUpdate);
      }
    },
    // just delegates ECharts methods to Vue component
    // use explicit params to reduce transpiled size for now
    appendData(params) {
      this.delegateMethod("appendData", params);
    },
    resize(options) {
      this.delegateMethod("resize", options);
    },
    dispatchAction(payload) {
      this.delegateMethod("dispatchAction", payload);
    },
    convertToPixel(finder, value) {
      return this.delegateMethod("convertToPixel", finder, value);
    },
    convertFromPixel(finder, value) {
      return this.delegateMethod("convertFromPixel", finder, value);
    },
    containPixel(finder, value) {
      return this.delegateMethod("containPixel", finder, value);
    },
    getDataURL(options) {
      return this.delegateMethod("getDataURL", options);
    },
    getConnectedDataURL(options) {
      return this.delegateMethod("getConnectedDataURL", options);
    },
    clear() {
      this.delegateMethod("clear");
    },
    dispose() {
      this.delegateMethod("dispose");
    },
    delegateMethod(name, ...args) {
      if (!this.chart) {
        this.init();
      }
      return this.chart[name](...args);
    },
    delegateGet(methodName) {
      if (!this.chart) {
        this.init();
      }
      return this.chart[methodName]();
    },
    getArea() {
      return this.$el.offsetWidth * this.$el.offsetHeight;
    },
    init(options) {
      if (this.chart) {
        return;
      }

      const chart = echarts.init(this.$el, this.theme, this.initOptions);

      if (this.group) {
        chart.group = this.group;
      }

      chart.setOption(
        options || this.manualOptions || this.options || {},
        true
      );

      Object.keys(this.$listeners).forEach(event => {
        const handler = this.$listeners[event];

        if (event.indexOf("zr:") === 0) {
          chart.getZr().on(event.slice(3), handler);
        } else {
          chart.on(event, handler);
        }
      });

      if (this.autoresize) {
        this.lastArea = this.getArea();
        this.__resizeHandler = _.debounce(
          () => {
            if (this.lastArea === 0) {
              // emulate initial render for initially hidden charts
              this.mergeOptions({}, true);
              this.resize();
              this.mergeOptions(this.options || this.manualOptions || {}, true);
            } else {
              this.resize();
            }
            this.lastArea = this.getArea();
          },
          100,
          { leading: true }
        );
        addResizeListener(this.$el, this.__resizeHandler);
      }

      Object.defineProperties(this, {
        // Only recalculated when accessed from JavaScript.
        // Won't update DOM on value change because getters
        // don't depend on reactive values
        width: {
          configurable: true,
          get: () => {
            return this.delegateGet("getWidth");
          }
        },
        height: {
          configurable: true,
          get: () => {
            return this.delegateGet("getHeight");
          }
        },
        isDisposed: {
          configurable: true,
          get: () => {
            return !!this.delegateGet("isDisposed");
          }
        },
        computedOptions: {
          configurable: true,
          get: () => {
            return this.delegateGet("getOption");
          }
        }
      });

      this.chart = chart;
      if (this.loading) {
        this.delegateMethod("showLoading");
      }
    },
    initOptionsWatcher() {
      if (this.__unwatchOptions) {
        this.__unwatchOptions();
        this.__unwatchOptions = null;
      }

      if (!this.manualUpdate) {
        this.__unwatchOptions = this.$watch(
          "options",
          (val, oldVal) => {
            if (!this.chart && val) {
              this.init();
            } else {
              // mutating `options` will lead to merging
              // replacing it with new reference will lead to not merging
              // eg.
              // `this.options = Object.assign({}, this.options, { ... })`
              // will trigger `this.chart.setOption(val, true)
              // `this.options.title.text = 'Trends'`
              // will trigger `this.chart.setOption(val, false)`
              this.chart.setOption(val, val !== oldVal);
            }
          },
          { deep: !this.watchShallow }
        );
      }
    },
    destroy() {
      if (this.autoresize) {
        removeResizeListener(this.$el, this.__resizeHandler);
      }
      this.dispose();
      this.chart = null;
    },
    refresh() {
      if (this.chart) {
        this.destroy();
        this.init();
      }
    },
    getInstance() {
      return this.chart;
    }
  },
  created() {
    this.initOptionsWatcher();

    INIT_TRIGGERS.forEach(prop => {
      this.$watch(
        prop,
        () => {
          this.refresh();
        },
        { deep: true }
      );
    });

    REWATCH_TRIGGERS.forEach(prop => {
      this.$watch(prop, () => {
        this.initOptionsWatcher();
        this.refresh();
      });
    });
  },
  mounted() {
    // auto init if `options` is already provided
    if (this.options) {
      this.init();
    }
  },
  activated() {
    if (this.autoresize) {
      this.chart && this.chart.resize();
    }
  },
  destroyed() {
    if (this.chart) {
      this.destroy();
    }
  }
};
</script>
<style></style>
