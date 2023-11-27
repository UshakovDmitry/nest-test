<template>
  <div class="chronologies__wrapper">
    <h3 class="chronologies__title">Хронология ППО</h3>

    <div class="chronologies">
      <div class="chronologies__item" v-for="(statusPPO, index) in chronologies" :key="index">
        <p class="numberPPO">{{ statusPPO.PPO }}</p>

        <div class="chronologies-wrapper">
          <div class="item__border" v-if="statusPPO.Chronology.length">
            <p>{{ findDeliveryOperation(statusPPO.Chronology).TypeOperation }}</p>

            <ul class="default__chronologies">
              <li class="default__chronologies-status" 
                  :class="{ 'status--active': isStatusActive(status, statusPPO.Chronology) }" 
                  v-for="status in defaultStatusesPPO" 
                  :key="status">
                {{ status }}
                <div class="status-bar" 
                     :class="{ 'bar--active': isStatusActive(status, statusPPO.Chronology) }">
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';

interface ChronologyItem {
  PPO: string;
  Chronology: {
    TypeOperation: string;
    statuses: string[];
  }[];
}

const props = defineProps({
  chronologies: {
    type: Array as PropType<ChronologyItem[]>,
    required: true,
  },
  defaultStatusesPPO: {
    type: Array as PropType<string[]>,
    required: true,
  },
});

const findDeliveryOperation = (chronology) => {
  return chronology.find((item) => item.TypeOperation === "Доставка") || {};
};

const isStatusActive = (status, chronology) => {
  const delivery = findDeliveryOperation(chronology);
  const hasPickup = chronology.some(item => item.TypeOperation === "Самовывоз");
  
  if (status === "доставляется" && hasPickup) {
    return true;
  }
  return delivery.statuses && delivery.statuses.includes(status);
};
</script>

<style scoped>
  /* Ваши стили */
</style>
