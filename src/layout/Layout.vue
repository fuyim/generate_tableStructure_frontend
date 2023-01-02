<template>
  <div class="">
    <div>
      <Navbar />
    </div>
    <AppMain class="container" />
    <Footer />
  </div>
  <div id="components-back-top-demo-custom">
    <a-back-top :visibilityHeight=400>
      <div class="ant-back-top-inner">UP</div>
    </a-back-top>
  </div>
</template>


<script setup>
import { AppMain, Navbar, Footer } from "./components";
</script>
<style lang="scss" scoped>
#components-back-top-demo-custom .ant-back-top {
  bottom: 100px;
}
#components-back-top-demo-custom .ant-back-top-inner {
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #7ebdf0;
  color: #fff;
  text-align: center;
  font-size: 20px;
}
#components-back-top-demo-custom .ant-back-top-inner:hover {
  background-color: #2f9bf4;
}

</style>