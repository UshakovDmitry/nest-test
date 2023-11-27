interface ChronologyItem {
  PPO: string;
  // Добавьте другие свойства, если они есть в объектах массива chronologies
}

const props = defineProps({
  chronologies: {
    type: Array as PropType<ChronologyItem[]>,
    required: true,
  },
  // ... остальные свойства
});

