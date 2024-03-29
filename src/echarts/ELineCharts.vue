<template>
  <e-charts
    :options="echartOptions"
    v-bind="$attrs"
    v-on="$listeners"
    ref="eCharts"
  ></e-charts>
</template>

<script>
import ECharts from "./ECharts.vue";
import _ from "lodash";

const defaultConfig = {
  tooltip: true,
  axisPointer: "cross"
};

export default {
  name: "ELineCharts",
  components: {
    ECharts
  },
  props: {
    data: [Array, Object],
    options: Object,
    /**
     * {
     *  legendMap: {},
     *  toolbox: ["saveAsImage", "restore", "dataView", "dataZoom"],
     *  tooltip: true,  // Boolean
     *  xAxisKey: 'type', // String
     *  xAxisConfig: [], // Array or Object
     *  yAxisConfig: [{}], // Array or Object,
     *  axisPointer: 'cross',
     *  seriesConfig: {},
     *  dataZoomX: false,
     *  dataZoomY: false
     * }
     */
    config: Object
  },
  computed: {
    echartOptions() {
      let options = {};
      let config = Object.assign({}, defaultConfig, this.config);

      // title
      if (config.title) {
        options.title = {
          text: config.title
        };
      }

      // tooltip
      if (config.tooltip) {
        let tooltip = {
          show: true,
          trigger: "axis"
        };
        if (config.axisPointer) {
          tooltip.axisPointer = {
            type: config.axisPointer
          };
        }
        options.tooltip = tooltip;
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

      // xAxis
      let xAxis = this.getXAxis(config, this.data);
      options.xAxis = xAxis;

      // yAxis
      let yAxis = this.getYAxis(config);
      options.yAxis = yAxis;

      // series
      let series = this.getSeries(config, this.data);
      options.series = series;

      // legend
      if (config.legendMap) {
        options.legend = {
          data: Object.values(config.legendMap)
        };
      }

      // dataZoom
      if (config.dataZoomX || config.dataZoomY) {
        options.dataZoom = [];
        if (config.dataZoomX) {
          options.dataZoom.push({
            type: "slider",
            show: true,
            xAxisIndex: 0
          });
        }
        if (config.dataZoomY) {
          options.dataZoom.push({
            type: "slider",
            show: true,
            right: 20,
            yAxisIndex: config.yAxisConfig?.length
              ? config.yAxisConfig.map((_, index) => index)
              : 0
          });
        }
      }

      if (this.options) {
        _.merge(options, this.options);
      }
      return options;
    }
  },
  mounted() {},
  methods: {
    getSeries(config, data) {
      let barKeys = config.barKeys || [];
      let yAxisConfig = config.yAxisConfig;
      let legends = config.legendMap ? Object.keys(config.legendMap) : [""];
      return legends.map(legend =>
        Object.assign(
          {
            name: config.legendMap && config.legendMap[legend],
            type: barKeys.includes(legend) ? "bar" : "line",
            data: this.getSeriesData(data, legend),
            yAxisIndex: yAxisConfig?.length
              ? yAxisConfig.findIndex(c => c.key === legend)
              : 0
          },
          config.seriesConfig
        )
      );
    },

    getSeriesData(data, key) {
      if (Array.isArray(data)) {
        return data.map(item => item[key]);
      }
      return Object.values(data).map(item => {
        if (!_.isPlainObject(item)) {
          return item;
        }
        return item[key];
      });
    },

    getXAxis(config, data) {
      let xAxis = {
        type: "category",
        data: Array.isArray(data)
          ? data.map(item => item[config.xAxisKey])
          : Object.keys(data)
      };
      if (config.xAxisConfig) {
        xAxis = Object.assign(xAxis, config.xAxisConfig);
      }
      return xAxis;
    },

    getYAxis(config) {
      let yAxis = {
        type: "value"
      };
      let yAxisConfig = config.yAxisConfig;
      if (yAxisConfig) {
        if (Array.isArray(yAxisConfig)) {
          yAxis = yAxisConfig.map(c => {
            let item = {
              name: c.name,
              type: "value"
            };
            if (c.formatter) {
              item.axisLabel = {
                formatter: c.formatter
              };
            }
            return item;
          });
        } else {
          yAxis.name = yAxisConfig.name;
          if (yAxisConfig.formatter) {
            yAxis.axisLabel = {
              formatter: yAxisConfig.formatter
            };
          }
        }
      }
      return yAxis;
    },

    getInstance() {
      return this.$refs.eCharts?.getInstance();
    }
  }
};
</script>

<style lang="scss" scoped></style>
