<template>
<header>
  <a-affix :offset-top="top">
    <nav
        class="navbar is-white is-spaced has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <!-- <a class="navbar-item" href="https://bulma.io">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            />
          </a> -->

          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" @click="goToPage('/')"> <span class="navbar-text">表结构</span> </a>

            <a class="navbar-item" @click="goToPage('/Hellowrold')"> <span class="navbar-text">表SQL</span> </a>
            <a class="navbar-item" @click="goToPage('/Test')"> <span class="navbar-text">测试</span> </a>
            <!-- <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link"> 更多 </a>

              <div class="navbar-dropdown">
                <a class="navbar-item"> About </a>
                <a class="navbar-item"> Jobs </a>
                <a class="navbar-item"> Contact </a>
                <hr class="navbar-divider" />
                <a class="navbar-item"> Report an issue </a>
              </div>
            </div> -->
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a-button size="large" type="primary">登 录</a-button>
              </div>
            </div>
          </div>
        </div>
      </nav>
  </a-affix>
    </header>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();
const top = ref<number>(0);
const goToPage = (url:string) =>{
  router.push(url)
}
</script>

<style scoped>

.navbar-item {
  height: 100%;
}

.active {
  background-color:#e5ebeb;
}

.navbar-text {
  cursor: pointer;
  text-decoration: none;
  color: #485fc7;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
}

.navbar-text:hover {
  color: #1890ff;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s;
  -webkit-text-decoration-skip: objects;
}
</style>