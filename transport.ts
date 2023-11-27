<template>
  <div class="chronologies__wrapper">
    <h3 class="chronologies__title">Хронология ППО</h3>

    <div class="chronologies">
      <div class="chronologies__item" v-for="(statusPPO, index) in chronologies" :key="index">
        <p class="numberPPO">{{ statusPPO.PPO }}</p>

        <div class="chronologies-wrapper">
          <div class="item__border" v-for="(item, index) in statusPPO.Chronology" :key="index">
            <p>{{ item.TypeOperation }}</p>

            <ul class="default__chronologies">
              <li class="default__chronologies-status" :class="{ 'status--active': isStatusInChronology(status, item.statuses) }" v-for="status in defaultStatusesPPO" :key="status">
                {{ status }}
                <div class="status-bar"></div>
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
  .default__chronologies-status {
    color: grey; /* Серый цвет по умолчанию */
    position: relative; /* Для позиционирования полоски */
    padding-bottom: 4px; /* Отступ для полоски */
  }

  .default__chronologies-status.status--active {
    color: #259451; /* Зеленый цвет для активных статусов */
  }

  .status-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: grey; /* Серый цвет полоски */
    border-radius: 1px; /* Закругленные углы */
  }
</style>
