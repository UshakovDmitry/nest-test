<template>
  <div class="filters">
    <div class="filter-online">
      <IconComponent
        :сonfig="{
          name: 'filter',
          color: '#23362D4D',
          width: 24,
          height: 24,
        }"
      ></IconComponent>
      <span class="filter-online__text">Сперва онлайн</span>
    </div>
    <div class="search">
      <search-field-component
        :placeholder="'Введите имя или машину'"
      ></search-field-component>
    </div>
    <div class="set-city">
      <dropdown-component
        :items="cities"
        :width="350"
        :currentValue="'Выберите город'"
        @onSelect="emits('selectCity', $event)"
      ></dropdown-component>
    </div>
    <div class="geofence-switch">
      <toggle-component></toggle-component>
      <p>Показывать геозоны</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import DropdownComponent from '../../../components/global/dropdown/dropdown.vue';
import SearchFieldComponent from '../../../components/global/fields/search-field/search-field.vue';
import IconComponent from '../../../components/global/icon/icon.component.vue';
import ToggleComponent from '../../../components/global/toggle/toggle.vue';

defineProps<{
  cities: string[];
}>();

const emits = defineEmits(['selectCity', 'downloadLoadersAsXLSX']);
</script>
<style scoped>
.filters {
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  /* border: 1px solid rgb(230, 100, 40); */
  padding: 0 20px;
}


.date_picker {
  --dp-border-radius: 16px;
  /* --dp-cell-border-radius: 4px;  */
  width: 200px;
}

.date_picker .dp__outer_menu_wrap .dp--menu-wrapper {
  --dp-border-radius: 4px;
  --dp-cell-border-radius: 4px;
}

.search {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
min-width: 600px;
}


.set-date {
  display: flex;
  height: 42px;
  padding: 6px 16px;
  align-items: center;
  gap: 8px;
  border-radius: 80px;
  box-sizing: border-box;
  border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
  background: #fff;
}

.filter-online {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  border-radius: 58px;
  border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
  background: #fff;
  padding: 8px 16px 8px 8px;
  
}
.filter-online__text {
  color: var(--text-dark, #23362d);
  font-family: Rubik;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.25px;
}
.geofence-switch {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}
</style>
