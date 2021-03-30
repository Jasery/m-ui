<template>
  <div class="m-chat-record">
    <div class="records-wrapper" v-for="item in chatChunk" :key="item.day">
      <div class="day">{{ item.day }}</div>
      <m-chat-record-item
        v-for="(records, index) in item.records"
        :key="records.id || index"
        v-bind="records"
        :leftBgColor="leftBgColor"
        :rightBgColor="rightBgColor"
        :content-component="getComp(records)"
      ></m-chat-record-item>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import dayjs from "dayjs";
import MChatRecordItem from "./MChatRecordItem.vue";
import MChatTextItem from "./MChatTextItem";
import MChatImageItem from "./MChatImageItem";

const defaultComponent = {
  text: MChatTextItem,
  image: MChatImageItem
};

export default {
  name: "MChatRecord",
  components: {
    MChatRecordItem
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    customComponent: {
      type: Object
    },
    leftBgColor: String,
    rightBgColor: String
  },
  computed: {
    chatChunk() {
      if (!this.data?.length) {
        return [];
      }

      let chunks = _.chain(this.data)
        .groupBy(item => dayjs(item.time).format("YYYY年MM月DD日"))
        .toPairs()
        .sortBy(0)
        .map(([day, records]) => {
          records.sort((a, b) => a.time - b.time);
          return {
            day,
            records
          };
        })
        .value();
      return Object.freeze(chunks);
    }
  },
  mounted() {
    console.log("this.chatChunk", this.chatChunk);
  },
  methods: {
    getComp(item) {
      if (!this.customComponent || !this.customComponent[item.type]) {
        return defaultComponent[item.type];
      }
      return this.customComponent[item.type];
    }
  }
};
</script>

<style lang="scss" scoped>
.m-chat-record {
  .records-wrapper {
    .day {
      text-align: center;
      margin-top: 10px;
    }
  }
}
</style>
