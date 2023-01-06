<template>
  <div class="main">
    <a-row :gutter="16">
      <a-col class="gutter-row" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="gutter-box">
          <a-card title="连接信息" style="width: 100%">
            <a-form
              :model="formState"
              name="basic"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 17 }"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <a-form-item
                label="数据库用户名:"
                name="username"
                :rules="[{ required: true, message: '请输入用户名!' }]"
              >
                <a-input v-model:value="formState.username" />
              </a-form-item>

              <a-form-item
                label="数据库密码:"
                name="password"
                :rules="[{ required: true, message: '请输入用户名密码!' }]"
              >
                <a-input-password v-model:value="formState.password" />
              </a-form-item>

              <a-form-item
                label="数据库名称:"
                name="databaseName"
                :rules="[{ required: true, message: '请输入库名!' }]"
              >
                <a-input v-model:value="formState.databaseName" />
              </a-form-item>

              <a-form-item
                label="主机号:"
                name="hostname"
                :rules="[{ required: true, message: '请输入主机号!' }]"
              >
                <a-input v-model:value="formState.hostname" />
              </a-form-item>

              <a-form-item :wrapper-col="{ offset: 6, span: 0 }">
                <a-space>
                  <a-row>
                    <a-col :span="8">
                      <a-button
                        size="default"
                        html-type="submit"
                        style="background-color: #85ce61; color: #fff"
                        >导出excel</a-button
                      >
                    </a-col>
                  </a-row>
                  <a-col :span="8">
                    <a-button type="primary" size="default" html-type="submit"
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
      <a-col class="gutter-row" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="gutter-box">col-6</div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { exportExcel } from "@/api/TableStructure/tableStructure";
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
    const onFinish = (values: any) => {
      exportExcel(formState).then((res) => {
        console.log(res);
      }).catch((error) => {
        console.log(error);
        console.log("test");
      })
    };
    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
    const reset = () => {
      formState.username = "";
      formState.password = "";
      formState.databaseName = "";
      formState.hostname = "";
    };
    return {
      formState,
      onFinish,
      onFinishFailed,
      reset,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>