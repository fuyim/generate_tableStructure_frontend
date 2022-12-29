<template>
  <div class="errPage-container">
    <div class="backBtn">
    <a-button shape="round" type="link" ghost size="large" @click="back">
      <template #icon>
        <LeftOutlined />  
      </template>
      返 回
    </a-button>
  </div>
    <a-row>
      <a-col :span="12">
        <img
          :src="errGifSrc"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </a-col>
      <a-col :span="12">
        <h1 class="text-jumbo text-ginormous">401错误!</h1>
        <h2>您没有访问权限！</h2>
        <h6>对不起，您没有访问权限，请不要进行非法操作！您可以返回主页面</h6>
        <ul class="list-unstyled">
          <li class="link-type">
            <router-link to="/">
              <a-button type="primary" shape="round" size="large">
                返回首页
              </a-button>
            </router-link>
          </li>
        </ul>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import errGif from "@/assets/401_images/401.gif";
import { LeftOutlined } from '@ant-design/icons-vue';
import { useRouter , useRoute} from "vue-router"; 
import { has } from "vue-types/dist/utils";
const router = useRouter();
const hash = useRoute();

const errGifSrc = errGif + "?" + +new Date()
const back = ()=>{
    if (hash.query) {
      router.push('/');
    } else {
      router.go(-1)
    }
}
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .backBtn{
    margin: 20px auto;
  }
}
</style>
