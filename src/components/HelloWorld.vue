<script setup lang="ts">
import { ref } from "vue";
import { message } from "ant-design-vue";

const info = () => {
  message.info("This is a normal message");
};

</script>

<template>
  <a-button type="primary">Primary Button</a-button>
  <a-button>Default Button</a-button>
  <a-button type="dashed">Dashed Button</a-button>
  <a-button type="text">Text Button</a-button>
  <a-button type="link">Link Button</a-button>
  <a-button type="primary" @click="info">Display normal message</a-button>
</template>

<style scoped>
</style>
