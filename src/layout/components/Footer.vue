<template>
<footer class="footer">
      <div class="container footer-center">
        <a-row>
          <a-col :span="8">
            <a
              href="https://github.com/fuyim/tablestructure_generate"
              target="_blank"
            >
              <svg-icon iconName="icon-github-fill"></svg-icon>
            </a>
          </a-col>
          <a-col :span="8">
            <a
              href="https://gitee.com/fuyim/tablestructure_generate"
              target="_blank"
            >
              <svg-icon iconName="icon-gitee"></svg-icon>
            </a>
          </a-col>
          <a-col :span="8">
            <a
              href="https://github.com/fuyim/tablestructure_generate"
              target="_blank"
            >
              <svg-icon iconName="icon-zuozhe"></svg-icon>
            </a>
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
}
.footer-center {
  width: 50%;
}
</style>