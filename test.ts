почему paginatedRows пустой массив ?
вот что приходит в props.rows
[
    {
        "number": "№№00015684",
        "carModel": "Gazel",
        "carNumber": "undefined",
        "status": "Перенос доставки",
        "ISR": "240783461",
        "document": "Заказ покупателя ППО",
        "numberPPO": "8149234",
        "organization": "TOO Gulser Computers (Гулсер Компьютерс)",
        "typePayment": "Кредит",
        "loanAgreementStatus": "ОПЛАЧЕН",
        "quantities": {
            "TotalWeight": "0.4",
            "TotalAmount": "27990",
            "_id": "65166c08f43ae4290cb711f1"
        },
        "chronologies": [
            {
                "PPO": "8149234",
                "Chronology": [
                    "Оформлен",
                    "Доставляется до клиента (на складе отгрузки)",
                    "Доставляется",
                    "Сделка завершена"
                ]
            }
        ],
        "contactInformation": {
            "City": "Алматы",
            "Delivery_Condition": "Доставка",
            "Date_Time_delivery": "2023-02-03 До 20:00",
            "Time_Window": "нет данных",
            "Latitude": "43,253029",
            "Longitude": "76,938656",
            "Street": "Кайсар Плаза",
            "Home": "115",
            "Phone": "(706)4192015",
            "Apartment": "Кайсар Плаза",
            "Contractor": "Таирова Жанета",
            "_id": "65166c08f43ae4290cb711f0"
        },
        "orders": [
            {
                "NuberPPO": "8149234",
                "PPOStatus": "Сделка завершена",
                "SKU": "1330426",
                "Goods": "Умная Колонка Яндекс.Станция Лайт, Мята (YNDX-00025 Green)",
                "Count": "1",
                "ShippingAddress": "Almaty, Rayymbeka, 127/147",
                "Brand": "Яндекс",
                "Weight": "0,4",
                "Price": "27 990",
                "Item_Status": "Забран",
                "Pickup_Point": "1",
                "Delivery_Point": "2",
                "Pickup_Latitude": "12",
                "Pickup_Longitude": "15",
                "Delivery_Latitude": "15",
                "Delivery_Longitude": "14",
                "Pickup_Time": "01.01.0001 9:00:00",
                "Delivery_Time": "01.01.0001 15:00:00"
            }
        ],
        "dataCreated": "29-9-2023",
        "date": "27.09.2023 11:03:39",
        "driver": "Чунаев Марат Чакенович",
        "fiterContractor": "Alser"
    },
    {
        "number": "№№00146232",
        "carModel": "",
        "carNumber": "undefined",
        "status": "Доставляется",
        "ISR": "(705)2351414",
        "document": "Заказ покупателя ППО",
        "numberPPO": "8767774",
        "organization": "TOO Gulser Computers (Гулсер Компьютерс)",
        "typePayment": "Кредит",
        "loanAgreementStatus": "",
        "quantities": {
            "TotalWeight": "50",
            "TotalAmount": "178591",
            "_id": "65166bce60be5bae107646af"
        },
        "chronologies": [
            {
                "PPO": "8767774",
                "Chronology": [
                    "Оформлен",
                    "Доставляется до клиента (на складе отгрузки)",
                    "Доставляется"
                ]
            }
        ],
        "contactInformation": {
            "City": "Шымкент",
            "Delivery_Condition": "Доставка",
            "Date_Time_delivery": "2023-09-29  До 20:00",
            "Time_Window": "18:00-20:00",
            "Latitude": "42.332541000000006",
            "Longitude": "69.67571849999999",
            "Street": "1",
            "Home": "6",
            "Phone": "(705)2351414",
            "Apartment": "1",
            "Contractor": "назгкл назгкл",
            "_id": "65166bce60be5bae107646ae"
        },
        "orders": [
            {
                "NuberPPO": "8767774",
                "PPOStatus": "Доставляется",
                "SKU": "1382082",
                "Goods": "FS3687.3W/Морозильный ларь Hansa",
                "Count": "1",
                "ShippingAddress": "SHymkent, ul. mkr. Kyzylzhar, ul. ZHidelibaysyn, 92 # SHymkent, mkr. Kyzylzhar, ul. ZHidelibaysyn, 92",
                "Brand": "HANSA",
                "Weight": "50",
                "Price": "178 591",
                "Item_Status": "Забран",
                "Pickup_Point": "0",
                "Delivery_Point": "12",
                "Pickup_Latitude": "42,348907",
                "Pickup_Longitude": "69,530052",
                "Delivery_Latitude": "42,332541",
                "Delivery_Longitude": "69,675719",
                "Pickup_Time": "01.01.0001 9:00:00",
                "Delivery_Time": "01.01.0001 14:22:20"
            }
        ],
        "dataCreated": "29-9-2023",
        "date": "28.09.2023 15:21:10",
        "driver": "Әбілдаев Абылайхан Әшімұлы",
        "fiterContractor": "Alser"
    }
]

