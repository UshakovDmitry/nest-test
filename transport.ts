у меня есть компонент и внутри него я написал функция handleDate и обьявил новую переменную dateSelection

также у меня есть viewModel где прописаны все методы и функции

я хочу перенести это в нутрь viewModel и импортировать в компоненте через emits
вот компонент
<template>
  <div class="filters">
    <FilterContractorsButtonsComponent
      :key="Object.keys(filterContractors).length"
      :filterContractors="filterContractors"
      :currentCity="currentCity"
      @filterRequestsByContractor="emits('filterRequestsByContractor', $event)"
    ></FilterContractorsButtonsComponent>

    <div
      class="yesterday"
      :class="{ 'yesterday--active': isYesterday }"
      @click="emits('getTransportRequests', 'yesterday')"
    >
      <span>Вчера</span>
    </div>
    <div
      class="today"
      :class="{ 'today--active': isToday }"
      @click="emits('getTransportRequests', 'today')"
    >
      <span>Сегодня</span>
    </div>
    <div
      class="tomorrow"
      :class="{ 'tomorrow--active': isTomorrow }"
      @click="emits('getTransportRequests', 'tomorrow')"
    >
      <span>Завтра</span>
    </div>

    <div class="search">
      <search-field-component
        :config="config"
        :isToday="isToday"
        :isYesterday="isYesterday"
        :isTomorrow="isTomorrow"
        :currentCity="currentCity"
        :placeholder="placeholder"
        @search="emits('search', $event)"
      ></search-field-component>
      <VueDatePicker
        v-model="dateSelection"
        locale="ru"
        range
        :format="'dd.MM'"
        :placeholder="'Выберите диапазон дат'"
        class="date_picker"
        @update:model-value="handleDate"
      ></VueDatePicker>
    </div>

    <div class="set-city">
      <dropdown-component
        :items="cities"
        :width="350"
        :isToday="isToday"
        :isYesterday="isYesterday"
        :isTomorrow="isTomorrow"
        :currentValue="'Выберите город'"
        @onSelect="emits('selectCity', $event)"
      ></dropdown-component>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import DropdownComponent from '../../../../components/global/dropdown/dropdown.vue';
import SearchFieldComponent from '../../../../components/global/fields/search-field/search-field.vue';
// import xlsxicon from '../../../../public/icons/XLSX.svg';
import IconComponent from '../../../../components/global/icon/icon.component.vue';
import FilterContractorsButtonsComponent from './filter-contractors-buttons.vue';
import ButtonComponent from '../../../../components/global/button/button.vue';

const props = defineProps<{
  cities: any[];
  placeholder: string;
  isToday?: boolean;
  isYesterday?: boolean;
  isTomorrow?: boolean;
  filterContractors: Object;
  config: any;
  currentCity: string;
}>();

const dateSelection = ref();

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
  'getTransportRequests',
  'filterRequestsByContractor',
  'clearDays',
]);
</script>
<style scoped>
.filters {
  width: 100%;
  height: 104px;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  align-items: center;
  flex-direction: row;
  margin-top: 5px;
}

.sort-by-contractor {
  width: 100%;
  border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  /* border-radius: 80px; */
  box-sizing: border-box;
  background: #fff;
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
  /* width: 25%; */
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
  border: 1px solid #00a153;
  color: #00a153;
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
  border: 1px solid #00a153;
  color: #00a153;
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
  border: 1px solid #00a153;
  color: #00a153;

  /* border-radius: 12px; */
  transition: all 0.3s ease-in-out;
}
</style>

и вот методы в родиттельском компоненте 

import { Driver } from './../../domain/entities/Driver';
// import { useGetApi } from '../../domain/services/getHTTP.service';
import { usePostApi } from '../../domain/services/postHTTP.service';
import router from '../../router';
import { type TransportRequestsModel } from './transportRequests.model';
// import { ITransportRequest } from '../../domain/interfaces/transportRequest.interface';

export class TransportRequestsViewModel {
  model: TransportRequestsModel;
  eventSource: EventSource;

