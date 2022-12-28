<template>
  <div id="main" class="container">
    <header>
      <nav
        class="navbar is-white is-spaced has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            />
          </a>

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
            <a class="navbar-item"> Home </a>

            <a class="navbar-item"> Documentation </a>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link"> More </a>

              <div class="navbar-dropdown">
                <a class="navbar-item"> About </a>
                <a class="navbar-item"> Jobs </a>
                <a class="navbar-item"> Contact </a>
                <hr class="navbar-divider" />
                <a class="navbar-item"> Report an issue </a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a-button size="large" type="primary">按钮</a-button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <div>
      <router-view></router-view>
    </div>
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
              href="https://github.com/fuyim/tablestructure_generate"
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
  </div>
</template>


<script setup>
</script>

<style lang="scss" scoped>
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