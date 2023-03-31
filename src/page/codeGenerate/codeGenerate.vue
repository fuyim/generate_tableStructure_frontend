<template>
  <div>
    <a-row :gutter="16">
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <a-card
          style="width: 100%"
          :tab-list="tabListNoTitle"
          :active-tab-key="noTitleKey"
          @tabChange="(key) => onTabChange(key, 'noTitleKey')"
        >
          <div v-if="noTitleKey === '1'">
            <a-form
              ref="formRef"
              :model="dynamicValidateForm"
              name="SqlTableParams"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 18 }"
              autocomplete="off"
            >
              <a-form-item label="包名" name="packageName">
                <a-input
                  v-model:value="dynamicValidateForm.packageName"
                  placeholder="默认包名：com.nut"
                />
              </a-form-item>

              <a-form-item
                label="表名"
                name="tableName"
                ref="tableName"
                v-bind="validateInfos.tableName"
              >
                <a-input v-model:value="dynamicValidateForm.tableName" />
              </a-form-item>
              <a-form-item label="表注释" name="tableComment">
                <a-input v-model:value="dynamicValidateForm.tableComment" />
              </a-form-item>

              <a-form-item
                v-if="dynamicValidateForm.fieldList.length > 0"
                :label-col="{ span: 0 }"
                :wrapper-col="{ span: 24 }"
              >
                <a-collapse
                  v-model:activeKey="activeKey"
                  v-for="(field, index) in dynamicValidateForm.fieldList"
                  :key="index"
                  :name="['fieldList', index, 'field']"
                >
                  <a-collapse-panel
                    :key="index"
                    :header="field.fieldName ? field.fieldName : '字段配置'"
                  >
                    <template #extra>
                      <a-space>
                        <a-button
                          type="text"
                          size="small"
                          v-if="index != 0"
                          @click.stop="moveFeildUp(field, index)"
                          ><caret-up-outlined
                        /></a-button>
                        <a-button
                          type="text"
                          size="small"
                          v-if="index < dynamicValidateForm.fieldList.length - 1"
                          @click.stop="moveFeildDown(field, index)"
                          ><caret-down-outlined
                        /></a-button>
                        <a-button
                          type="text"
                          size="small"
                          danger
                          @click.stop="removeDomain(field)"
                          >删除</a-button
                        >
                      </a-space>
                    </template>
                    <div class="fieldInfo">
                      <a-row>
                        <a-col :span="12">
                          <a-form-item
                            label="字段名称"
                            :name="['fieldList', index, 'fieldName']"
                            v-bind="fieldLabel"
                            ref="fieldName"
                            :rules="{
                              required: true,
                              message: '字段名称不能为空',
                            }"
                          >
                            <a-input
                              v-model:value="field.fieldName"
                              placeholder="多英文用_隔开 例如is_deleted"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-item
                            label="字段类型"
                            name="fieldType"
                            v-bind="fieldLabel"
                          >
                            <!-- <a-select
                                ref="select"
                                v-model:value="field.fieldType"
                                @focus="focus"
                                @change="handleChange"
                              >
                                <a-select-option value="varchar"
                                  >varchar</a-select-option
                                >
                              </a-select> -->
                            <dict-data
                              v-model:value="field.fieldType"
                              @handleChange="changeField($event, index)"
                              dictkey="sys_field_type"
                            ></dict-data>
                          </a-form-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-item
                            label="字段长度"
                            name="fieldTypeSize"
                            v-bind="fieldLabel"
                          >
                            <a-input
                              v-model:value="field.fieldTypeSize"
                              placeholder="输入字段长度"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-item
                            label="默认值"
                            name="defaultValue"
                            v-bind="fieldLabel"
                          >
                            <a-input
                              v-model:value="field.defaultValue"
                              placeholder="输入字段默认值"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-item
                            label="字段描述"
                            name="comment"
                            v-bind="fieldLabel"
                          >
                            <a-input
                              v-model:value="field.comment"
                              placeholder="输入字段描述"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-item
                            label="更新时间"
                            name="onUpdate"
                            v-bind="fieldLabel"
                          >
                            <!-- <a-input v-model:value="field.onUpdate" /> -->
                            <a-select
                              ref="select"
                              v-model:value="field.onUpdate"
                              :showArrow="false"
                            >
                              <a-select-option value="CURRENT_TIMESTAMP"
                                >CURRENT_TIMESTAMP</a-select-option
                              >
                            </a-select>
                          </a-form-item>
                        </a-col>
                        <a-col :span="4">
                          <a-form-item
                            label="主键"
                            :labelCol="{ span: 18 }"
                            :wrapper-col="{ span: 5 }"
                          >
                            <a-checkbox
                              v-model:checked="field.primaryKey"
                              name="primaryKey"
                            ></a-checkbox>
                          </a-form-item>
                        </a-col>
                        <a-col :span="4">
                          <a-form-item
                            label="自增"
                            :labelCol="{ span: 15 }"
                            :wrapper-col="{ span: 5 }"
                          >
                            <a-checkbox
                              v-model:checked="field.autoIncrement"
                              name="autoIncrement"
                            ></a-checkbox>
                          </a-form-item>
                        </a-col>
                        <a-col :span="4">
                          <a-form-item
                            label="非空"
                            :labelCol="{ span: 10 }"
                            :wrapper-col="{ span: 5 }"
                          >
                            <a-checkbox
                              v-model:checked="field.notNull"
                              name="notNull"
                            ></a-checkbox>
                          </a-form-item>
                        </a-col>
                      </a-row>
                    </div>
                  </a-collapse-panel>
                </a-collapse>
              </a-form-item>

              <a-form-item :labelCol="{ span: 0 }" :wrapper-col="{ span: 24 }">
                <a-space direction="vertical" style="width: 100%">
                  <a-button
                    type="dashed"
                    style="width: 100%"
                    @click="addFields"
                  >
                    <PlusOutlined />
                    新增字段
                  </a-button>
                  <a-button
                    type="dashed"
                    style="width: 100%"
                    @click="addCommenFields"
                  >
                    <PlusOutlined />
                    新增常用表字段
                  </a-button>
                </a-space>
              </a-form-item>

              <!-- <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                  <a-button type="primary" html-type="submit">Submit</a-button>
                </a-form-item> -->
            </a-form>
          </div>
          <p v-else-if="noTitleKey === '2'">app content</p>
          <p v-else>project content</p>
          <a-space>
            <a-button type="primary" @click="generateCode"
              ><vertical-align-bottom-outlined />生成</a-button
            >
            <a-button type="default" @click="resetFrom"
              ><redo-outlined />重置</a-button
            >
          </a-space>
          <template #tabBarExtraContent>
            <!-- <a-select
                ref="select"
                v-model:value="value1"
                style="width: 120px"
                @focus="focus"
                @change="handleChange"
                size="large"
                disabled
              >
                <a-select-option value="MySQL">MySQL</a-select-option>
                <a-select-option value="Oracle">Oracle</a-select-option>
                <a-select-option value="SQLServer">SQLServer</a-select-option>
              </a-select> -->
            <dict-data
              :value="sqlValue"
              size="large"
              width="100"
              dictkey="sys_sql_type"
              :disabled="true"
              @handleChange="changeSql"
            ></dict-data>
          </template>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <a-card title="生成结果">
          <template v-if="resultStatus === 2" #extra>
            <!-- <clip-board color="#FFFFFF">一键复制</clip-board> -->
          </template>
          <a-empty
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            v-if="resultStatus === 0"
          >
            <template #description>
              <span> 暂无生成 </span>
            </template>
          </a-empty>
          <div v-else-if="resultStatus === 1" class="example">
            <a-spin />
          </div>
          <div v-else="resultStatus === 2">
            <a-tabs v-model:activeKey="activeCode">
              <a-tab-pane key="1">
                <template #tab>
                  <span>
                    <svg-icon iconName="icon-java" size="10"></svg-icon> Java
                  </span>
                </template>
                <a-collapse v-model:activeKey="JavaactiveKey">
                  <a-collapse-panel key="1" header="domain.java">
                    <div class="codeEditor">
                      <code-editor :text="editJavaDomain"></code-editor>
                    </div>
                  </a-collapse-panel>
                  <a-collapse-panel key="2" header="mapper.java">
                    <div class="codeEditor">
                      <code-editor :text="editJavaMapper"></code-editor>
                    </div>
                  </a-collapse-panel>
                  <a-collapse-panel key="3" header="service.java">
                    <div class="codeEditor">
                      <code-editor :text="editJavaService"></code-editor>
                    </div>
                  </a-collapse-panel>
                   <a-collapse-panel key="4" header="serviceImpl.java">
                    <div class="codeEditor">
                      <code-editor :text="editJavaServiceImpl"></code-editor>
                    </div>
                  </a-collapse-panel>
                  <a-collapse-panel key="5" header="controller.java">
                    <div class="codeEditor">
                      <code-editor :text="editJavaController"></code-editor>
                    </div>
                  </a-collapse-panel>
                </a-collapse>
              </a-tab-pane>
              <a-tab-pane key="2">
                <template #tab>
                  <span>
                    <svg-icon
                      iconName="icon-socialjavascript"
                      size="10"
                    ></svg-icon>
                    JavaScript
                  </span>
                </template>
                <a-collapse v-model:activeKey="JavaScriptKey">
                  <a-collapse-panel key="1" header="api.js">
                    <div class="codeEditor">
                      <code-editor :text="editJavaScriptApi"></code-editor>
                    </div>
                  </a-collapse-panel>
                </a-collapse>
              </a-tab-pane>
              <a-tab-pane key="3">
                <template #tab>
                  <span>
                    <svg-icon iconName="icon-vuejs" size="10"></svg-icon> Vue.JS
                  </span>
                </template>
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
  
  <script lang='ts'>
