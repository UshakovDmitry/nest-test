<template>
  <div class="skeleton">
    <div v-for="u in 9" class="skeleton__item">{{ u }}</div>
  </div> 
</template>
<script setup lang="ts"></script>
<style scoped>
.skeleton {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 16px;
  box-shadow:
    0px 1px 3px 0px rgba(204, 204, 204, 0.3),
    0px 4px 8px 3px rgba(204, 204, 204, 0.15);
}
.skeleton__item {
  width: 100%;
  height: 80px;
  background: #585151;
  border-radius: 16px;
  margin-bottom: 16px;
}

</style>


Ты гуру верстки
сделай так чтобы была анимация пояления строк с классной анимаией для скелетона
сделай полный рефакторинг скелетона 
