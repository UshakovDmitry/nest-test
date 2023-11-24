const props = defineProps({
  config: {
    type: Object,
    required: false,
    default: () => ({})
  },
  isToday: {
    type: Boolean,
    required: false,
    default: false
  },
  isYesterday: {
    type: Boolean,
    required: false,
    default: false
  },
  isTomorrow: {
    type: Boolean,
    required: false,
    default: false
  },
  currentCity: {
    type: String,
    required: false,
    default: ''
  }
});