import { defineComponent, ref, reactive, watch } from "vue";
import { MenuProps, CollapseProps, message } from "ant-design-vue";
import { Form } from "ant-design-vue";
import { useStore } from "vuex";
import type { FormInstance } from "ant-design-vue";
import {
  DownOutlined,
  PlusOutlined,
  MinusCircleFilled,
  CaretDownOutlined,
  CaretUpOutlined,
  VerticalAlignBottomOutlined,
  RedoOutlined,
} from "@ant-design/icons-vue";
import { getGenerateSql } from "@/api/generateSql/generateSql";
import { getGenerateCode } from "@/api/generateCode/generateCode";
import { string } from "vue-types";
// 定义最终的json数据
interface FormState {
  packageName: string;
  tableName: string;
  tableComment: string;
}
// 字段接口
interface Field {
  fieldName: string;
  fieldType: string;
  fieldTypeSize: number;
  notNull: boolean;
  comment: string;
  defaultValue: string;
  primaryKey: boolean;
  autoIncrement: boolean;
  onUpdate: string;
}

export default defineComponent({
  components: {
    DownOutlined,
    PlusOutlined,
    MinusCircleFilled,
    CaretDownOutlined,
    CaretUpOutlined,
    VerticalAlignBottomOutlined,
    RedoOutlined,
  },
  setup() {
    const useForm = Form.useForm;
    const resultStatus = ref(0);
    const store = useStore();
    const formRef = ref<FormInstance>();
    // 响应式formState值
    const formState = reactive<FormState>({
      packageName: "",
      tableName: "t_table",
      tableComment: "",
    });
    // 响应式字段值
    const field = reactive<Field>({
      fieldName: "",
      fieldType: "",
      fieldTypeSize: 0,
      notNull: false,
      comment: "",
      defaultValue: "",
      primaryKey: false,
      autoIncrement: false,
      onUpdate: "",
    });
    // 标签页
    const tabListNoTitle = [
      {
        key: "1",
        tab: "手动配置",
      },
      {
        key: "2",
        tab: "自动配置",
      },
    ];
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 24, offset: 0 },
      },
    };
    // 表名校验
    const rulesRef = reactive({
      tableName: [
        {
          required: true,
          message: "请输入表名称",
        },
      ],
      fieldName: [
        {
          required: true,
          message: "字段名称不能为空",
        },
      ],
    });
    const fieldLabel = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
        md: { span: 12 },
        lg: { span: 6 },
        xl: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 12 },
        lg: { span: 16 },
        xl: { span: 16 },
      },
    };
    const dynamicValidateForm = reactive<{
      fieldList: Field[];
      tableName: string;
      packageName: string;
      tableComment: string;
    }>({
      fieldList: [],
      tableName: formState.tableName,
      packageName: formState.packageName,
      tableComment: formState.tableComment
    });
    const { resetFields, validate, validateInfos } = useForm(
      dynamicValidateForm,
      rulesRef,
      {
        deep: true,
      }
    );
    const addFields = () => {
      dynamicValidateForm.fieldList.push({
        fieldName: "id",
        fieldType: "int",
        fieldTypeSize: 0,
        notNull: false,
        comment: "",
        defaultValue: "",
        primaryKey: false,
        autoIncrement: false,
        onUpdate: "",
      });
    };
    const commentFieldArray = [
      {
        fieldName: "create_time",
        fieldType: "datetime",
        fieldTypeSize: 0,
        notNull: true,
        comment: "创建时间",
        defaultValue: "CURRENT_TIMESTAMP",
        primaryKey: false,
        autoIncrement: false,
        onUpdate: "",
      },
      {
        fieldName: "update_time",
        fieldType: "datetime",
        fieldTypeSize: 0,
        notNull: true,
        comment: "更新时间",
        defaultValue: "CURRENT_TIMESTAMP",
        primaryKey: false,
        autoIncrement: false,
        onUpdate: "CURRENT_TIMESTAMP",
      },
      {
        fieldName: "is_deleted",
        fieldType: "tinyint",
        fieldTypeSize: 0,
        notNull: true,
        comment: "是否删除(0-未删, 1-已删)",
        defaultValue: "0",
        primaryKey: false,
        autoIncrement: false,
        onUpdate: "",
      },
    ];
    // 添加通用字段
    const addCommenFields = () => {
      commentFieldArray.forEach((item) => {
        dynamicValidateForm.fieldList.push(item);
      });
    };
    // 向上移动
    const moveFeildUp = (field: object, index: number) => {
      dynamicValidateForm.fieldList[index] = dynamicValidateForm.fieldList[index - 1];
      dynamicValidateForm.fieldList[index - 1] = field;
    };
    // 向下移动
    const moveFeildDown = (field: object, index: number) => {
      dynamicValidateForm.fieldList[index] = dynamicValidateForm.fieldList[index + 1];
      dynamicValidateForm.fieldList[index + 1] = field;
    };
    const removeDomain = (item: Field) => {
      let index = dynamicValidateForm.fieldList.indexOf(item);
      if (index !== -1) {
        dynamicValidateForm.fieldList.splice(index, 1);
      }
    };
    // 标签页切换
    const key = ref("1");
    const noTitleKey = ref("1");
    const onTabChange = (value: string, type: string) => {
      console.log(value, type);
      if (type === "key") {
        key.value = value;
      } else if (type === "noTitleKey") {
        noTitleKey.value = value;
      }
    };
    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };
    const editJavaDomain = ref("");
    const editJavaMapper = ref("");
    const editJavaService = ref("");
    const editJavaServiceImpl = ref("");
    const editJavaController = ref("");
    const editJavaScriptApi = ref("");
    const generateCode = () => {
      formRef.value
        .validate()
        .then(() => {
          if (dynamicValidateForm.fieldList.length <= 0) {
            message.warning("必须有不少于一个的字段");
          } else {
            scrollTo(0, 0);
            resultStatus.value = 1;
            getGenerateCode(JSON.parse(JSON.stringify(dynamicValidateForm))).then(
              (res) => {
                editJavaDomain.value = res.data.domain;
                editJavaMapper.value = res.data.mapper;
                editJavaService.value = res.data.service;
                editJavaServiceImpl.value = res.data.serviceImpl;
                editJavaController.value = res.data.controller;
                editJavaScriptApi.value = res.data.api;
                resultStatus.value = 2;
              }
            );
          }
        })
        .catch((error) => {
          let startELeId = error.errorFields[0].name.join();
        });
    };
    const resetFrom = () => {
      resetFields();
    };
    const sqlValue = ref("MySQL");
    // 切换数据库方言
    const changeSql = (data) => {
      sqlValue.value = data.dictLabel;
    };

    // 改变数据表字段
    const changeField = (event, index) => {
      dynamicValidateForm.fieldList[index].fieldType = event.dictLabel;
    };
    const ChangeOnUpdate = () => {};
    return {
      formState,
      handleChange,
      key,
      noTitleKey,
      onTabChange,
      tabListNoTitle,
      activeKey: ref(["0"]),
      JavaactiveKey: ref('1'),
      JavaScriptKey:ref('1'),
      activeCode: ref("1"),
      sqlValue,
      addFields,
      formItemLayoutWithOutLabel,
      formItemLayout,
      fieldLabel,
      removeDomain,
      dynamicValidateForm,
      generateCode,
      addCommenFields,
      moveFeildUp,
      moveFeildDown,
      formRef,
      validateInfos,
      resetFrom,
      resetFields,
      changeSql,
      changeField,
      resultStatus,
      editJavaDomain,
      editJavaMapper,
      editJavaService,
      editJavaServiceImpl,
      editJavaController,
      editJavaScriptApi,
      ChangeOnUpdate,
    };
  },
});
</script>
  
  <style lang="scss" scoped>
.example {
  text-align: center;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
  height: 130px;
}
</style>