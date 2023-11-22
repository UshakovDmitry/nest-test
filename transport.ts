async getCouriersByDate(day: string) {
  // ... ваш текущий код ...

  // Очистка строки поиска
  this.$emit('clearSearch');
}



<script setup lang="ts">
import { ref, onMounted } from 'vue';
import IconComponent from '../../../global/icon/icon.component.vue';

const props = defineProps({
  placeholder: String,
});

const emits = defineEmits(['onSearch']);
const searchValue = ref('');

const updateSearch = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  searchValue.value = value;
  emits('onSearch', value);
};

// Функция для очистки строки поиска
const clearSearch = () => {
  searchValue.value = '';
};

// Устанавливаем слушатель событий
onMounted(() => {
  this.$on('clearSearch', clearSearch);
});
</script>
