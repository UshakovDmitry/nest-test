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
      :class="{ active: (currentPage as any) === page }"
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
import { ref, watch ,computed } from 'vue';
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
  filterContractors: {
    type: Object,
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


Я хочу также добавить внутрь watch отслеживание изменения filterContractors
