<script setup lang="ts">
import { ref, watch } from 'vue';
import IconComponent from '../../../global/icon/icon.component.vue';

const props = defineProps<{
  placeholder: string;
  isClearSearch?: boolean;
}>();

const emits = defineEmits(['onSearch']);
const searchValue = ref('');

const updateSearch = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  searchValue.value = value;
  emits('onSearch', value);
};

// Наблюдаем за изменением свойства isClearSearch
watch(() => props.isClearSearch, (newVal) => {
  if (newVal) {
    searchValue.value = ''; // Очищаем значение поля поиска
  }
});
</script>
