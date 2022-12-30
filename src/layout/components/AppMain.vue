<template>
    <div class="app-main">
        <router-view></router-view>
    </div>

</template>

<script setup>

</script>

<style scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  margin: 20px auto;
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
