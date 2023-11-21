<template>
  <div class="chronologies__wrapper">
    <h3 class="chronologies__title">Хронология</h3>
    <div class="chronologies">
      <div
      class="chronologies__item"
      v-for="(status, index) in defaultStatusesPPO"
      :key="index"
    >
        <div
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
          <p>{{ status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconComponent from '../../../components/global/icon/icon.component.vue';

  
const props = defineProps({
  chronologies: {
    type: Array,
    required: true,
  },
  defaultStatusesPPO: {
    type: Array,
    required: true,
  },
  statusTS: {
    type: String,
    required: true,
  },
});

const isStatusActive = (status) => {
  if (status === 'Оформлен') {
    return props.chronologies.includes('Оформлен') || props.chronologies.includes('Ожидает клиента');
  }
  if (props.statusTS === 'Доставлено') {
    return props.chronologies.includes('Сделка завершена') ;
  }
  return props.chronologies.includes(status);
};
</script>

<style scoped>
.chronologies__wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  /* gap: 10px; */
  width: 100%;
}

.chronologies__title {
  color: var(--text-dark, #23362d);
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
  align-items: center;
  justify-content: flex-start;
  gap: 18px;
  width: 100%;
  height: 10px;
  margin-top: 20px;
}
.chronologies__item {

  height: 10px;
  border-radius: 10px;
  width: 192px;
}
.item__border {
  height: 6px;
  border-radius: 100px;
  background: var(--blue-grey-blue-grey-300, #90a4ae);
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
</style>

Теперь я хочу следующее, если props.statusTS === 'Доставлено' то делать активным "Сделка завершена"


Но у меня ошибка 
transport-requests-detail.component.vue:18 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'status')
    at Proxy._sfc_render (transport-requests-detail.component.vue:18:52)
    at renderComponentRoot (chunk-J6475X5X.js?v=4f549da1:2224:17)
    at ReactiveEffect.componentUpdateFn [as fn] (chunk-J6475X5X.js?v=4f549da1:7099:46)
    at ReactiveEffect.run (chunk-J6475X5X.js?v=4f549da1:423:19)
    at instance.update (chunk-J6475X5X.js?v=4f549da1:7212:52)
    at setupRenderEffect (chunk-J6475X5X.js?v=4f549da1:7220:5)
    at mountComponent (chunk-J6475X5X.js?v=4f549da1:7010:5)
    at processComponent (chunk-J6475X5X.js?v=4f549da1:6963:9)
    at patch (chunk-J6475X5X.js?v=4f549da1:6436:11)
    at ReactiveEffect.componentUpdateFn [as fn] (chunk-J6475X5X.js?v=4f549da1:7106:11)

