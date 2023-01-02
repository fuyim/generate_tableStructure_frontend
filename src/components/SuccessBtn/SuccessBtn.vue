<template>
  <a-button type="sucess" :style="styles" :size="styles" html-type="submit"
    ><slot></slot
  ></a-button>
</template>

<script lang='ts' setup>
import { computed, defineComponent, defineProps, ref } from "vue";
const props = defineProps({
  size: {
    type: String,
    default: "default",
  },
  style: {
    type: Object,
    default: {},
  },
});
const size = computed(() => {
  if (props.size) {
    return `${props.size}`;
  }
});
const styles = computed(() => {
  if (props.style) {
    return `${props.style}`;
  }
});

</script>

<style scoped>
</style>