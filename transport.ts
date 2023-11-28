      <VueDatePicker
        v-model="dateSelection"
        locale="ru"
        range
        :format="'dd.MM'"
        :placeholder="'Выберите диапазон дат'"
        class="date_picker"
        @update:model-value="handleDate"
      ></VueDatePicker>


