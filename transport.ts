<template>
  <!-- ... -->
  <input
    type="text"
    :value="searchInput"
    @input="updateSearch($event)"
    <!-- ... -->
  />
  <!-- ... -->
</template>

<script setup lang="ts">
// ...

const updateSearch = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement) {
    emits('updateSearchValue', inputElement.value);
  }
};
</script>
