<script setup lang="ts">
import { watch } from 'vue';
import IconComponent from '../../../global/icon/icon.component.vue';

const props = defineProps({
  config: Object,
  isToday: Boolean,
  isYesterday: Boolean,
  isTomorrow: Boolean,
});

// Отслеживаем изменения в isToday, isYesterday и isTomorrow
watch([() => props.isToday, () => props.isYesterday, () => props.isTomorrow], () => {
  props.config.input.value = ''; // Очистка поля поиска при изменении любого из этих значений
});

const emits = defineEmits(['input', 'onSearch']);
</script>
