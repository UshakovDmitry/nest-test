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
console.log(props.rows, 'props.rows');

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
</style>
