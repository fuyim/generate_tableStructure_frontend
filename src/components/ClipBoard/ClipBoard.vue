<template>
    <a-button type="primary" size="small" @click="handleCopy(copyText)">复制</a-button>
</template>

<script lang='ts' setup>
import Clipboard from 'clipboard'
import { message } from 'ant-design-vue';
import { reactive, defineEmits} from 'vue'

const copyText = defineEmits(['text']);
console.log("copyText", copyText)

const handleCopy = async (copyText) => {
  let clipboard = new Clipboard('.copy', {
    text: () => {
      return copyText
    }
  })
  await clipboard.on('success', (e) => {
    message.success('复制成功');
    // 释放内存
    clipboard.destroy()
  })
  await clipboard.on('error', (e) => {
    // 不支持复制
    message.error('该浏览器不支持自动复制');
    // 释放内存
    clipboard.destroy()
  })
}
</script>

<style scoped>

</style>