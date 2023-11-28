<script setup lang="ts">
import { ref, watch } from 'vue';

defineProps({
  filterContractors: Object,
  currentCity: String,
});

const emits = defineEmits(['filterRequestsByContractor']);

const activeButton = ref('');

watch(() => props.currentCity, (newCity, oldCity) => {
  // Сбрасываем активную кнопку при изменении currentCity
  if (newCity !== oldCity) {
    activeButton.value = '';
    emits('filterRequestsByContractor', ''); // Сбрасываем фильтр
  }
});

const buttonClicked = (contractor: string) => {
  if (activeButton.value === contractor) {
    activeButton.value = '';
    emits('filterRequestsByContractor', '');
  } else {
    activeButton.value = contractor;
    emits('filterRequestsByContractor', contractor);
  }
};
</script>
