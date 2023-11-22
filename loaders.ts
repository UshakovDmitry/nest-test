Вот функция которая вызывается при нажатии на кнопки

  async getCouriersByDate(day: string) {
    const today = new Date();

    if (day === 'tomorrow') {
      today.setDate(today.getDate() + 1); 
      this.model.date.isTomorrow = true;
      this.model.date.isToday = false;
      this.model.date.isYesterday = false;
    } else if (day === 'yesterday') {
      today.setDate(today.getDate() - 1);
      this.model.date.isTomorrow = false;
      this.model.date.isToday = false;
      this.model.date.isYesterday = true;
    } else if (day === 'today') {
      this.model.date.isTomorrow = false;
      this.model.date.isToday = true;
      this.model.date.isYesterday = false;
    }
    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const body = {
      date: formattedDate,
    };
    this.model.currentDate = formattedDate;
    this.model.couriers = [];
    this.model.filteredCouriers = [];
    this.model.cities = [];
    this.model.currentCity = 'Все города';
    try {
      const response = await usePostApi('getCouriersByDate', body);
      const couriers: ICourier[] = response.map(
        (item: any): ICourier => ({
          courierFullName: item.Drivers,
          carNumber: item.carNumber,
          hiringType: item.HiringType,
          schedule: item.TimeWindow,
          hardWindow: item.HardTimeWindow,
          returnToWarehouse: item.ReturnWarehouse,
          city: item.City,
          goToDetail: '',
        }),
      );
      this.model.couriers = couriers;
      this.model.filteredCouriers = this.model.couriers;
      this.model.sortState = 'none';
      this.model.cities = [
        ...new Set(this.model.couriers.map((item) => item.city)),
      ].sort((a, b) => a.localeCompare(b, 'ru'));
    } catch (error) {
      throw error;
    }
  }


вот компонент поиска
<template>
  <!-- Контейнер для поля поиска и иконки -->
 
  <search class="search-container">
    <div class="icon-wrapper">
      <IconComponent
        :сonfig="{
          name: 'search',
          color: '#23362D4D',
          width: 24,
          height: 24,
        }"
      ></IconComponent>
    </div>
    <!-- Поле ввода -->
    <input
      type="text"
      data-test="search-input-PPO"
      :value="searchValue"
      @input="updateSearch"
      :placeholder="props.placeholder"
      class="search-input"
    />
  </search>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconComponent from '../../../global/icon/icon.component.vue';
const props = defineProps<{
  placeholder: string;
}>();
// Определяем эмиттеры для событий
const emits = defineEmits(['onSearch']);

// Состояние для хранения значения поля поиска
const searchValue = ref('');

// Функция для обновления значения поиска
const updateSearch = (event: Event) => {
  // Получаем текущее значение из поля ввода
  const value = (event.target as HTMLInputElement).value;

  // Обновляем локальное состояние
  searchValue.value = value;

  // Эмитим событие с новым значением для родительского компонента
  emits('onSearch', value);
};
</script>

<style scoped>
.search-container {
  /* Расположение иконки и поля ввода в одной строке */
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
  border-radius: 80px;
  width: 100%;
  overflow: hidden;
}

.icon-wrapper {
  /* Позиционирование иконки внутри поля ввода */
  position: absolute;
  left: 8px; /* Расстояние от левого края поля ввода */
  z-index: 1; /* Поверх поля ввода */
}

.search-input {
  border-radius: 58px;
  border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
  background: #fff;
  border-radius: 16px;
  padding: 12px 16px;
  padding-left: 40px; /* Добавляем отступ слева, чтобы текст не перекрывал иконку */
  font-size: 14px;
  border: none;
  outline: transparent;
  color: hsl(152, 21%, 17%);
  width: 100%;
  position: relative;
  z-index: 0; /* Под иконкой */
}
</style>





передача 
      <search-field-component
        :placeholder="placeholder"
        @onSearch="emits('search', $event)"
      ></search-field-component>

функция поиска
  search(value: string): void {
    this.model.filteredCouriers = this.model.couriers.filter((item) => {
      return item.courierFullName.toLowerCase().includes(value.toLowerCase());
    });
  }


