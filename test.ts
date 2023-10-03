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
      v-for="page in displayedPages"
      :key="page"
      class="page-btn"
      data-test="page-btn"
      @click="goToPage(page)"
      :class="{ active: currentPage.value === page }"
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
import { ref, watch ,computed} from 'vue';
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
const centerPage = ref(props.initialPage);

const displayedPages = computed(() => {
  const start = Math.max(centerPage.value - 2, 1);
  const end = Math.min(centerPage.value + 2, props.totalPages);

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const goToPage = (page: number) => {
  currentPage.value = page;
  centerPage.value = page;
  emit('page-change', page);
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

</style>

Property 'goToPrevPage' does not exist on type '{ $: ComponentInternalInstance; $data: {}; $props: { "onPage-change"?: (value: number) => any; readonly totalPages: number; readonly initialPage: number; readonly currentCity?: string; ... 11 more ...; style?: unknown; }; ... 10 more ...; $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (....'. Did you mean 'goToPage'?ts(2551)
any

Property 'goToPrevPage' does not exist on type '{ $: ComponentInternalInstance; $data: {}; $props: { "onPage-change"?: (value: number) => any; readonly totalPages: number; readonly initialPage: number; readonly currentCity?: string; ... 11 more ...; style?: unknown; }; ... 10 more ...; $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (....'. Did you mean 'goToPage'?ts(2551)
any
Property 'value' does not exist on type 'number'. Did you mean 'valueOf'?ts(2551)
lib.es5.d.ts(585, 5): 'valueOf' is declared here.
any
Property 'goToNextPage' does not exist on type '{ $: ComponentInternalInstance; $data: {}; $props: { "onPage-change"?: (value: number) => any; readonly totalPages: number; readonly initialPage: number; readonly currentCity?: string; ... 11 more ...; style?: unknown; }; ... 10 more ...; $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (....'. Did you mean 'goToPage'?ts(2551)
