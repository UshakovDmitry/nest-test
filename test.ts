<template>
  <div class="skeleton">
    <div v-for="u in 9" :key="u" class="skeleton__item"></div>
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
  overflow: hidden; /* Добавьте это, чтобы углы skeleton__item не выходили за пределы обертки */
  padding: 16px 0;
}

.skeleton__item {
  width: 90%; /* уменьшено, чтобы лучше выглядело в контейнере */
  height: 80px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-animation 1.5s infinite;
  border-radius: 16px;
  margin-bottom: 16px;
  opacity: 0; /* начальная прозрачность для анимации появления */
  transform: translateY(20px); /* начальное положение для анимации появления */
  animation: fadeInUp 0.6s forwards; /* анимация появления */
}

/* Анимация появления скелетон-загрузчика */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Анимация скелетон-загрузчика */
@keyframes skeleton-animation {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
