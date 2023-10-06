<template>
  <button
    :class="`${config.type} ${config.border} ${
      config.mobileWidth ? 'mobileWidth' : ''
    }`"
    :style="`${
      (config.type === 'filled' ? 'background:var(--' : 'color:var(--') +
      config.color +
      ')'
    };
        width:${config.width ? config.width : 'fit-content'}
      `"
    class="label-large"
    :disabled="config.disabled || config.loading"
    @click="emits('onClick')"
  >
    <span v-if="!config.loading">
      <icon-component
        v-if="config.prefix"
        :сonfig="{
          name: config.prefix,
          color: config.iconColor || '#fff',
          scale: 1.1,
        }"
      ></icon-component>
      <icon-component
        v-if="config.suffix"
        :сonfig="{
          name: config.suffix,
          color: config.iconColor || '#fff',
          scale: 1.1,
        }"
      ></icon-component>
    </span>
    <span class="hover"></span>
    <spinner
        v-if="config.loading"
        :size="20"
        :stroke="config.type === 'filled' ? '#fff' : config.color"
      ></spinner>
      {{ config.value }}
  </button>
</template>

<script setup lang="ts">
// import IButton from '../../../domain/interfaces/button.interface';
import { IButton } from '../../../domain/interfaces/button.interface';
import IconComponent from '../icon/icon.component.vue';
import Spinner from "../spinner/spinner.vue";

 defineProps<{
  config: IButton;
}>();
// console.log(props.config);

const emits = defineEmits(['onClick']);
</script>

<style scoped lang="scss">
@import './button.scss';
</style>

'./button.scss

button {
    display: flex;
    align-items: center;
    width: fit-content;
    padding: 0 24px;
    height: 40px;
    position: relative;
    justify-content: center;
  
    span {
      display: flex;
      gap: 8px;
      align-items: center;
      white-space: nowrap;
    }
  }
  
  button.mobileWidth {
    @media (max-width: 768px) {
      width: 100% !important;
    }
  }
  
  // Filled button configurations
  .filled {
    border: none;
    color: #fff;
  
    &:hover > .hover {
      visibility: visible;
    }
  
    &:disabled {
      color: rgba(35, 54, 45, 0.3);
      background: rgba(35, 54, 45, 0.3) !important;
      cursor: not-allowed;
    }
  
    &:disabled:hover > .hover {
      visibility: hidden;
    }
  }
  
  // Outlined button configurations
  .outlined {
    background: #fff;
    border: 1px solid;
  
    &:hover {
      background: rgba(35, 54, 45, 0.08);
    }
  
    &:disabled {
      cursor: inherit;
      color: rgba(35, 54, 45, 0.3) !important;
    }
  
    &:disabled:hover {
      background: #fff;
      color: rgba(35, 54, 45, 0.3) !important;
    }
  }
  
  // Text button configurations
  .text {
    border: none;
    background: inherit;
    transition: .2s ease-out;
  
    &:hover {
      transition: .2s ease-in;
      background: rgba(35, 54, 45, 0.08);
    }
  
    &:disabled {
      color: rgba(35, 54, 45, 0.3) !important;
      cursor: inherit;
    }
  }
  
  .text-without-padding{
    @extend .text;
    @media (max-width: 768px) {
      padding: 0!important;
    }
  }
  
  .hover {
    visibility: hidden;
    position: absolute;
    background: rgba(255, 255, 255, 0.08);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  .large {
    border-radius: 16px;
  }
  
  .small {
    border-radius: 8px;
  }
  

ПЕРЕПЕШИ СТИЛИ НА CSS