  constructor(model: any) {
    this.model = model;
    this.eventSource = new EventSource(
      'http://tms.next.local/api/getTransportRequests/sse',
      // 'http://localhost:4000/api/getTransportRequests/sse',
    );
    this.setupEventListeners();
    this.getTransportRequests('today');
  }

  setupEventListeners() {
    //TODO: Переделать на нормальный EventSource!!!
    // this.eventSource.onmessage = (event) => {
    //   console.log('Прилетает Pong', JSON.parse(event.data));

    //   if (JSON.parse(event.data).message === 'Pong') {
    //     this.model.transportRequests = [];
    //     this.getTransportRequests('today');
    //   }
    // };
  }


  // async getTransportRequestByDate(): Promise<void> {
  //   const today = new Date();
  //   const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  //   const body = {
  //     date: formattedDate,
  //   };
  //   const response = await usePostApi('getTransportRequestsByDate', body);
  //   console.log(response, 'заявки');

  // }
  async getTransportRequests(day: string): Promise<void> {
    const today = new Date();

    if (day === 'tomorrow') {
      today.setDate(today.getDate() + 1);
      this.model.isTomorrow = true;
      this.model.isToday = false;
      this.model.isYesterday = false;
    } else if (day === 'yesterday') {
      today.setDate(today.getDate() - 1);
      this.model.isTomorrow = false;
      this.model.isToday = false;
      this.model.isYesterday = true;
    } else if (day === 'today') {
      this.model.isTomorrow = false;
      this.model.isToday = true;
      this.model.isYesterday = false;
    }

    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const body = {
      date: formattedDate,
    };
    
    const response = await usePostApi('getTransportRequestsByDate', body);
    console.log(response.length, 'кол-во заявок');
    // console.log(response, 'response');
    this.model.transportRequests = [];
    this.model.filterContractors = {};
    response.forEach((data: any) => {
      const transformedData = this.transformToTransportRequest(data);
      const city = this.setCitiesList(transformedData);
      // Проверяем наличие города в списке и добавляем, если его нет
      if (!this.model.cities.includes(city)) {
        this.model.cities.push(city);
      }
      if (!this.model.cities.includes("Все города")) {
        this.model.cities.unshift("Все города");
      }
    
      

      const contractor = data.FilterContractor
        ? data.FilterContractor
        : 'Прочее';
      if (this.model.filterContractors[contractor]) {
        this.model.filterContractors[contractor] += 1;
      } else {
        this.model.filterContractors[contractor] = 1;
      }
      const transformedDataForTable =
        this.transformToTransportForTable(transformedData);

      this.model.transportRequests.unshift(transformedDataForTable);
      this.model.filteredTransportRequests = this.model.transportRequests;
    });
    
  }


  filterRequestsByContractor(contractor: string): void {
    this.model.currentContractor = contractor;
    let baseRequestsList = this.model.transportRequests;
  
    // Если уже применен фильтр по городу, используем отфильтрованный список
    if (this.model.currentCity !== 'Все города' && this.model.currentCity) {
      baseRequestsList = this.model.filteredTransportRequests;
    }
  
    if (!contractor) { // Если contractor пустая строка, снимаем фильтр
      this.model.filteredTransportRequests = baseRequestsList;
    } else if (contractor === "Прочее") {
      this.model.filteredTransportRequests = baseRequestsList.filter(
        request => !request.filterContractor || request.filterContractor.trim() === ""
      );
    } else {
      this.model.filteredTransportRequests = baseRequestsList.filter(
        request => request.filterContractor === contractor
      );
    }
  
    // Обновляем список после фильтрации
    this.model.lastFilteredTransportRequests = this.model.filteredTransportRequests;
  }


  setTimeRange(timeRange) {
    this.getTransportRequestsByDateRange(timeRange[0], timeRange[1]);
  }

