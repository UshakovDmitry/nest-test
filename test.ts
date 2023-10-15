<template>
    <div class="wrapper">
      <button 
        v-for="(count, contractor) in filterContractors" 
        :key="contractor" 
        class="btn"
        :class="{ 'active': activeButton === contractor }" 
        @click="buttonClicked(contractor)"
      >
        {{ contractor }} ({{ count }})
      </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

defineProps({
    filterContractors: Object,
});

const emits = defineEmits(['filterRequestsByContractor']);

const activeButton = ref(''); // реактивная переменная для хранения активной кнопки

const buttonClicked = (contractor: string) => {
    activeButton.value = contractor; // обновление активной кнопки
    emits('filterRequestsByContractor', contractor); // отправка события
};
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.btn {
    background-color: #ffffff;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    border-radius: 40px;
    padding: 8px 16px;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
    cursor: pointer;
}

.btn:hover,
.btn.active {
    background-color: green; /* или любой другой цвет для активной кнопки */
    color: #ffffff;
}
</style>

