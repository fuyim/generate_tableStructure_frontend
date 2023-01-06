<template>
  <a-button type="link" :loading="isLoading" @click="downloadFile"><slot></slot></a-button>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import { download } from "@/utils/download/download";
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore();
    const isLoading = ref(false)
    const downloadFile = () => {
        isLoading.value = true;
        let url = store.getters.url;
        let params = store.getters.params;
        let fileName = store.getters.fileName;
        const result = download(url,{...params},fileName).then(() => {
            isLoading.value = false
        })
        

    };
    return {
      downloadFile,
      isLoading
    };
  },
});
</script>

<style scoped>
</style>