<template>
  <div class="copyBtn">
    <a-button class="copy" type="primary" size="default" @click="copyFun()">
      <a-space>
        <span class="text">
          <svg-icon :color="color" iconName="icon-copy"></svg-icon>
        </span>
        <slot></slot>
      </a-space>
    </a-button>
  </div>
</template>

<script lang='ts' setup>
import Clipboard from "clipboard";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
import { reactive, defineEmits, defineProps, ref, toRef, computed } from "vue";
const props = defineProps({
  color: {
    type: String,
    default: "",
  },
});
const store = useStore();

const color = computed(() => {
  if (props.color) {
    return props.color;
  }
  return "#409eff";
})

const copyFun = () => {
  console.log("store.getters.copyText", store.getters.copyText);
  handleCopy(store.getters.copyText);
};
const handleCopy = async (copyText) => {
  let clipboard = new Clipboard(".copy", {
    text: () => {
      if (copyText === "") {
        return " ";
      }
      return copyText;
    },
  });
  await clipboard.on("success", (e) => {
    message.success("复制成功");
    // 释放内存
    clipboard.destroy();
  });
  await clipboard.on("error", (e) => {
    // 不支持复制
    console.log(e);
    message.error("该浏览器不支持自动复制");
    // 释放内存
    clipboard.destroy();
  });
};
</script>

<style lang="scss" scoped>
.text {
  font-size: 10px;
  color: #fff;
}
</style>