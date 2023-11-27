<template>
  <div class="chronologies__wrapper">
    <h3 class="chronologies__title">Хронология ППО</h3>

    <div class="chronologies">
      <div class="chronologies__item" v-for="(statusPPO, index) in chronologies" :key="index">
        <p class="numberPPO">{{ statusPPO.PPO }}</p>

        <div class="chronologies-wrapper" v-if="statusPPO.Chronology.length">
          <div class="item__border">
            <p>{{ statusPPO.Chronology[statusPPO.Chronology.length - 1].TypeOperation }}</p>

            <ul class="default__chronologies">
              <li class="default__chronologies-status" 
                  :class="{ 'status--active': isStatusInChronology(status, statusPPO.Chronology[statusPPO.Chronology.length - 1].statuses) }" 
                  v-for="status in defaultStatusesPPO" 
                  :key="status">
                {{ status }}
                <div class="status-bar" 
                     :class="{ 'bar--active': isStatusInChronology(status, statusPPO.Chronology[statusPPO.Chronology.length - 1].statuses) }">
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
  currentStatusTR: {
    type: String,
    required: true,
  },
});

const isStatusInChronology = (status, statuses) => {
  return statuses.includes(status);
};
</script>

<style scoped>
  /* Ваши стили */
</style>
