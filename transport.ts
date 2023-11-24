<template>
  <div class="cell__wrapper">
    <div>{{ config.value.name }}</div>
    <a :href=`sip:${formattedPhone}`>
      <div class="coordinates"> 
        <IconComponent
          :config="{
            name: 'call',
            color: '#4caf50',
            width: 25,
            height: 25,
          }"></IconComponent>
        {{ formattedPhone }}
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
    phone = '8' + phone.substring(1);
  }
  return phone;
});
</script>

<style scoped>
  /* Ваши стили */
</style>
