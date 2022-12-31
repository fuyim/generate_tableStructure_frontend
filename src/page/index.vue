<template>
  <div>
    项目首页
    <clip-board :text="copyText"></clip-board>
    <code-editor :heights="400" @fun="copyFun"></code-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineProps, toRef, reactive} from 'vue';
export default defineComponent({
  setup() {
    const childProp = reactive({
      copyText: '',
    })
    // copy方法
    const copyFun = (data)=> {
      childProp.copyText = data;
    };

    return{
      copyFun,
      copyText: toRef(childProp,'copyText')
    }
  }
});
</script>

<style lang="scss" scoped>
</style>