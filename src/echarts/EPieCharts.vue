<template>
  <e-charts
    v-bind="$attrs"
    v-on="$listeners"
    :options="echartOptions"
    ref="eCharts"
  ></e-charts>
</template>

<script>
import ECharts from "./ECharts.vue";
import _ from "lodash";

const defaultConfig = {
  tooltip: true,
  radius: "60%",
  selectedMode: "single"
};
export default {
  name: "EPieCharts",
  components: { ECharts },
  props: {
    data: [Object, Array],
    config: Object,
    options: Object
  },
  computed: {
    echartOptions() {
      let options = {};
      let config = Object.assign({}, defaultConfig, this.config);
      if (config.title) {
        options.title = {
          text: config.title
        };
      }
      if (config.tooltip) {
        options.tooltip = {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        };
      }

      // toolbox
      if (config.toolbox?.length) {
        options.toolbox = {
          show: true,
          feature: config.toolbox.reduce((acc, cur) => {
            acc[cur] = {};
            return acc;
          }, {})
        };
      }

      options.legend = {
        orient: "vertical",
        right: 10,
        top: 40
      };

      let series = this.getSeries(config, this.data);
      options.series = series;

      if (this.options) {
        _.merge(options, this.options);
      }

      return options;
    }
  },

  methods: {
    getSeries(config, data) {
      let series = {
        name: config.name,
        type: "pie",
        radius: config.radius,
        center: ["40%", "50%"],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        selectedMode: config.selectedMode,
        data: this.getSeriesData(data, config.legendMap)
      };
      series = Object.assign(series, config.seriesConfig);
      return [series];
    },

    getSeriesData(data, legendMap = {}) {
      if (Array.isArray(data)) {
        return data;
      }
      return Object.keys(data).map(key => ({
        name: legendMap[key] || key,
        value: data[key]
      }));
    },

    getInstance() {
      return this.$refs.eCharts?.getInstance();
    }
  }
};
</script>
