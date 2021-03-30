<template>
  <div class="m-chat-image-item">
    <el-image :src="content.url" :preview-src-list="[content.url]"></el-image>
  </div>
</template>
<script>
export default {
  name: "MChatImageItem",
  props: {
    content: Object,
    config: Object
  }
};
</script>
<style lang="scss" scoped>
.m-chat-image-item {
  max-width: 300px;
}
</style>
