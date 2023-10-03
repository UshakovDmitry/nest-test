у меня есть массив из вот таких обьектов 
{
    "number": "№№00148145",
    "status": "Доставляется",
    "ISR": "288316444",
    "document": "Заказ покупателя ППО",
    "recipient": {
        "name": "Елемесова Акмарал",
        "phone": "(701)2343899"
    },
    "deliveryTime": {
        "date": "02.10.2023 16:45:39",
        "time": "2023-10-03 До 20:00"
    },
    "deliveryAddress": {
        "address": "Шымкент, нет данных, 5, нет данных",
        "coordinates": "42,374896, 69,597255"
    },
    "quantitties": {
        "totalPrice": "26290",
        "totalWeight": "2.3"
    }
}

я добавил поле инпут для реализации поиска по "number" 

вот viewmodel 
import { useGetApi } from '../../domain/services/getHTTP.service';
import router from '../../router';
import { type TransportRequestsModel } from './applications.model';
// import { ITransportRequest } from '../../domain/interfaces/transportRequest.interface';

export class TransportRequestsViewModel {
  model: TransportRequestsModel;

  constructor(model: any) {
    this.model = model;
    this.getTransportRequests();
  }

  async getTransportRequests(): Promise<void> {
    const response = await useGetApi('getTransportRequests');
    console.log(response.length, 'кол-во заявок');
    response.forEach((data: any) => {
      
      const transformedData = this.transformToTransportRequest(data);
      const city = this.setCitiesList(transformedData);
      // Проверяем наличие города в списке и добавляем, если его нет
      if (!this.model.cities.includes(city)) {
          this.model.cities.push(city);
      }            
      const transformedDataForTable =
        this.transformToTransportForTable(transformedData);
        console.log(transformedDataForTable, 'transformedDataForTable');
        
      this.model.transportRequests.unshift(transformedDataForTable);
    });
  }

  setCitiesList(data) {
        return data.contactInformation.City;
  }

  selectCity(city: string): void {
    console.log(city);
  }

  downloadLoadersAsXLSX(): void {
    alert('Функционал в разработке');
  }

  goToTransportRequestDetail(row: any) {
    console.log('router');

    router.push({
      name: 'ApplicationDetail',
      params: { id: row.number },
      query: {
        number: row.number,
      },
    });
  }

  transformToTransportRequest(data: any) {
    return {
      number: String(data.Number),
      status: String(data.DocumentStatus),
      ISR: String(data.ISR),
      document: String(data.Informal_Document),
      carModel: String(data.CarModel),
      carNumber: String(data.NuberCar),
      numberPPO: String(data.NuberPPO),
      organization: String(data.Organization),
      typePayment: String(data.TypePayment),
      loanAgreementStatus: String(data.loanAgreementStatus),
      quantities: data.StructureQuantities,
      chronologies: data.ArrayChronologies,
      contactInformation: data.ContactInformation,
      orders: data.ArrayStrings,
      dataCreated: String(data.DateCreated),
      date: String(data.Date),
      driver: String(data.Driver),
      fiterContractor: String(data.FilterContractor),
    };
  }

  transformToTransportForTable(data: any) {
    return {
      number: String(data.number),
      status: String(data.status),
      ISR: String(data.ISR),
      document: String(data.document),
      // shippingAddress: {
      //   address: `${data.contactInformation.City}, ${data.contactInformation.Street}, ${data.contactInformation.Home}, ${data.contactInformation.Apartment}`,
      //   coordinates: `${data.contactInformation.Latitude}, ${data.contactInformation.Longitude}`,
      // },
      recipient: {
        name: String(data.contactInformation.Contractor),
        phone: String(data.contactInformation.Phone),
      },
      deliveryTime: {
        date: String(data.date),
        time: String(data.contactInformation.Date_Time_delivery),
      },
      deliveryAddress: {
        address: `${data.contactInformation.City}, ${data.contactInformation.Street}, ${data.contactInformation.Home}, ${data.contactInformation.Apartment}`,
        coordinates: `${data.contactInformation.Latitude}, ${data.contactInformation.Longitude}`,
      },
      quantitties: {
        totalPrice: data.quantities
          ? String(data.quantities.TotalAmount)
          : '-/-/-',
        totalWeight: data.quantities
          ? String(data.quantities.TotalWeight)
          : '---',
      },
    };
  }
}

вот view
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