  async getTransportRequestsByDateRange(
    dateStart: string,
    dateEnd: string,
  ): Promise<void> {
    const body = {
      startDate: dateStart,
      endDate: dateEnd,
    };
    try {
      const response = usePostApi(
        'getTransportRequestsbyDateRange',
        body,
        'sendFormData',
      );

      const data = await response;

      // Очистить текущие данные перед добавлением новых
      this.model.transportRequests = [];
      this.model.filterContractors = {};

      data.forEach((dataItem: any) => {
        const transformedData = this.transformToTransportRequest(dataItem);
        const contractor = dataItem.FilterContractor
        ? dataItem.FilterContractor
        : 'Прочее';
      if (this.model.filterContractors[contractor]) {
        this.model.filterContractors[contractor] += 1;
      } else {
        this.model.filterContractors[contractor] = 1;
      }
        const transformedDataForTable =
          this.transformToTransportForTable(transformedData);
        this.model.transportRequests.push(transformedDataForTable);
      });
      this.model.filteredTransportRequests = this.model.transportRequests;
      this.model.isToday = false;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }
  search(value: string) {
  
    const searchQuery = value.toLowerCase();
  
    if (this.model.currentCity !== 'Все города' && this.model.currentCity !== '') {
      this.model.filteredTransportRequests = this.model.lastFilteredTransportRequests.filter(item => {
        return item.request.number.toLowerCase().includes(searchQuery) ||
               item.document.numberPPO.toLowerCase().includes(searchQuery);
      });
    } else {
      this.model.filteredTransportRequests = this.model.transportRequests.filter(item => {
        return item.request.number.toLowerCase().includes(searchQuery) ||
               item.document.numberPPO.toLowerCase().includes(searchQuery);
      });
    }
  }


  setCitiesList(data) {
    return data.contactInformation.City;
  }


  downloadLoadersAsXLSX(): void {
    alert('Функционал в разработке');
  }

  goToTransportRequestDetail(row: any) {
    console.log('router');

    router.push({
      name: 'TransportRequestsDetail',
      params: { id: row.request.number },
      query: {
        number: row.request.number,
      },
    });
  }

  transformToTransportRequest(data: any) {
    
    return {
      request: {
        number: String(data.Number),
        status: data.Driver && data.Driver !== '' ? true : false,
      },
      status:  data.IsDelete === true ? String(data.DocumentStatus += ' (помечено на удаление)') :String(data.DocumentStatus),
      ISR: {
        number: String(data.ISR),
        status: String(data.loanAgreementStatus),
      },
      document: String(data.Informal_Document),
      carModel: String(data.CarModel),
      carNumber: String(data.NuberCar),
      numberPPO: String(data.NumberPPO),
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
      filterContractor: String(data.FilterContractor),
    };
  }

  transformToTransportForTable(data: any) {
    console.log(data.NumberPPO, 'dssssata');
    
    return {
      request: data.request,
      status: String(data.status),
      ISR: data.ISR,
      document: {
        document:String(data.document),
        numberPPO: String(data.numberPPO),
      },
      filterContractor: String(data.filterContractor),
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

  filterRequestsByCity(city: string): void {
    this.model.currentCity = city;
    if (city === 'Все города') {
      this.model.filteredTransportRequests = this.model.transportRequests;
    } else {
      this.model.filteredTransportRequests = this.model.transportRequests.filter(
        request => {
          const addressParts = request.deliveryAddress.address.split(',');
          const requestCity = addressParts[0]?.trim(); 
          return requestCity === city;
        }
      );
    }
  
    // Сохраняем состояние последнего примененного фильтра
    this.model.lastFilteredTransportRequests = this.model.filteredTransportRequests;
    
    // Обновляем данные о подрядчиках
    this.updateContractorsData();
  }
  
  updateContractorsData(): void {
    // Сбрасываем текущие данные о подрядчиках
    this.model.filterContractors = {};
  
    // Пересчитываем данные на основе отфильтрованного списка заявок
    this.model.filteredTransportRequests.forEach(request => {
      const contractor = request.filterContractor ? request.filterContractor : 'Прочее';
      if (this.model.filterContractors[contractor]) {
        this.model.filterContractors[contractor] += 1;
      } else {
        this.model.filterContractors[contractor] = 1;
      }
    });
  }


}