<template>
  <div class="test">
    <div class="table-wrapper">
      <table class="table-component" v-if="props.rows.length >= 1">
        <thead>
          <tr class="table-thead-tr">
            <th class="table-thead-tr-th" v-for="(header, i) in props.headers">
              <cell-header-type-toggle
                v-if="props.config.headers[i].config.type === 2"
                :config="{
                  ...props.config.headers[i].config,
                  value: header,
                  id: i,
                }"
              ></cell-header-type-toggle>
              <cell-header-type-simple
                v-if="props.config.headers[i].config.type === 1"
                :config="{
                  ...props.config.headers[i].config,
                  value: header,
                  id: i,
                }"
              ></cell-header-type-simple>
              <cell-header-type-sort
                v-if="props.config.headers[i].config.type === 3"
                :config="{
                  ...props.config.headers[i].config,
                  value: header,
                  id: i,
                }"
              ></cell-header-type-sort>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="table-tbody-tr"
            v-for="(row, rowIndex) in paginatedRows"
            :key="rowIndex"
            @click="emits('goToDetail', row)"
          >
            <td
              v-for="(cell, cellIndex, i) in row"
              :key="cellIndex"
              class="table-tbody-tr-td"
              :class="{
                'table-tbody-tr-td--border': props.border,
              }"
            >
              <cell-rows-type-toggle
                v-if="props.config.rows[i].config.type === 2"
                :config="{
                  ...props.config.rows[i].config,
                  value: cell,
                  id: i,
                  // isActive: row.isActive,
                }"
              ></cell-rows-type-toggle>
              <cell-rows-type-simple
                v-if="props.config.rows[i].config.type === 1"
                :config="{ ...props.config.rows[i].config, value: cell, id: i }"
              ></cell-rows-type-simple>
              <cell-rows-type-status
                v-if="props.config.rows[i].config.type === 4"
                :config="{ ...props.config.rows[i].config, value: cell, id: i }"
              ></cell-rows-type-status>
              <cell-rows-type-address
                v-if="props.config.rows[i].config.type === 7"
                :config="{ ...props.config.rows[i].config, value: cell, id: i }"
              ></cell-rows-type-address>
              <cell-rows-type-contractor
                v-if="props.config.rows[i].config.type === 8"
                :config="{ ...props.config.rows[i].config, value: cell, id: i }"
              ></cell-rows-type-contractor>
              <cell-rows-type-double
                v-if="props.config.rows[i].config.type === 10"
                :config="{ ...props.config.rows[i].config, value: cell, id: i }"
              ></cell-rows-type-double>
              <!-- <p v-else>{{ cell  }}</p> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    {{ paginatedRows  }}
    <div v-if="pagination" class="paginator__wrapper">
      <paginator-component
        :total-pages="totalPages"
        :initial-page="1"
        :currentCity="props.currentCity"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PaginatorComponent from '../global/paginator/paginator.vue';
//headers
import cellHeaderTypeSimple from '../global/cell-collection/headers/cellTypeSimple.vue';
import cellHeaderTypeToggle from '../global/cell-collection/headers/cellTypeToggle.vue';
import cellHeaderTypeSort from '../global/cell-collection/headers/cellTypeSort.vue';
//rows
import cellRowsTypeToggle from '../global/cell-collection/rows/cellTypeToggle.vue';
import cellRowsTypeSimple from '../global/cell-collection/rows/cellTypeSimple.vue';
import cellRowsTypeStatus from '../global/cell-collection/rows/cellTypeStatus.vue';
import cellRowsTypeAddress from '../global/cell-collection/rows/cellTypeAddress.vue';
import cellRowsTypeContractor from '../global/cell-collection/rows/cellTypeContractor.vue';
import cellRowsTypeDouble from '../global/cell-collection/rows/cellTypeDouble.vue';

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  config: {
    type: Object,
    required: true,
  },
  pagination: {
    type: Boolean,
    required: true,
  },
  currentCity: {
    type: String,
    required: false,
  },
  border: {
    type: Boolean,
    required: false,
  },
});
console.log(props.config , 'props.config');

const emits = defineEmits(['goToDetail']);

const itemsPerPage = ref(7); // Количество элементов на странице
const currentPage = ref(1); // Текущая страница

const totalPages = computed(() =>
  Math.ceil(props.rows.length / itemsPerPage.value),
);

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return props.rows.slice(start, end);

});



const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};
</script>
