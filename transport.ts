<template>
  <div class="cell__wrapper">
    <div v-if="config.value === 'Перенос доставки'" class="orange">
      <div>
        <IconComponent
          :сonfig="{
            name: 'timelapse',
            color: '#f57c00',
            width: 22,
            height: 22,
          }"
        ></IconComponent>
      </div>

      <p class="cell__text-tr">{{ config.value }}</p>
    </div>

    <div v-else-if="config.value === 'Доставляется'" class="blue">
      <div>      <IconComponent
        :сonfig="{
          name: 'carIcon',
          color: '#2196f3',
          width: 22,
          height: 22,
        }"
      ></IconComponent></div>

      <p class="cell__text">{{ config.value }}</p>
    </div>
    <div v-else-if="config.value === 'Товар не выдан магазином'" class="red">
      <IconComponent
        :сonfig="{
          name: 'cancel',
          color: '#DB0028',
          width: 22,
          height: 22,
        }"
      ></IconComponent>
      <p class="cell__text">{{ config.value }}</p>
    </div>
    <div v-else-if="config.value === 'Повреждение товара'" class="red">
      <IconComponent
        :сonfig="{
          name: 'cancel',
          color: '#DB0028',
          width: 22,
          height: 22,
        }"
      ></IconComponent>

      <p class="cell__text">{{ config.value }}</p>
    </div>
    <div v-else-if="config.value === 'Отказ клиента от заказа'" class="red">
      <div>      <IconComponent
        :сonfig="{
          name: 'cancel',
          color: '#DB0028',
          width: 22,
          height: 22,
        }"
      ></IconComponent></div>

      <p class="cell__text">{{ config.value }}</p>
    </div>
    <div v-else-if="config.value === 'Доставлено'" class="green">
      <div> <IconComponent
        :сonfig="{
          name: 'done',
          color: '#4caf50',
          width: 22,
          height: 22,
        }"
      ></IconComponent></div>
     

      <p class="cell__text">{{ config.value }}</p>
    </div>

    <div v-else-if="config.value === 'Оформлена'" class="blue">
      <div><IconComponent
        :сonfig="{
          name: 'done',
          color: '#2196f3',
          width: 22,
          height: 22,
        }"
      ></IconComponent></div>
      

      <p class="cell__text">{{ config.value }}</p>
    </div>
    <div v-else-if="config.value === 'Забран'" class="blue">
      <div>      <IconComponent
        :сonfig="{
          name: 'done',
          color: '#2196f3',
          width: 22,
          height: 22,
        }"
      ></IconComponent></div>


      <p class="cell__text">{{ config.value }}</p>
    </div>


    <div v-else class="default">
      <div>
        <IconComponent
        :сonfig="{
          name: 'cancel',
          color: 'red',
          width: 22,
          height: 22,
        }"
      ></IconComponent>
      </div>
      
      <p class="cell__text-default">{{ config.value }} </p>
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
  padding: 10px 0 10px 10px;
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
  justify-content: center;
  gap: 8px;
  padding: 8px;
  text-align: right;
  border-radius: 8px;
  height: 100%;
  width: 100%;
  font-family: Rubik;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.4px;

  color: #f57c00;
  border: 1px solid var(--warning-dark, #f57c00);
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
  line-height: 16px;
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
  line-height: 16px;
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
  line-height: 16px;
  letter-spacing: 0.4px;
}
.default {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 5px;
  color:  #9d9e9d;
  text-align: right;
  border: 1px solid  #9d9e9d;
  border-radius: 8px;
  height: 100%;
  width: 100%;
  text-overflow: none;
  /* Typography/Body Small */
  font-family: Rubik;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
}
.cell__text-default {
text-align: left;
}
.cell__text-tr {
  text-align: left;
}
</style>
 Если config.value это пустая строка
то нужно выводить текст 'без статуса'
