<template>
  <div>
    <h1>这是一个测试</h1>
    <br />
    <a-button @click="upload">上传</a-button>
    <file-down>下载</file-down>
    <dict-data size="large" dictkey="sys_field_type" width="120"></dict-data>
    <dict-data size="large" dictkey="sys_user_sex" width="120"></dict-data>
  </div>
</template>

<script lang='ts'>
import FileDown from "@/components/FileDown/FileDown.vue";
import { exportExcel } from "@/api/TableStructure/tableStructure";
import { defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  components: { FileDown },
  setup() {
    const store = useStore();
    const upload = () => {
      store.dispatch("url", "/generate/generateWord");
      store.dispatch("params", {
        username: "root",
        password: "fu20010412",
        databaseName: "blog",
        hostname: "localhost",
      });
      store.dispatch("fileName", "test.docx");
    };
    return {
      upload,
    };
  },
});
</script>

<style scoped>
</style>