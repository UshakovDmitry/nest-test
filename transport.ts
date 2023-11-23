 у меня есть компонент поисковой строки
<template>
  <!-- Контейнер для поля поиска и иконки -->
 
  <search class="search-container">
    <div class="icon-wrapper">
      <IconComponent
        :сonfig="{
          name: 'search',
          color: '#23362D4D',
          width: 24,
          height: 24,
        }"
      ></IconComponent>
    </div>
    <!-- Поле ввода -->
    <input
      type="text"
      data-test="search-input-PPO"
      :value="config.input.value"
      @input="
        emits(
          'input',
          ($event.target as HTMLInputElement | HTMLTextAreaElement).value,
        );"
        :placeholder="config.input.placeholder"
      class="search-input"
    />
  </search>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconComponent from '../../../global/icon/icon.component.vue';

defineProps<{
  config: any;
}>();

const emits = defineEmits(['onSearch','input']);

</script>

<style scoped> 

также у меня есть страница где я его использую
<template>
  <section class="transport-requests">

    <div class="transport-requests__content">
      <filters-panel-component
        :cities="model.cities"
        :placeholder="'Введите номер заявки ...'"
        :config="model.fields[0]"
        :isToday="model.isToday"
        :isYesterday="model.isYesterday"
        :isTomorrow="model.isTomorrow"
        :filterContractors="model.filterContractors"
        @filterRequestsByContractor="viewModel.filterRequestsByContractor($event)"
        @setTimeRange="viewModel.setTimeRange($event)"
        @search="viewModel.search($event)"
        @select-city="viewModel.filterRequestsByCity($event)"
        @downloadLoadersAsXLSX="viewModel.downloadLoadersAsXLSX"
        @getTransportRequests="viewModel.getTransportRequests($event)"
      ></filters-panel-component>
  
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, Ref } from 'vue';
import { TransportRequestsModel } from './transportRequests.model';
import { TransportRequestsViewModel } from './transportRequests.viewmodel';
import TableComponent from '../../components/table/table-component.vue';
import filtersPanelComponent from './components/filters-panel/filters-panel.component.vue';
import EmptyStateComponent from '../../components/empty-state/empty-state.component.vue';
import SkeletonComponent from '../../components/skeleton-table/skeleton.component.vue';
import { FieldModel } from '../../components/global/fields/fieild/field.model';



const model: Ref<TransportRequestsModel> = ref(new TransportRequestsModel(
  {
    fields: [
      new FieldModel({
        label: 'search',
        input: {
          type: 'text',
          value: '',
          placeholder: 'Введите номер транспортной заявки',
          isError: false,
          isDisabled: false,
          isTextarea: false,
          required: true,
          maxLength: 20,
        },
        helper: {
          isActive: true,
          value: 'test',
        },
      }),
    ],
  }
));



const viewModel: Ref<TransportRequestsViewModel> = ref(
  new TransportRequestsViewModel(model.value),
);
</script>

вот тут я передаю данные в компонент 
        :config="model.fields[0]"

я создать кнопку на главной странице которая будет очищать инпут поиска
