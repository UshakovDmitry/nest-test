<template>
  <div class="pagination">
    <!-- ... другие кнопки ... -->

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

    <!-- ... другие кнопки ... -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
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

// ... другие методы ...

watch(
  () => props.currentCity,
  () => {
    goToPage(1);
  },
);
</script>

<!-- ... ваш CSS ... -->
