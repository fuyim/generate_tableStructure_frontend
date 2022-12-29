<template>
  <div class="container">
    <div>
      <Navbar/>
    </div>
      <AppMain/>
      <router-link to="/404">错误页面</router-link>
      <router-link to="/401">401页面</router-link>
      <router-link to="/">首页</router-link>
      <Footer/>
  </div>
</template>


<script setup>
import {AppMain , Navbar , Footer} from './components'
</script>
<style lang="scss" scoped>
</style>