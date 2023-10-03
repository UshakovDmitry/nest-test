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
            :class="{ 'no-hover': !props.hover }"
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
              <cell-rows-type-delivery-time
                v-if="props.config.rows[i].config.type === 9"
                :config="{ ...props.config.rows[i].config, value: cell, id: i }"
              ></cell-rows-type-delivery-time>
              <cell-rows-type-double
                v-if="props.config.rows[i].config.type === 10"
                :config="{
                  ...props.config.rows[i].config,
                  value: cell,
                  id: i,
                }"
              ></cell-rows-type-double>
                <cell-type-weight-s-k-u
                v-if="props.config.rows[i].config.type === 11"
                :config="{
                  ...props.config.rows[i].config,
                  value: cell,
                  id: i,
                }"
              ></cell-type-weight-s-k-u>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
import cellRowsTypeDeliveryTime from '../global/cell-collection/rows/cellTypeDeliveryTime.vue';
import CellTypeWeightSKU from '../global/cell-collection/rows/cellTypeWeightSKU.vue';

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
  hover: {
    type: Boolean,
    default: true,
  },
});

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

<style scoped>
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 16px;
}
::-webkit-scrollbar-thumb {
  background-color: #c4c9c6;
  border-radius: 16px;
}
.test {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
}
.table-wrapper {
  white-space: nowrap;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e4e7e5;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
}

.table-component {
  border-collapse: collapse;
  background-color: white;
  border: 1px solid #e4e7e5;
  background: #fff;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
}

.table-thead-tr {
  padding-right: 20px;
  border-bottom: 1px solid #e4e7e5;
  background-color: #f1f7f4;
  border-radius: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  height: 80px;
}

.table-thead-tr th:first-child {
  border-top-left-radius: 16px;
}
.table-thead-tr th:last-child {
  border-top-right-radius: 16px;
}
.table-thead-tr-th {
  padding-left: 20px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #23362d;
  border-bottom: 1px solid #e4e7e5;
  text-align: left;
}

.table-tbody-tr {
  height: 80px;
}
.table-tbody-tr:hover {
  background-color: #f1f7f4;
  cursor: pointer;
}
.no-hover:hover {
  background-color: initial !important;
  cursor: initial !important;
}
.table-tbody-tr-td {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #23362d;
  border-bottom: 1px solid #e4e7e5;
  text-align: left;
}

.paginator__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  height: 80px;
}
.table-tbody-tr-td--border {
  border: 1px solid #e4e7e5;
}
</style>


<template>
  <div class="pagination">
    <div
      class="first-page-btn"
      data-test="first-page-btn"
      @click="goToFirstPage"
    >
      <IconComponent
        :сonfig="{
          name: 'doubleArrowRight',
          color: '#23362D4D',
          width: 28,
          height: 28,
        }"
      ></IconComponent>
    </div>
    <div class="prev-page-btn" data-test="prev-page-btn" @click="goToPrevPage">
      <IconComponent
        :сonfig="{
          name: 'keyboardLeft',
          color: '#23362D4D',
          width: 24,
          height: 24,
        }"
      ></IconComponent>
    </div>

    <button
      v-for="page in totalPages"
      :key="page"
      class="page-btn "
      data-test="page-btn"
      @click="goToPage(page)"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>

    <div class="next-page-btn" data-test="next-page-btn" @click="goToNextPage">
      <IconComponent
        :сonfig="{
          name: 'keyboardRight',
          color: '#23362D4D',
          width: 24,
          height: 24,
        }"
      ></IconComponent>
    </div>
    <div class="last-page-btn" data-test="last-page-btn" @click="goToLastPage">
      <IconComponent
        :сonfig="{
          name: 'doubleArrowRight',
          color: '#23362D4D',
          width: 28,
          height: 28,
        }"
      ></IconComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import IconComponent from '../icon/icon.component.vue';

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  initialPage: {
    type: Number,
    required: true,
  },
  currentCity: {
    type: String,
    required: false,
  },
});

const emit = defineEmits<{
  (e: 'page-change', value: number): void;
}>();

const currentPage = ref(props.initialPage);

const goToPage = (page: number) => {
  currentPage.value = page;
  emit('page-change', page);
};

const goToPrevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1);
  }
};

const goToNextPage = () => {
  if (currentPage.value < props.totalPages) {
    goToPage(currentPage.value + 1);
  }
};
const goToFirstPage = () => {
  goToPage(1);
};

const goToLastPage = () => {
  goToPage(props.totalPages);
};

watch(
  () => props.currentCity,
  () => {
    goToPage(1);
  },
);
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.first-page-btn {
  display: flex;
  width: 34px;
  height: 34px;
  justify-content: center;
  align-items: center;
  border-radius: 80px;
    /* КОСТЫЛЬ */
  padding: 4px 0px 0px 6px;
  box-sizing: border-box;
  outline: none;
  border: none;
  box-sizing: border-box;
  rotate: 180deg;
  color: var(--text-dark, #23362d);
  cursor: pointer;
  background: var(--secondary-grey, #F2F3F5);
}
.last-page-btn {
  display: flex;
  width: 34px;
  height: 34px;
  /* КОСТЫЛЬ */
  padding: 4px 0px 0px 6px;
  justify-content: center;
  align-items: center;
  border-radius: 80px;
  padding-top: 5px;
  outline: none;
  border: none;
  color: var(--text-dark, #23362d);
  cursor: pointer;
  background: var(--secondary-grey, #F2F3F5);
}
.page-btn {
  display: flex;
  width: 34px;
  height: 34px;
  /* padding: 4px; */
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  border-radius: 80px;
  outline: none;
  border: none;
  color: var(--text-dark, #23362d);
/* background: var(--secondary-grey, #F2F3F5); */
background-color: white;
  cursor: pointer;
  /* border: 1px solid #813909; */
}
.page-btn:hover {
  background-color: var(--secondary-grey, #F2F3F5);
}

.next-page-btn {
  display: flex;
  width: 34px;
  height: 34px;
  /* padding: 4px; */
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  border-radius: 80px;
  outline: none;
  border: none;
  color: var(--text-dark, #23362d);
background: var(--secondary-grey, #F2F3F5);
  cursor: pointer;
  /* border: 1px solid #813909; */
}

.prev-page-btn {
  display: flex;
  width: 34px;
  height: 34px;
  /* padding: 4px; */
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  border-radius: 80px;
  outline: none;
  border: none;
  color: var(--text-dark, #23362d);
background: var(--secondary-grey, #F2F3F5);
  cursor: pointer;
  /* border: 1px solid #813909; */
}
button.active {
  border-radius: 80px;
  background: var(--overlay-activated, rgba(0, 161, 83, 0.12));
  color: var(--primary-light-mode-dark, #006f39);
  text-align: center;
}

button:disabled {
  /* background-color: #ccc; */
  cursor: not-allowed;
}
</style>


