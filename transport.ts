<template>
  <div class="cell__wrapper">
    <div>{{ config.value.name }}</div>
    <a :href="formattedPhone">
      <div class="coordinates">
        <IconComponent
          :сonfig="{
            name: 'call',
            color: '#4caf50',
            width: 25,
            height: 25,
          }"
        ></IconComponent>
        <p class="coordinates__phone">{{ config.value.phone }}</p>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import IconComponent from '../../icon/icon.component.vue';

const props = defineProps<{
  config: {
    type: number;
    value: any;
  };
}>();

const formattedPhone = computed(() => {
  let phone = props.config.value.phone;
  // Удаляем скобки, тире и пробелы
  phone = phone.replace(/[()\-\s]/g, '');
  // Заменяем первую цифру на 8, если она начинается с 7
  if (phone.startsWith('7')) {
    phone = 'sip:' + '8' + phone.substring(1);
  }
  return phone;
});
</script>

<style scoped>
.cell__wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 0 0 30px;
  font-size: 14px;
  line-height: 1.2;
  color: #23362d;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.coordinates {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  cursor: pointer;
  color: black;
  text-decoration: none;
}
.coordinates__phone {
  font-size: 14px;
  color: #23362d;
  box-sizing: border-box;
  overflow: hidden;
  text-decoration: none;
}
</style>


  номер телефона все равно подчеркивается синей полосой
