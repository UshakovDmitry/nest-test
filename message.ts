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
  (newValues, prevValues) => {
    const [newIsToday, newIsYesterday, newIsTomorrow] = newValues;
    const [prevIsToday, prevIsYesterday, prevIsTomorrow] = prevValues;

    // Проверка, изменилось ли любое из свойств
    if (newIsToday !== prevIsToday || newIsYesterday !== prevIsYesterday || newIsTomorrow !== prevIsTomorrow) {
      dateSelection.value = null; // Сбрасываем выбор дат
      emits('clearDateSelection'); // Вызываем событие для сброса даты в viewModel, если необходимо
    }
  }
);
</script>
