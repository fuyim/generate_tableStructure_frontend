<template>
  <footer class="footer">
    <div class="container footer-center">
      <a-row>
        <a-col :span="6">
          <div class="icons">
            <a
              href="https://github.com/fuyim/tablestructure_generate"
              target="_blank"
            >
              <svg-icon iconName="icon-github-fill"></svg-icon>
            </a>
            <span
              ><a
                href="https://github.com/fuyim/tablestructure_generate"
                target="_blank"
                >github 开源地址</a
              ></span
            >
          </div>
        </a-col>
        <a-col :span="6">
          <div class="icons">
            <a
              href="https://gitee.com/fuyim/tablestructure_generate"
              target="_blank"
            >
              <svg-icon iconName="icon-gitee"></svg-icon>
            </a>
            <span
              ><a
                href="https://gitee.com/fuyim/tablestructure_generate"
                target="_blank"
                >gitee 开源地址</a
              ></span
            >
          </div>
        </a-col>
        <a-col :span="6">
          <div class="icons" @click="showDrawer">
            <a>
              <svg-icon iconName="icon-zuozhe"></svg-icon>
            </a>
            <span><a>作者 : nut~min</a></span>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="icons" @click="showDrawer">
            <a><svg-icon iconName="icon-weixingongzhonghao"></svg-icon></a>
            <span><a>微信公众号 ： 编程游客</a></span>
          </div>
        </a-col>
      </a-row>
    </div>
    <a-drawer
      v-model:visible="visible"
      class="custom-class"
      title="站 点 信 息"
      placement="right"
      :mask="true"
      :closable="false"
      getContainer="html"
      :autofocus="false"
      @after-visible-change="afterVisibleChange"
    >
      <a-descriptions title="站点描述">
        <a-descriptions-item>
          <span class="description_website">
            本站面向学生党以及在职开发人员,提供简单易用的数据库小型工具，提高开发效率！！
          </span>
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="功能描述">
        <a-descriptions-item>
          <a-collapse v-model:activeKey="activeKey" ghost>
            <a-collapse-panel key="1" header="功能一:">
              <p class="text">
                导出数据库所有表结构，包括导出excel文档，word文档，以及json格式数据显示
              </p>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="功能二:">
              <p class="text">
                根据表单信息生成对应sql语句，根据模板提供的excel文档或者word文档生成sql语句
              </p>
            </a-collapse-panel>
          </a-collapse>
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="微信公众号" layout="vertical">
        <a-descriptions-item>
          <a-image
            width="100%"
            src="@/../src/assets/WeChatImage/微信公众号.png"
            fallback="data:image/png;base64,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"
          />
        </a-descriptions-item>
      </a-descriptions>
      <p class="text">本站作者： <span>nut~min</span></p>
      <p class="text">
        本站将所有代码进行开源，有需请给作者一颗小星星哦！<svg-icon
          iconName="icon-xiaolian"
        ></svg-icon>
      </p>
    </a-drawer>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
const visible = ref<boolean>(false);
const afterVisibleChange = (bool: boolean) => {
  console.log("visible", bool);
};
const showDrawer = () => {
  visible.value = true;
};

const activeKey = ref([]);
</script>

<style scoped>
.footer {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  background-color: rgb(247, 242, 242);
  font-size: 14px;
  position: relative;
}
.footer-center {
  width: 70%;
  position: absolute;
  transform: translateX(20%);
}
.icons {
  display: flex;
  flex-direction: column;
  /* margin: 5px; */
}

.wechatIcon {
  display: flex;
  flex-direction: row;
}

a {
  cursor: pointer;
  text-decoration: none;
  color: #485fc7;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
}

a:hover {
  color: #1890ff;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s;
  -webkit-text-decoration-skip: objects;
}

.description_website {
  color: red;
  font-size: 16px;
  text-align: justify;
}

.text {
  text-align: left;
}
</style>