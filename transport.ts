
<template>
  <div class="chronologies__wrapper">
    <h3 class="chronologies__title">Хронология</h3>

    <div class="chronologies">
      <div
        class="chronologies__item"
        v-for="(statusPPO, index) in chronologies"
        :key="index"
      >
        <p class="numberPPO">ППО №{{ statusPPO.PPO }}</p>

        <div class="chronologies-wrapper">
          <div class="item__border" v-if="statusPPO.Chronology.length">
            <ul class="default__chronologies">
              <li
                class="default__chronologies-status"
                :class="{
                  'status--active': isStatusActive(
                    status,
                    statusPPO.Chronology,
                  ),
                }"
                v-for="status in defaultStatusesPPO"
                :key="status"
              >
                <div class="icon-status">
                  <p class="status__text">{{ status }}</p>
                  <div>
                    <iconComponent
                      :сonfig="{
                        name: isStatusActive(status, statusPPO.Chronology)
                          ? 'doneWithBorder'
                          : 'circle',
                        color: isStatusActive(status, statusPPO.Chronology)
                          ? '#259451'
                          : 'gray',
                        width: 20,
                        height: 20,
                      }"
                    />
                  </div>
                </div>
                <div
                  class="status-bar"
                  :class="{
                    'bar--active': isStatusActive(status, statusPPO.Chronology),
                  }"
                ></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import iconComponent from '../../../components/global/icon/icon.component.vue';

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
  return chronology.find((item) => item.TypeOperation === 'Доставка') || {};
};

const isStatusActive = (status, chronology) => {
  const delivery = findDeliveryOperation(chronology);
  const hasPickup = chronology.some(
    (item) => item.TypeOperation === 'Самовывоз',
  );

  if (status === 'Доставляется' && hasPickup) {
    return true;
  }
  return delivery.statuses && delivery.statuses.includes(status);
};
</script>

<style scoped>
.default__chronologies-status {
  color: grey; /* Серый цвет по умолчанию */
  position: relative; /* Для позиционирования полоски */
  padding-bottom: 16px; /* Отступ для полоски */
}

.default__chronologies-status.status--active {
  color: #259451;
}

.status__text {
  font-family: Rubik;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.4px;
}

.status-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(108deg, #8f9190 0%, #b5b9b6 30%);
  border-radius: 6px; /* Закругленные углы */
}

.status-bar.bar--active {
  background: linear-gradient(108deg, #04ad5c 0%, #53ce80 10%);
}

.default__chronologies {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 18px;
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
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 18px;
  width: 100%;
  margin-top: 20px;
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
  /* border: 1px solid #5aa4c9; */
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

.icon-status {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-top: 10px;
  margin-left: 8px;
}
</style>

Есть вот такой компонент хронологии который выводит дефолтные статусы и подкрашивает их в щелеый в зависимости от того что прихоит в chronologies

аот пример данных 
"PPO": "8949450",
            "Chronology": [
                {
                    "TypeOperation": "Самовывоз",
                    "statuses": [
                        "Ожидает клиента"
                    ]
                },
                {
                    "TypeOperation": "Доставка",
                    "statuses": [
                        "Доставляется до клиента (на складе отгрузки)"
                    ]
                }
            ]
        }

добавь логику 
если в любом элементе массива Chronology в statuses есть элемент  "Ожидает клиента" то делать активный дефолтный статус "Оформлен" 

вот дефолтные 
this.defaultStatusesPPO = [
      'Оформлен',
      'Доставляется до клиента (на складе отгрузки)',
      'Доставляется',
      'Сделка завершена',
    ];
