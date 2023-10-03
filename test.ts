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
  /* ваш стиль */
</style>
