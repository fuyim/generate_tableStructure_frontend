<template>
  <div class="main">
    <a-row :gutter="16">
      <a-col class="gutter-row" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="gutter-box">
          <a-alert
            message="在使用之前首先确保是否存在此数据库连接 ！"
            banner
            closable
          />
          <a-card title="连接信息" style="width: 100%">
            <a-form
              :model="formState"
              name="basic"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
            >
              <a-form-item
                label="数据库用户名:"
                name="username"
                v-bind="validateInfos.username"
              >
                <a-input v-model:value="formState.username" />
              </a-form-item>

              <a-form-item
                label="数据库密码:"
                name="password"
                v-bind="validateInfos.password"
              >
                <a-input-password
                  autocomplete="off"
                  v-model:value="formState.password"
                />
              </a-form-item>

              <a-form-item
                label="数据库名称:"
                name="databaseName"
                v-bind="validateInfos.databaseName"
              >
                <a-input v-model:value="formState.databaseName" />
              </a-form-item>

              <a-form-item
                label="主机号:"
                name="hostname"
                v-bind="validateInfos.hostname"
              >
                <a-input v-model:value="formState.hostname" />
              </a-form-item>

              <a-form-item :wrapper-col="{ offset: 4, span: 0 }">
                <a-space>
                  <a-row>
                    <a-col :span="8">
                      <a-button
                        size="default"
                        @click="exportExcelSubmit"
                        style="background-color: #85ce61; color: #fff"
                        :loading="excelLoding"
                        >导出excel</a-button
                      >
                    </a-col>
                  </a-row>
                  <a-col :span="8">
                    <a-button
                      type="primary"
                      size="default"
                      html-type="submit"
                      @click="exportWordSubmit"
                      :loading="wordLoding"
                      >导出word</a-button
                    >
                  </a-col>
                  <a-col :span="8">
                    <a-button @click="reset">清空</a-button>
                  </a-col>
                </a-space>
              </a-form-item>
            </a-form>
          </a-card>
        </div>
      </a-col>
      <!-- <a-col class="gutter-row" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="gutter-box">col-6</div>
      </a-col> -->
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, ref } from "vue";
import { download } from "@/utils/download/download";
import { Form } from "ant-design-vue";

const useForm = Form.useForm;
interface FormState {
  username: string;
  password: string;
  databaseName: string;
  hostname: string;
}
export default defineComponent({
  setup() {
    const formState = reactive<FormState>({
      username: "",
      password: "",
      databaseName: "",
      hostname: "",
    });
    const rulesRef = reactive({
      username: [
        {
          required: true,
          message: "请输入用户名!",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入用户名密码!",
        },
      ],
      databaseName: [
        {
          required: true,
          message: "请输入库名!",
        },
      ],
      hostname: [
        {
          required: true,
          message: "请输入主机号!",
        },
      ],
    });
    const wordLoding = ref(false);
    const excelLoding = ref(false);
    const { resetFields, validate, validateInfos } = useForm(
      formState,
      rulesRef
    );
    const validateFrom = (res) => {
      console.log("res", res);
    };

    // excel提交
    const exportExcelSubmit = () => {
      validate()
        .then(() => {
          excelLoding.value = true;
          download(
            "/generate/generateExcel",
            { ...formState },
            `${formState.databaseName}_${new Date().getTime()}.xlsx`
          ).then(() => {
            excelLoding.value = false;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const exportWordSubmit = () => {
      validate()
        .then(() => {
          wordLoding.value = true;
          download(
            "/generate/generateWord",
            { ...formState },
            `${formState.databaseName}_${new Date().getTime()}.docx`
          ).then(() => {
            wordLoding.value = false;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const reset = () => {
      resetFields();
    };
    return {
      formState,
      reset,
      validateFrom,
      validateInfos,
      exportExcelSubmit,
      exportWordSubmit,
      wordLoding,
      excelLoding,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>