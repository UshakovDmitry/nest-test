<template>
  <div class="cell__wrapper">
    <p class="address">{{ config.value.document }}</p>
    <div class="coordinates">

      {{ config.value.numberPPO }}
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  config: {
    document: String;
    numberPPO: String;
  };
}>();
</script>

<style scoped>
.cell__wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
  width: 100%;
  max-width: 250px;
  height: 100%;
  padding: 0 0 0 30px;
  font-size: 14px;
  line-height: 1.2;
  color: #23362d;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  /* background-color: aquamarine; */
}

.address {
  word-break: break-word; /* Переносит строку на любом символе */
  max-height: 2.4em; /* Максимальная высота для двух строк, основываясь на вашем line-height */
  overflow: hidden; /* Скрывает все, что выходит за пределы */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Отображает максимум 2 строки */
  -webkit-box-orient: vertical;
}
.coordinates {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
}
</style>

Property 'value' does not exist on type '{ document: String; numberPPO: String; }'.ts(2339)
any
Translation
Property 'value' does not exist on type '{ document: String; numberPPO: String; }'.
You're trying to access value on an object that doesn't contain it. Learn more.

