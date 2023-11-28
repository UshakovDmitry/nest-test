<script setup lang="ts">
import { ref, watch } from 'vue';
// ... (остальные импорты)

const props = defineProps<{
  // ... (ваши пропсы)
}>();

const dateSelection = ref();

// ... (остальная логика)

// Отслеживание изменений в isToday, isYesterday, и isTomorrow
watch(
  [() => props.isToday, () => props.isYesterday, () => props.isTomorrow],
  ([newIsToday, newIsYesterday, newIsTomorrow]) => {
    // Проверка, стало ли одно из свойств true
    if (newIsToday || newIsYesterday || newIsTomorrow) {
      dateSelection.value = null; // Сбрасываем выбор дат
      emits('clearDateSelection'); // Вызываем событие для сброса даты в viewModel, если необходимо
    }
  }
);
</script>
