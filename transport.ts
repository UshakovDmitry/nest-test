<template>
  <div class="cell__wrapper">
    <div v-if="config.value === 'Перенос доставки'" class="orange">
      <IconComponent
        :сonfig="{
          name: 'timelapse',
          color: '#f57c00',
          width: 20,
          height: 20,
        }"
      ></IconComponent>

      <p class="cell__text">{{ config.value }}</p>
    </div>

    <div v-if="config.value === 'Доставляется'" class="blue">
      <IconComponent
        :сonfig="{
          name: 'carIcon',
          color: '#2196f3',
          width: 20,
          height: 20,
        }"
      ></IconComponent>
      <p class="cell__text">{{ config.value }}</p>
    </div>
    <div v-if="config.value === 'Товар не выдан магазином'" class="red">
      <IconComponent
        :сonfig="{
          name: 'cancel',
          color: '#DB0028',
          width: 30,
          height: 30,
        }"
      ></IconComponent>
      <p class="cell__text">{{ config.value }}</p>
    </div>
    <div v-if="config.value === 'Доставлено'" class="green">
      <IconComponent
        :сonfig="{
          name: 'done',
          color: '#4caf50',
          width: 20,
          height: 20,
        }"
      ></IconComponent>

      <p class="cell__text">{{ config.value }}</p>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import IconComponent from '../../icon/icon.component.vue';

defineProps<{
  config: {
    type: number;
    value: string;
  };
}>();
</script>

<style scoped>
.cell__wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 10px 0 10px 20px;
  font-size: 14px;
  max-width: 180px;
  line-height: 1.2;
  color: #23362d;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

.cell__text {
  padding-left: 10px;
  word-break: break-word; /* Переносит строку на любом символе */
  max-height: 2.4em; /* Максимальная высота для двух строк, основываясь на вашем line-height */
  overflow: hidden; /* Скрывает все, что выходит за пределы */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Отображает максимум 2 строки */
  -webkit-box-orient: vertical;
}
.orange {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  color: #f57c00;
  border: 1px solid var(--warning-dark, #f57c00);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.4px;
}
.red {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  color: var(--error-main, #db0028);
  border: 1px solid var(--error-main, #db0028);
  height: 100%;
  width: 100%;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.4px;
}
.blue {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  color: var(--info-main, #2196f3);
  border: 1px solid var(--info-main, #2196f3);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.4px;
  height: 100%;
  width: 100%;
}
.green {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 8px;
  color: var(--success-main, #4caf50);
  text-align: right;
  border: 1px solid var(--success-main, #4caf50);
  border-radius: 8px;
  height: 100%;
  width: 100%;
  /* Typography/Body Small */
  font-family: Rubik;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.4px;
}
</style>
