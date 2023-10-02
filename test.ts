const displayedPages = computed(() => {
  let start = currentPage.value - 1;
  let end = currentPage.value + 1;

  // Если текущая страница первая или вторая
  if (currentPage.value <= 2) {
    start = 1;
    end = 3;
  }

  // Если текущая страница последняя или предпоследняя
  if (currentPage.value >= totalPages.value - 1) {
    start = totalPages.value - 2;
    end = totalPages.value;
  }

  return Array.from({ length: 3 }, (_, i) => start + i);
});




<template>
  <!-- другой код -->
  <div class="pages">
    <button
      v-for="page in displayedPages"
      :key="page"
      :class="{ 'active-page': page === currentPage.value }"
      @click="handlePageChange(page)"
    >
      {{ page }}
    </button>
  </div>
  <!-- другой код -->
</template>










        <template>
  <!-- другой код -->
  <button @click="prevGroup" :disabled="currentPage.value <= 2">Назад</button>
  <!-- кнопки страниц тут -->
  <button @click="nextGroup" :disabled="currentPage.value >= totalPages.value - 1">Вперед</button>
</template>






const prevGroup = () => {
  currentPage.value -= 2;
};

const nextGroup = () => {
  currentPage.value += 2;
};
