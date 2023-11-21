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
          :class="{ done: chronologies.includes(status) }"
        ></div>
        <div class="item__status">
          <div class="status__icon">
            <IconComponent
              :сonfig="{
                name:   chronologies.includes(status) ?'doneWithBorder' : 'circle',
                color: chronologies.includes(status) ? '#259451' : '#90a4ae',
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

Есть вот такой компонент
он принимает дефолтный массив вот такого вида
    this.defaultStatusesPPO = [
      'Оформлен',
      'Доставляется до клиента (на складе отгрузки)',
      'Доставляется',
      'Сделка завершена',
    ];

и сравнивает его с тем что приходит в chronologies

Я хочу немного изменить логику 
Если в приходящем массиве есть "Оформлен" и в дефолтном тоже "Оформлен"
тогда срабатывает includes и он делает его активным
я хочу изменить логику именно для этого статуса 
Если в chronologies есть "Оформлен" ИЛИ "Ожидает клиента" то делать активным
