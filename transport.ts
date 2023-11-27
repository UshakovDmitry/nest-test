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
              <li class="default__chronologies-status" :class="{ 'status--active': isStatusInChronology(status, item.statuses) }" v-for="status in defaultStatusesPPO" :key="status">{{ status }}</li>
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
  .default__chronologies-status.status--active {
    color: #259451; /* Зеленый цвет для активных статусов */
  }
</style>

    
























[
    {
        "PPO": "8942965",
        "Chronology": [
            {
                "TypeOperation": "Доставка",
                "statuses": [
                    "Оформлен",
                    "Доставляется до клиента (на складе отгрузки)",
                    "Доставляется",
                    "Сделка завершена"
                ]
            }
        ]
    },
    {
        "PPO": "8942966",
        "Chronology": [
            {
                "TypeOperation": "Доставка",
                "statuses": [
                    "Оформлен",
                    "Доставляется до клиента (на складе отгрузки)",
                    "Доставляется",
                    "Сделка завершена"
                ]
            }
        ]
    }
]



<template>

  <div class="chronologies__wrapper">
    <h3 class="chronologies__title">Хронология ППО</h3>

    <ul class="default__chronologies">
      <li class="default__chronologies-status" v-for="status in defaultStatusesPPO">{{ status }}</li>
    </ul>








    <div class="chronologies">
      <div
        class="chronologies__item"
        v-for="(statusPPO, index) in chronologies"
        :key="index"
      >
        <p class="numberPPO">{{ statusPPO.PPO as string }}</p>
        <div class="chronologies-wrapper">
          <div
            class="item__border"
            v-for="(item, index) in statusPPO.Chronology"
          >
            <p>{{ item.TypeOperation }}</p>
            <ul>
              <li class="status"  :class="{ done: isStatusActive(status) }" v-for="status in item.statuses">{{ status }}</li>
            </ul>
           
          </div>
        </div>
        <!-- <div
          class="item__border"
          :class="{ done: isStatusActive(status) }"
        ></div>
        <div class="item__status">
          <div class="status__icon">
            <IconComponent
              :сonfig="{
                name:   isStatusActive(status) ?'doneWithBorder' : 'circle',
                color: isStatusActive(status) ? '#259451' : '#90a4ae',
                width: 24,
                height: 24,
              }"
           
            >
            </IconComponent>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import IconComponent from '../../../components/global/icon/icon.component.vue';

interface ChronologyItem {
  PPO: string;
  Chronology: any[];
  // Добавьте другие свойства, если они есть в объектах массива chronologies
}

const props = defineProps({
  chronologies: {
    type: Array as PropType<ChronologyItem[]>,
    required: true,
  },
  defaultStatusesPPO: {
    type: Array,
    required: true,
  },
  currentStatusTR: {
    type: String,
    required: true,
  },
});

const isStatusActive = (status) => {
  if (status === 'Оформлен') {
    return props.chronologies.includes('Оформлен') || props.chronologies.includes('Ожидает клиента');
  }
  if (props.currentStatusTR === 'Доставлено') {
    return props.chronologies.includes('Сделка завершена') ;
  }
  return props.chronologies.includes(status);
};
</script>

<style scoped>


.default__chronologies {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  margin-top: 10px;
  margin-left: 8px;
  list-style: none;
}
















.status {
  color: #259451;
}
.chronologies__wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  /* gap: 10px; */
  width: 100%;
}

.chronologies__title {
  color: #23362d;
  text-align: center;
  font-family: Rubik;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.15px;
}
.chronologies {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 18px;
  width: 100%;
  /* height: 10px; */
  margin-top: 20px;
  border: 1px solid rgb(201, 90, 142);
  padding: 10px;
}
.chronologies__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  /* height: 10px; */
  border-radius: 10px;
  /* width: 192px; */
  border: 1px solid #5aa4c9;
}
.item__border {
  display: flex;
  /* height: 6px; */
  border-radius: 100px;
  /* background: #90a4ae; */
}

.item__status {
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  color: var(--text-dark, #23362d);
  font-family: Rubik;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.4px;
}

.done {
  background-color: #259451;
  border-radius: 100px;
  /* background: #3a7869; */
}

.numberPPO {
  color: var(--text-dark, #23362d);
  font-family: Rubik;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.4px;
  margin-top: 8px;
  margin-left: 8px;
}

.chronologies-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  margin-top: 10px;
  margin-left: 8px;
}
</style>
