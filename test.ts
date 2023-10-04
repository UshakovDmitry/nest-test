      <filters-panel-component
        :cities="model.cities"
        @select-city="viewModel.selectCity($event)"
        @downloadLoadersAsXLSX="viewModel.downloadLoadersAsXLSX"
      ></filters-panel-component>


  <template>
    <div class="filters">
      <div class="set-city">
        <dropdown-component
          :items="cities"
          :width="350"
          :currentValue="'Выберите город'"
          @onSelect="emits('selectCity', $event)"
        ></dropdown-component>
      </div>
  
      <div class="search">
        <search-field-component
          :placeholder="'Введите номер ППО или заявки на транспорт'"
        ></search-field-component>
        <!-- <div class="set-date"> -->
        <VueDatePicker
          v-model="date"
          locale="ru"
          range
          :placeholder="'Выберите дату'"
          class="date_picker"
        ></VueDatePicker>
        <!-- </div> -->
      </div>
  
      <div class="download">
        <button 
        class="download-btn"
         data-test="download-btn"
         @click="emits('downloadLoadersAsXLSX')"
         >
          Скачать файл
          <img :src="xlsxicon" />
        </button>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import { ref } from 'vue';
  
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  
  import DropdownComponent from '../../../../components/global/dropdown/dropdown.vue';
  import SearchFieldComponent from '../../../../components/global/fields/search-field/search-field.vue';
  import xlsxicon from '../../../../public/icons/XLSX.svg';
  
  defineProps<{
    cities: string[];
  }>();
  
  const date = ref();
  
  // onMounted(() => {
  //   const startDate = new Date();
  //   const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  //   date.value = [startDate, endDate];
  // })
  
  const emits = defineEmits(['selectCity', 'downloadLoadersAsXLSX']);
  </script>
  <style scoped>
  .filters {
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    /* border: 1px solid rgb(230, 100, 40); */
  }
  .set-city {
    width: 25%;
  }
  
  .date_picker {
    --dp-border-radius: 16px;
    /* --dp-cell-border-radius: 4px;  */
    width: 200px;
  }
  
  .date_picker .dp__outer_menu_wrap .dp--menu-wrapper {
    --dp-border-radius: 4px;
    --dp-cell-border-radius: 4px;
  }
  
  .search {
    width: 50%;
    border-right: 1px solid rgba(35, 54, 45, 0.12);
    border-left: 1px solid rgba(35, 54, 45, 0.12);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
  .download {
    width: 25%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .download-btn {
    border-radius: 100px;
    border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
    background: #fff;
    width: 155px;
    cursor: pointer;
    box-sizing: border-box;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
  .set-date {
    display: flex;
    width: 222px;
    height: 42px;
    padding: 6px 16px;
    align-items: center;
    gap: 8px;
    border-radius: 80px;
    box-sizing: border-box;
    border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
    background: #fff;
  }
  </style>
  



    <template>
  <!-- Контейнер для поля поиска и иконки -->
  <div class="search-container">
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
  </div>
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

