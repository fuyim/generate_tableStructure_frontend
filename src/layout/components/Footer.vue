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
              <span><a href="https://github.com/fuyim/tablestructure_generate" target="_blank">github 开源地址</a></span>
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
              <span><a href="https://gitee.com/fuyim/tablestructure_generate" target="_blank">gitee 开源地址</a></span>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="icons">
              <a
                href="#"
              >
                <svg-icon iconName="icon-zuozhe"></svg-icon>
              </a>
              <span><a href="#">作者 : nut~min</a></span>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="icons">
              <span><svg-icon iconName="icon-weixingongzhonghao"></svg-icon></span>
              <span>微信公众号 ： 编程游客</span>
            </div>
          </a-col>
        </a-row>
    </div>
  </footer>
</template>

<script setup>
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
</style>