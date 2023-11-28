<script setup lang="ts">
import { ref, watch } from 'vue';
// ... остальные импорты ...

const props = defineProps({
  // ... ваши пропсы ...
  isToday: Boolean,
  isYesterday: Boolean,
  isTomorrow: Boolean,
});

const dateSelection = ref();

// Отслеживание изменений в isYesterday, isToday, isTomorrow
watch(
  [() => props.isYesterday, () => props.isToday, () => props.isTomorrow],
  ([newIsYesterday, newIsToday, newIsTomorrow], [oldIsYesterday, oldIsToday, oldIsTomorrow]) => {
    if (newIsYesterday !== oldIsYesterday || newIsToday !== oldIsToday || newIsTomorrow !== oldIsTomorrow) {
      dateSelection.value = null;
    }
  }
);

const handleDate = (timeRange) => {
  dateSelection.value = timeRange;
  const formattedDates = timeRange.map(
    (date) => date.toISOString().split('T')[0],
  );
  emits('setTimeRange', formattedDates);
};

// ... остальной код ...
</script>

я хочу сбрасывать dateSelection когда меняются значения isYesterday,isToday , isTomorrow
сделай это через watch
