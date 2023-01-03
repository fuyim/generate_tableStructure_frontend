<template>
  <div class="center">
    Hellowrold
    <clip-board>复制</clip-board>
    <code-editor :heights="400"></code-editor>
    <br/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    // const store = useStore();
    // store.dispatch("copyText","这是我更改的内容")


    return {

    }
  }
})
</script>

<style scoped>
.center {
  width: 100%;
  height: 2000px;
}
</style>