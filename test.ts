<template>
  <div :class="{ 'with-layout': $route.meta.hasLayout }">
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@import './assets/styles/main.scss';

#app {
  margin: 0px;
  box-sizing: content-box;
  width: calc(100% - 72px);
  min-height: 100vh;
  color: #2c3e50;
  background-color: #f8f9fd;
}

#app.with-layout {
  padding-left: 72px;
  padding-top: 107px;
}

.app__content {
  padding: 0;
}
</style>
