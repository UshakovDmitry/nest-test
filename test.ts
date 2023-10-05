У меня есть страница где я использую VueDatePicker 
моя задача вытаскивать из него диапазон дней выбранных пользователем
<template>
  <section class="transport">
    <h1 class="transport__title">
      Заявки на транспорт : {{ model.transportRequests.length }}/{{  model.filteredTransportRequests.length }} / {{ model.dateSelection }}
    </h1>
    <div class="transport__content">
      <filters-panel-component
        :cities="model.cities"
        :dateSelection="model.dateSelection"
        @search="viewModel.search($event)"
        @select-city="viewModel.selectCity($event)"
        @downloadLoadersAsXLSX="viewModel.downloadLoadersAsXLSX"
      ></filters-panel-component>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, Ref } from 'vue';
import { TransportRequestsModel } from './applications.model';
import { TransportRequestsViewModel } from './applications.viewmodel';
import TableComponent from '../../components/table/table-component.vue';
import filtersPanelComponent from './components/filters-panel/filters-panel.component.vue';
const model: Ref<TransportRequestsModel> = ref(new TransportRequestsModel());
const viewModel: Ref<TransportRequestsViewModel> = ref(
  new TransportRequestsViewModel(model.value),
);
</script>
<style scoped>
.transport__title {
  align-self: stretch;
  color: var(--text-dark, #23362d);
  font-family: Rubik;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
}
.wrapper-toggle-btns {
  width: 394px;
  height: 44px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.wrapper-toggle-btns-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.isActiveTab {
  color: var(--primary-light-mode-main, #00a153);
  border-bottom: 3px solid var(--primary-light-mode-main, #00a153);
}
.transport {
  padding: 0 20px;
  width: 100%;
  height: 100vh;
  background-color: #f8f9fd;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.transport__content {
  margin-top: 24px;
  padding: 0 16px 16px 16px;
  border-radius: 16px;
  height: 840px;
  border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  background: #fff;
  box-shadow:
    0px 1px 3px 0px rgba(204, 204, 204, 0.3),
    0px 4px 8px 3px rgba(204, 204, 204, 0.15);
}

.empty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
.empty-text {
  color: #b4b2b2;
  font-family: Rubik;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px;
}
</style>
Вот компонент VueDatePicker 
реализуй логику 
он находится внутри       <filters-panel-component>
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
  dateSelection: any;
}>();

const dateSelection = ref();

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() - 7));
  dateSelection.value = [startDate, endDate];
});

const emits = defineEmits(['selectCity', 'downloadLoadersAsXLSX', 'search']);
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

