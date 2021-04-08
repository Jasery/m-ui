<template>
  <span class="m-chat-text-item">
    <span>{{ lines[0] }}</span>
    <span v-for="item in lines.slice(1)" :key="item">
      <br />
      {{ item }}
    </span>
  </span>
</template>
<script>
export default {
  name: "MChatTextItem",
  props: {
    content: String,
    config: Object
  },
  computed: {
    lines() {
      return this.content?.split("\n") || [];
    }
  }
};
</script>
<style lang="scss" scoped></style>
