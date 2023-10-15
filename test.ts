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

    <div
      class="yesterday"
      :class="{ 'yesterday--active': isYesterday }"
      @click="emits('getTransportRequestsToday')"
    >
      <div v-if="isYesterday">
        <IconComponent
          :сonfig="{
            name: 'done',
            color: '#00A153',
            width: 20,
            height: 20,
          }"
        />
      </div>

      <span>Вчера</span>
    </div>
    <div
      class="today"
      :class="{ 'today--active': isToday }"
      @click="emits('getTransportRequestsToday')"
    >
      <div v-if="isToday">
        <IconComponent
          :сonfig="{
            name: 'done',
            color: '#00A153',
            width: 20,
            height: 20,
          }"
        />
      </div>

      <span>Сегодня</span>
    </div>
    <div class="tomorrow"
      :class="{ 'tomorrow--active': isTomorrow }"
      @click="emits('getTransportRequestsToday')"
    >
      <div v-if="isTomorrow">
        <IconComponent
          :сonfig="{
            name: 'done',
            color: '#00A153',
            width: 20,
            height: 20,
          }"
        />
      </div>
      <span>Завтра</span>
    </div>

    <div class="search">
      <search-field-component
        :placeholder="placeholder"
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
import IconComponent from '../../../../components/global/icon/icon.component.vue';

defineProps<{
  cities: string[];
  placeholder: string;
  isToday?: boolean;
  isYesterday?: boolean;
  isTomorrow?: boolean;
}>();

const dateSelection = ref();

onMounted(() => {
  const endDate = new Date();
  const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
  dateSelection.value = [startDate, endDate];
});
const handleDate = (timeRange) => {
  dateSelection.value = timeRange;
  const formattedDates = timeRange.map(
    (date) => date.toISOString().split('T')[0],
  );
  emits('setTimeRange', formattedDates);
};

const emits = defineEmits([
  'selectCity',
  'downloadLoadersAsXLSX',
  'search',
  'setTimeRange',
  'getTransportRequestsToday',
]);
</script>
<style scoped>
.filters {
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: flex-start;
  gap: 30px;
  align-items: center;
  flex-direction: row;
}
.set-city {
  width: 25%;
}

.date_picker {
  --dp-border-radius: 16px;
  /* --dp-cell-border-radius: 4px;  */
  width: 590px;
}

.date_picker .dp__outer_menu_wrap .dp--menu-wrapper {
  --dp-border-radius: 4px;
  --dp-cell-border-radius: 4px;
}

.search {
  flex-grow: 1;
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

.today {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 122px;
  height: 42px;
  padding: 6px 16px;
  align-items: center;
  gap: 8px;
  border-radius: 80px;
  box-sizing: border-box;
  border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
  background: #fff;
  cursor: pointer;
}

.today--active {
  background: #f8f9fd;
  border: 1px solid #00a153;
  color: #00a153;
}
.today:hover {
  background: #23a10a;
  color: #fff;
  transition: all 0.3s ease-in-out;
}

.yesterday {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 122px;
  height: 42px;
  padding: 6px 16px;
  align-items: center;
  gap: 8px;
  border-radius: 80px;
  box-sizing: border-box;
  border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
  background: #fff;
  cursor: pointer;
}

.yesterday--active {
  background: #f8f9fd;
  border: 1px solid #00a153;
  color: #00a153;
}
.yesterday:hover {
  background: #23a10a;
  color: #fff;
  transition: all 0.3s ease-in-out;
}

.tomorrow {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 122px;
  height: 42px;
  padding: 6px 16px;
  align-items: center;
  gap: 8px;
  border-radius: 80px;
  box-sizing: border-box;
  border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
  background: #fff;
  cursor: pointer;
}

.tomorrow--active {
  background: #f8f9fd;
  border: 1px solid #00a153;
  color: #00a153;
}
.tomorrow:hover {
  background: #23a10a;
  color: #fff;
  /* border-radius: 12px; */
  transition: all 0.3s ease-in-out;
}

</style>
