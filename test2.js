<template>
  <div class="cell__wrapper">
    <div class="address" v-for="type in config.value">
      <IconComponent
        :сonfig="{
          name: type,
          color: '#000000',
          width: 24,
          height: 24,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconComponent from '../../icon/icon.component.vue';

defineProps<{
  config: {
    type: number;
    value: any[];
  };
}>();
</script>

<style scoped>
.cell__wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  width: 100%;
  max-width: 150px;
  height: 100%;
  padding: 0 0 0 30px;
  font-size: 14px;
  line-height: 1.2;
  color: #23362d;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

</style>

