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
              <p v-else>{{ cell  }}</p>
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






main.ts:13 [Vue warn]: Unhandled error during execution of render function 
  at <TableComponent headers= (9) ['№ заявки', 'Статус', 'ISR', 'Документ основания', 'Адрес отгрузки', 'Получатель', 'Время доставки', 'Адрес получателя', 'Вес SKU'] rows= [{…}] config= {headers: Array(9), rows: Array(9)}  ... > 
  at <Applications.component onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< undefined > > 
  at <RouterView> 
  at <Dafault onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< undefined > > 
  at <RouterView> 
  at <App>
warn2 @ runtime-core.esm-bundler.js:41
logError @ runtime-core.esm-bundler.js:216
handleError @ runtime-core.esm-bundler.js:208
renderComponentRoot @ runtime-core.esm-bundler.js:853
componentUpdateFn @ runtime-core.esm-bundler.js:5701
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
setupRenderEffect @ runtime-core.esm-bundler.js:5822
mountComponent @ runtime-core.esm-bundler.js:5612
processComponent @ runtime-core.esm-bundler.js:5565
patch @ runtime-core.esm-bundler.js:5040
mountChildren @ runtime-core.esm-bundler.js:5284
mountElement @ runtime-core.esm-bundler.js:5191
processElement @ runtime-core.esm-bundler.js:5156
patch @ runtime-core.esm-bundler.js:5028
mountChildren @ runtime-core.esm-bundler.js:5284
mountElement @ runtime-core.esm-bundler.js:5191
processElement @ runtime-core.esm-bundler.js:5156
patch @ runtime-core.esm-bundler.js:5028
componentUpdateFn @ runtime-core.esm-bundler.js:5708
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
setupRenderEffect @ runtime-core.esm-bundler.js:5822
mountComponent @ runtime-core.esm-bundler.js:5612
processComponent @ runtime-core.esm-bundler.js:5565
patch @ runtime-core.esm-bundler.js:5040
componentUpdateFn @ runtime-core.esm-bundler.js:5708
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
setupRenderEffect @ runtime-core.esm-bundler.js:5822
mountComponent @ runtime-core.esm-bundler.js:5612
processComponent @ runtime-core.esm-bundler.js:5565
patch @ runtime-core.esm-bundler.js:5040
mountChildren @ runtime-core.esm-bundler.js:5284
mountElement @ runtime-core.esm-bundler.js:5191
processElement @ runtime-core.esm-bundler.js:5156
patch @ runtime-core.esm-bundler.js:5028
mountChildren @ runtime-core.esm-bundler.js:5284
mountElement @ runtime-core.esm-bundler.js:5191
processElement @ runtime-core.esm-bundler.js:5156
patch @ runtime-core.esm-bundler.js:5028
mountChildren @ runtime-core.esm-bundler.js:5284
mountElement @ runtime-core.esm-bundler.js:5191
processElement @ runtime-core.esm-bundler.js:5156
patch @ runtime-core.esm-bundler.js:5028
componentUpdateFn @ runtime-core.esm-bundler.js:5708
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
setupRenderEffect @ runtime-core.esm-bundler.js:5822
mountComponent @ runtime-core.esm-bundler.js:5612
processComponent @ runtime-core.esm-bundler.js:5565
patch @ runtime-core.esm-bundler.js:5040
componentUpdateFn @ runtime-core.esm-bundler.js:5773
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
callWithErrorHandling @ runtime-core.esm-bundler.js:158
flushJobs @ runtime-core.esm-bundler.js:357
Promise.then (async)
queueFlush @ runtime-core.esm-bundler.js:270
queuePostFlushCb @ runtime-core.esm-bundler.js:290
queueEffectWithSuspense @ runtime-core.esm-bundler.js:1603
scheduler @ runtime-core.esm-bundler.js:1773
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:363
triggerRefValue @ reactivity.esm-bundler.js:974
(anonymous) @ reactivity.esm-bundler.js:1135
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:358
triggerRefValue @ reactivity.esm-bundler.js:974
(anonymous) @ reactivity.esm-bundler.js:1135
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:358
triggerRefValue @ reactivity.esm-bundler.js:974
set value @ reactivity.esm-bundler.js:1018
finalizeNavigation @ vue-router.mjs:3355
(anonymous) @ vue-router.mjs:3220
Promise.then (async)
pushWithRedirect @ vue-router.mjs:3187
push @ vue-router.mjs:3112
install @ vue-router.mjs:3551
use @ runtime-core.esm-bundler.js:3752
(anonymous) @ main.ts:13
Show 79 more frames
Show less
main.ts:13 [Vue warn]: Unhandled error during execution of scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core 
  at <TableComponent headers= (9) ['№ заявки', 'Статус', 'ISR', 'Документ основания', 'Адрес отгрузки', 'Получатель', 'Время доставки', 'Адрес получателя', 'Вес SKU'] rows= [{…}] config= {headers: Array(9), rows: Array(9)}  ... > 
  at <Applications.component onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< undefined > > 
  at <RouterView> 
  at <Dafault onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< undefined > > 
  at <RouterView> 
  at <App>
warn2 @ runtime-core.esm-bundler.js:41
logError @ runtime-core.esm-bundler.js:216
handleError @ runtime-core.esm-bundler.js:208
callWithErrorHandling @ runtime-core.esm-bundler.js:160
flushJobs @ runtime-core.esm-bundler.js:357
Promise.then (async)
queueFlush @ runtime-core.esm-bundler.js:270
queuePostFlushCb @ runtime-core.esm-bundler.js:290
queueEffectWithSuspense @ runtime-core.esm-bundler.js:1603
scheduler @ runtime-core.esm-bundler.js:1773
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:363
triggerRefValue @ reactivity.esm-bundler.js:974
(anonymous) @ reactivity.esm-bundler.js:1135
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:358
triggerRefValue @ reactivity.esm-bundler.js:974
(anonymous) @ reactivity.esm-bundler.js:1135
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:358
triggerRefValue @ reactivity.esm-bundler.js:974
set value @ reactivity.esm-bundler.js:1018
finalizeNavigation @ vue-router.mjs:3355
(anonymous) @ vue-router.mjs:3220
Promise.then (async)
pushWithRedirect @ vue-router.mjs:3187
push @ vue-router.mjs:3112
install @ vue-router.mjs:3551
use @ runtime-core.esm-bundler.js:3752
(anonymous) @ main.ts:13
Show 27 more frames
Show less
table-component.vue:48 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'config')
    at table-component.vue:48:44
    at renderList (runtime-core.esm-bundler.js:2776:18)
    at table-component.vue:56:18
    at renderList (runtime-core.esm-bundler.js:2755:16)
    at Proxy._sfc_render (table-component.vue:57:16)
    at renderComponentRoot (runtime-core.esm-bundler.js:816:16)
    at ReactiveEffect.componentUpdateFn [as fn] (runtime-core.esm-bundler.js:5701:46)
    at ReactiveEffect.run (reactivity.esm-bundler.js:178:19)
    at instance.update (runtime-core.esm-bundler.js:5814:51)
    at setupRenderEffect (runtime-core.esm-bundler.js:5822:5)









