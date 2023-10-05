я хочу чтобы setTimeRange данные в таком виде ['"2023-09-30', '"2023-10-07']

<template>
  <div class="filters">
    <div class="set-city">
      <dropdown-component
        :items="cities"
        :width="350"
        :currentValue="'Выберите город'"
        @onSelect="emits('selectCity', $event)"
      ></dropdown-component>
    </div>
    <div class="search">
      <search-field-component
        :placeholder="'Введите номер ППО или заявки на транспорт'"
        @onSearch="emits('search', $event)"
      ></search-field-component>
      <VueDatePicker
        v-model="dateSelection"
        locale="ru"
        range
        :placeholder="'Выберите дату'"
        class="date_picker"
        @update:model-value="handleDate"
      ></VueDatePicker>
    </div>
    <div class="download">
      <button
        class="download-btn"
        data-test="download-btn"
        @click="emits('downloadLoadersAsXLSX')"
      >
        Скачать файл
        <img :src="xlsxicon" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import DropdownComponent from '../../../../components/global/dropdown/dropdown.vue';
import SearchFieldComponent from '../../../../components/global/fields/search-field/search-field.vue';
import xlsxicon from '../../../../public/icons/XLSX.svg';

defineProps<{
  cities: string[];
}>();

const dateSelection = ref();

onMounted(() => {
  const endDate = new Date(); 
  const startDate = new Date(new Date().setDate(endDate.getDate() - 7));

  dateSelection.value = [startDate, endDate];
});
const handleDate = (timeRange) => {
  dateSelection.value = timeRange;
  emits('setTimeRange', timeRange);
  // do something else with the data
}




const emits = defineEmits(['selectCity', 'downloadLoadersAsXLSX', 'search','setTimeRange']);
</script>
<style scoped>
.filters {
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}
.set-city {
  width: 25%;
}

.date_picker {
  --dp-border-radius: 16px;
  /* --dp-cell-border-radius: 4px;  */
  width: 200px;
}

.date_picker .dp__outer_menu_wrap .dp--menu-wrapper {
  --dp-border-radius: 4px;
  --dp-cell-border-radius: 4px;
}

.search {
  width: 50%;
  border-right: 1px solid rgba(35, 54, 45, 0.12);
  border-left: 1px solid rgba(35, 54, 45, 0.12);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.download {
  width: 25%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.download-btn {
  border-radius: 100px;
  border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
  background: #fff;
  width: 155px;
  cursor: pointer;
  box-sizing: border-box;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.set-date {
  display: flex;
  width: 222px;
  height: 42px;
  padding: 6px 16px;
  align-items: center;
  gap: 8px;
  border-radius: 80px;
  box-sizing: border-box;
  border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
  background: #fff;
}
</style>







  const handleDate = (timeRange) => {
  dateSelection.value = timeRange;
  const formattedDates = timeRange.map(date => date.toISOString().split('T')[0]);
  emits('setTimeRange', formattedDates);
  // do something else with the data
}
