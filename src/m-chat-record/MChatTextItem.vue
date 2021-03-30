<template functional>
  <span class="m-chat-text-item">{{ props.content }}</span>
</template>
<script>
export default {
  name: "MChatTextItem",
  props: {
    content: String,
    config: Object
  }
};
</script>
<style lang="scss" scoped></style>
