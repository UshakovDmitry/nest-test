import { Driver } from './../../domain/entities/Driver';
import { usePostApi } from '../../domain/services/postHTTP.service';
import router from '../../router';
import { type TransportRequestsModel } from './transportRequests.model';

export class TransportRequestsViewModel {
  model: TransportRequestsModel;
  eventSource: EventSource;

  constructor(model: any) {
    this.model = model;
    this.eventSource = new EventSource(
      'http://tms.next.local/api/getTransportRequests/sse',
    );
    this.setupEventListeners();
    this.getTransportRequests('today');
  }


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

У меня проблема 
когда я меняю город через filterRequestsByCity и обновляю данные с помощью updateContractorsData 
то у меня не работает переключением по ним

     <FilterContractorsButtonsComponent
      :filterContractors="filterContractors"
      :currentCity="currentCity"
      @filterRequestsByContractor="emits('filterRequestsByContractor', $event)"
    ></FilterContractorsButtonsComponent>


<template>
  <div class="wrapper">
    <button
      v-for="(count, contractor) in filterContractors"
      :key="contractor"
      class="btn"
      :class="{ active: activeButton === contractor }"
      @click="buttonClicked(contractor)"
    >
      {{ contractor }} ({{ count }})
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  filterContractors: Object,
  currentCity: String,
});

const emits = defineEmits(['filterRequestsByContractor']);

const activeButton = ref('');

watch(() => props.currentCity, (newCity, oldCity) => {
  // Сбрасываем активную кнопку при изменении currentCity
  if (newCity !== oldCity) {
    activeButton.value = '';
    emits('filterRequestsByContractor', ''); // Сбрасываем фильтр
  }
});

const buttonClicked = (contractor: string) => {
  if (activeButton.value === contractor) {
    activeButton.value = '';
    emits('filterRequestsByContractor', '');
  } else {
    activeButton.value = contractor;
    emits('filterRequestsByContractor', contractor);
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 400px;
}

.btn {
    font-family: Rubik;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  border-radius: 80px;
  border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
  background: var(--surface-light-mode-background, #fbfbfb);
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  padding: 6px 16px;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  cursor: pointer;
}

.btn:hover {
  background-color: #eceaea;
}
.btn.active {
  border-radius: 80px;
  background: var(--primary-dark-mode-main-24, rgba(94, 222, 137, 0.24));
  box-shadow:
    0px 2px 6px 2px rgba(204, 204, 204, 0.15),
    0px 1px 2px 0px rgba(204, 204, 204, 0.3);
}
</style>
