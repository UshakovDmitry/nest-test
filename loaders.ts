PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\frontend> npm run dev

> alser.dispatcherworkplaceui@0.0.0 dev
> vite


  VITE v4.4.9  ready in 348 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
Failed to resolve import "moment" from "src\components\calendar\Calendar\Calendar.vue". Does the file exist?
Failed to resolve import "moment" from "src\components\calendar\Calendar\components\CalendarHeader.vue". Does the file exist?
Failed to resolve import "moment" from "src\components\calendar\Calendar\helpers\index.js". Does the file exist?
16:38:45 [vite] Internal server error: Failed to resolve import "moment" from "src\components\calendar\Calendar\Calendar.vue". Does the file exist?
  Plugin: vite:import-analysis
  File: C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/src/components/calendar/Calendar/Calendar.vue:34:19
  3  |  import CalendarHeader from "./components/CalendarHeader.vue";
  4  |  import HeaderInfo from "./components/HeaderInfo.vue";
  5  |  import moment from "moment";
     |                      ^
  6  |  import { ref } from "vue";
  7  |  const totalDays = 42;
      at formatError (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:43993:46)
      at TransformContext.error (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:43989:19)
      at normalizeUrl (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:41801:33)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
      at async file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:41945:47
      at async Promise.all (index 4)
      at async TransformContext.transform (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:41870:13)
      at async Object.transform (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:44283:30)
      at async loadAndTransform (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:54950:29)
      at async viteTransformMiddleware (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:64345:32)  
Failed to resolve import "moment" from "src\components\calendar\Calendar\components\CalendarHeader.vue". Does the file exist?
16:38:46 [vite] Internal server error: Failed to resolve import "moment" from "src\components\calendar\Calendar\Calendar.vue". Does the file exist?
  Plugin: vite:import-analysis
  File: C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/src/components/calendar/Calendar/Calendar.vue:34:19
  3  |  import CalendarHeader from "./components/CalendarHeader.vue";
  4  |  import HeaderInfo from "./components/HeaderInfo.vue";
  5  |  import moment from "moment";
     |                      ^
  6  |  import { ref } from "vue";
  7  |  const totalDays = 42;
      at formatError (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:43993:46)
      at TransformContext.error (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:43989:19)
      at normalizeUrl (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:41801:33)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
      at async file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:41945:47
      at async Promise.all (index 4)
      at async TransformContext.transform (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:41870:13)
      at async Object.transform (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:44283:30)
      at async loadAndTransform (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:54950:29)
      at async viteTransformMiddleware (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:64345:32)  
Failed to resolve import "moment" from "src\components\calendar\Calendar\components\CalendarHeader.vue". Does the file exist?

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


