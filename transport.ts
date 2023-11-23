<script setup lang="ts">
import { watch } from 'vue';
import IconComponent from '../../../global/icon/icon.component.vue';

const props = defineProps({
  config: Object,
  isToday: Boolean,
});

// Используйте props.config для доступа к объекту config
watch(() => props.isToday, (newValue) => {
  if (newValue) {
    props.config.input.value = ''; // Очистка поля поиска
  }
});

const emits = defineEmits(['input', 'onSearch']);
</script>




