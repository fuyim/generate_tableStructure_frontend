<template>
  <div>
    <h1>这是一个测试</h1>
    <br />
    <a-button @click="upload">上传</a-button>
    <file-down>下载</file-down>
    <dict-data
      size="large"
      dictkey="sys_yes_no"
      width="120"
      @handleChange="getChange"
      :value="filed.filedType"
    ></dict-data>
    <dict-data
      size="large"
      dictkey="sys_user_sex"
      width="120"
      @handleChange="getChange"
    ></dict-data>
  </div>
</template>

<script lang='ts'>
import FileDown from "@/components/FileDown/FileDown.vue";
import { exportExcel } from "@/api/TableStructure/tableStructure";
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
interface Field {
  name: string;
  filedType: string;
}
export default defineComponent({
  components: { FileDown },
  setup() {
    const filed = reactive<Field>({
      name: "test",
      filedType: "varchar",
    });
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

    const getChange = (data) => {
      console.log("childerValue:", data.dictLabel);
      filed.filedType = data.dictLabel;
    };
    return {
      upload,
      getChange,
      filed,
    };
  },
});
</script>

<style scoped>
</style>