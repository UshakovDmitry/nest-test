у меня есть массив таких обьектов

{
    "request": {
        "number": "№№00148641",
        "status": true
    },
    "status": "Доставляется",
    "ISR": {
        "number": "0003852065-1",
        "status": "ПРИНЯТ НАМИ"
    },
    "document": "Заказ покупателя ППО",
    "recipient": {
        "name": "АЙНУР НУРДАУЛЕТОВНА",
        "phone": "(775)2294550"
    },
    "deliveryTime": {
        "date": "03.10.2023 17:25:41",
        "time": "2023-10-04 После 15:00"
    },
    "deliveryAddress": {
        "address": "Алматы, нет данных, 7, оплатит километраж, нет данных",
        "coordinates": "43.334853, 76.808409"
    },
    "quantitties": {
        "totalPrice": "214400",
        "totalWeight": "66"
    }
}
также есть страница 
<template>
  <section class="transport">
    <h1 class="transport__title">Заявки на транспорт</h1>
    <div class="transport__content">
      <filters-panel-component
        :cities="model.cities"
        @select-city="viewModel.selectCity($event)"
        @downloadLoadersAsXLSX="viewModel.downloadLoadersAsXLSX"
      ></filters-panel-component>
      <table-component
        :headers="model.headersTransportRequests"
        :rows="model.transportRequests"
        :config="model.configTransportRequests"
        :currentCity="model.currentCity"
        :pagination="true"
        @goToDetail="viewModel.goToTransportRequestDetail($event)"
      ></table-component>
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
</style>


я хочу реализовать поиск по полю "request.number"

реализуй инпут и поиск 
