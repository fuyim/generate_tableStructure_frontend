<template>
  <div style="display:inline">
    <svg :class="svgClass" aria-hidden="true" :style="fontSize">
      <use :xlink:href="iconClassName" :fill="color" />
    </svg>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "",
  },
});
// 图标在 iconfont 中的名字
const iconClassName = computed(() => {
  return `#${props.iconName}`;
});
// 给图标添加上类名
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return "svg-icon";
});
const color = computed(() => {
  if (props.color) {
    return props.color;
  }
  return "#409eff";
});
const fontSize = computed(() => {
  if (props.size) {
    return `font-size: ${props.size}px`
  }
  return `font-size: 13px`
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 2em;
  height: 2em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>