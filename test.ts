<template>
  <!-- ... (не менялся) ... -->
</template>

<script setup lang="ts">
  // ... (не менялся) ...
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 24px;
  height: 40px;
  position: relative;
  justify-content: center;
}

button span {
  display: flex;
  gap: 8px;
  align-items: center;
  white-space: nowrap;
}

button.mobileWidth {
  width: fit-content;
}

@media (max-width: 768px) {
  button.mobileWidth {
    width: 100% !important;
  }
}

.filled {
  border: none;
  color: #fff;
}

.filled:hover .hover {
  visibility: visible;
}

.filled:disabled {
  color: rgba(35, 54, 45, 0.3);
  background: rgba(35, 54, 45, 0.3) !important;
  cursor: not-allowed;
}

.filled:disabled:hover .hover {
  visibility: hidden;
}

.outlined {
  background: #fff;
  border: 1px solid;
}

.outlined:hover {
  background: rgba(35, 54, 45, 0.08);
}

.outlined:disabled {
  cursor: inherit;
  color: rgba(35, 54, 45, 0.3) !important;
}

.outlined:disabled:hover {
  background: #fff;
  color: rgba(35, 54, 45, 0.3) !important;
}

.text {
  border: none;
  background: inherit;
  transition: 0.2s ease-out;
}

.text:hover {
  transition: 0.2s ease-in;
  background: rgba(35, 54, 45, 0.08);
}

.text:disabled {
  color: rgba(35, 54, 45, 0.3) !important;
  cursor: inherit;
}

.text-without-padding {
  border: none;
  background: inherit;
  transition: 0.2s ease-out;
}

@media (max-width: 768px) {
  .text-without-padding {
    padding: 0 !important;
  }
}

.hover {
  visibility: hidden;
  position: absolute;
  background: rgba(255, 255, 255, 0.08);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.large {
  border-radius: 16px;
}

.small {
  border-radius: 8px;
}
</style>


