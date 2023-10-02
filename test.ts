<template>
  <div class="chronologies">
    <div
      class="chronologies__item"
      v-for="(status, index) in defaultStatusesPPO"
      :key="index"
      :style="{ done: chronologies.includes(status) }"
    >
      {{ status }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  chronologies: {
    type: Array,
    required: true,
  },
  defaultStatusesPPO: {
    type: Array,
    required: true,
  },
});

</script>

<style scoped>
.chronologies {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  height: 10px;
  margin-top: 20px;
}
.chronologies__item {
  height: 10px;
  border-radius: 10px;
}
.done {
  background-color: #259451;
}
</style>



Type '{ done: boolean; }' is not assignable to type 'StyleValue'.
  Object literal may only specify known properties, and 'done' does not exist in type 'CSSProperties | StyleValue[]'.ts(2322)
runtime-dom.d.ts(321, 5): The expected type comes from property 'style' which is declared here on type 'HTMLAttributes & ReservedProps & Record<string, unknown>'
(property) done: boolean
