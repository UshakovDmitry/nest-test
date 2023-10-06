<template>
  <router-view :class="{'with-layout': $route.meta.hasLayout}" />
</template>


#app.with-layout {
  padding-left: 72px;
  padding-top: 107px;
  /* остальные стили */
}
