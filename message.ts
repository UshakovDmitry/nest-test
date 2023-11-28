// Отслеживание изменений в dateSelection
watch(dateSelection, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    if (props.isToday) props.isToday = false;
    if (props.isYesterday) props.isYesterday = false;
    if (props.isTomorrow) props.isTomorrow = false;
  }
});
