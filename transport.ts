class TransportRequestsViewModel {
  // ... остальные свойства и методы ...

  setDateSelection(timeRange) {
    const formattedDates = timeRange.map(date => date.toISOString().split('T')[0]);
    this.getTimeRange(formattedDates);
    // Вы можете добавить здесь любую другую логику, связанную с выбором даты
  }

  // ... другие методы ...
}



<VueDatePicker
  v-model="dateSelection"
  locale="ru"
  range
  :format="'dd.MM'"
  :placeholder="'Выберите диапазон дат'"
  class="date_picker"
  @update:model-value="emits('setDateSelection', $event)"
></VueDatePicker>
