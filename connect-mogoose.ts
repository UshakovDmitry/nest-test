<template>
  <div class="alser-ui-library-field">
    <label v-if="label" class="label">
      <p
        class="lable__text"
        :class="{
          lable__text_required: disabled,
        }"
      >
        {{ label }}
      </p>
      <p v-if="required" class="label__mark">*</p>
    </label>

    <div
      class="input-wrapper"
      :class="{
        'input-wrapper_error': errorText,
        'input-wrapper_disabled': disabled,
      }"
    >
      <div class="base-input">
        <BaseInput
          :type="type"
          :placeholder="placeholder"
          :required="required"
          :minLength="minLength"
          :maxLength="maxLength"
          :disabled="disabled"
          :readonly="readonly"
          :icon="icon"
          @onChange="emits('onChange', $event)"
        ></BaseInput>
      </div>
      <div class="button-wrapper">
        <button class="field-btn">Button</button>
      </div>
    </div>

    <span :class="errorText ? 'error-text' : 'hidden-span'">{{
      errorText
    }}</span>
    <span :class="hintText ? 'hint-text' : 'hidden-span'">{{ hintText }}</span>
  </div>
</template>

<script setup lang="ts">
  import BaseInput from '@/components/BaseInput.vue'

  defineSlots<{
    iconPrefix?: (props) => any
    iconSufix?: (props) => any
  }>()

  defineProps({
    placeholder: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    minLength: {
      type: Number,
      required: false,
    },
    maxLength: {
      type: Number,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    readonly: {
      type: Boolean,
      required: false,
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    errorText: {
      type: String,
      required: false,
      default: '',
    },
    hintText: {
      type: String,
      required: false,
      default: '',
    },
  })

  const emits = defineEmits(['onChange'])
</script>

<style scoped>
  .input-wrapper {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    padding-left: 16px;
    /* padding: var(--spacing-md, 8px) var(--spacing-lg, 12px); */
    border-radius: 16px;
    /* gap: 0.5rem; */
    border: 1px solid var(--Tertiary-LightMode-Border, rgba(35, 54, 45, 0.12));
    background: #fff;
    overflow: hidden;
  }

  .base-input {
    flex: 1;
    border: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    height: 100%;
    padding: 8px 12px 8px 0;
  }

  .button-wrapper {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    min-width: 119px;
    width: 15%;
    border: none;
    background: var(--bg-secondary, #f8f9fa);
    border-left: 1px solid var(--border-tertiary, #e6e9e6);
    color: #fff;
    cursor: pointer;
    margin: 0;
    padding: 0;
  }

  .field-btn {
    width: 100%;
    border: none;
    background: var(--bg-secondary, #f8f9fa);
    border-left: 1px solid var(--border-tertiary, #e6e9e6);
    color: #fff;
    cursor: pointer;
    margin: 0;
    padding: 0;
    color: black;
    outline: none;
  }

  .field-btn:focus  {
    border: 1px solid  #46e646;
    background: var(--colors-palette-basic-white, #fff) !important;
    box-shadow: var(--focus-rings-ring-error) !important;
  }
