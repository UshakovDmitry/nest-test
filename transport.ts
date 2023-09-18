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
          >
            <td
              v-for="(cell, cellIndex, i) in row"
              :key="cellIndex"
              class="table-tbody-tr-td"
            >
              <cell-rows-type-toggle
                v-if="props.config.rows[i].config.type === 2"
                :config="{ ...props.config.rows[i].config, value: cell, id: i , isActive: row.isActive}"
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
              <!-- <p v-else>{{ cell  }}</p> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="paginator__wrapper">
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

const props = defineProps<{
  headers: string[];
  rows: any[];
  config: any;
  currentCity: string;
}>();
console.log(props.config, 'props.config');

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
  height: 771px;
  /* border: 1px solid #5c1696; */
}
.table-wrapper {
  white-space: nowrap;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e4e7e5;
  width: 100%;
  height: 721px;
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

.table-tbody-tr td:first-child {
  border-top-left-radius: 16px;
}
.table-tbody-tr td:last-child {
  border-top-right-radius: 16px;
}
.table-tbody-tr:last-child td:first-child {
  border-bottom-left-radius: 16px;
}
.table-tbody-tr:last-child td:last-child {
  border-bottom-right-radius: 16px;
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
  /* border: 1px solid #c731cc; */
}
</style>
