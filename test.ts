<template>
  <!-- ... (не менялся) ... -->
</template>

<script setup lang="ts">
  // ... (не менялся) ...
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 80px;
}

.field input,
.field textarea {
  box-sizing: border-box;
  background: inherit;
  border: 1px solid var(--light);
  border-radius: 16px;
  width: 100%;
  padding: 12px;
  resize: none;
}

.field input::-webkit-outer-spin-button,
.field input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.field input.disabled {
  border: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 143%;
  letter-spacing: 0.1px;
  padding: 0;
}

.field.invalid input {
  border-color: var(--red) !important;
}

.field.invalid input::placeholder {
  color: var(--red) !important;
}

.field.invalid label {
  color: var(--red) !important;
}
</style>

  
