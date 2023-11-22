// Функция для обновления значения поиска
const updateSearch = (event: Event) => {
  // Явное указание, что event.target будет HTMLInputElement
  const target = event.target as HTMLInputElement;
  const value = target.value;

  // Эмитим событие с новым значением для родительского компонента
  emits('onSearch', value);
};

const emits = defineEmits(['updateSearchValue']);

emits('updateSearchValue', value);
