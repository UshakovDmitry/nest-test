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

    <div class="input-wrapper">
      <div :class="{ 'input-error': errorText}" class="a">
        <base-input
          :placeholder="placeholder"
          :required="required"
          :minLength="minLength"
          :maxLength="maxLength"
          :disabled="disabled"
          :readonly="readonly"
          :label="label"
          :icon="icon"
          :type="type"
          :errorText="errorText"
          :hintText="hintText"
          @onChange="$emit('onChange', $event)"
        />
      </div>
      <div class="b">
        <button 
        :disabled="!!(disabled || errorText)"
        :class="{'button-disabled': errorText}"
        @click="emits('onSubmit', $event)" class="btn">Button</button>
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

  const emits = defineEmits(['onChange', 'onSubmit'])
</script>

<style scoped>
  .alser-ui-library-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .label {
    display: flex;
    flex-direction: row;
    gap: 2px;
  }

  .lable__text_required {
    color: var(--colors-text-disabled, #c3c8c2);
  }
  .label__mark {
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    color: var(--secondary-brand);
    font-size: 1.2rem;
  }
  .lable__text {
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.25px;
  }
  .input-wrapper {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    border-radius: 16px;
    background: #fff;
    /* overflow: hidden; */
    box-sizing: content-box;
  }

  .a {
    flex: 1;
    border-radius: 16px 0 0 16px;
    border: 1px solid rgba(35, 54, 45, 0.12);
    padding: 8px 12px 8px 16px;
  }
  .b {
    flex: 1;
    width: 15%;
    max-width: 119px;
    border-radius: 0 16px 16px 0;
    border: 1px solid rgba(35, 54, 45, 0.12);
    overflow: hidden;
  }
  .a:focus-within {
    border: 1px solid var(--border-brand, #97cf9c);
    box-shadow: 0px 0px 0px 4px rgba(70, 167, 88, 0.24);
    z-index: 1;
  }

  .input-error {
    border: 1px solid var(--border-error, #F3B0A2);
  }

  .b:focus-within {
    box-shadow: 0px 0px 0px 4px rgba(70, 167, 88, 0.24);
    border: 1px solid var(--border-brand, #97cf9c);
  }
  .btn {
    width: 100%;
    height: 100%;
    border: none;
    background: var(--bg-secondary, #f8f9fa);
    cursor: pointer;
    margin: 0;
    padding: 0;
    color: black;
    outline: none;
  }

  .hint-text {
    color: var(--colors-text-warning-primary, #ffa01c);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 142%; /* 20px */
    letter-spacing: 0.35px;
  }

  .hidden-span {
    display: none;
  }
  .error-text {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 142%;
    letter-spacing: 0.35px;
    color: var(--text-error-primary, #e54d2e);
  }


  .button-disabled {
    background: var(--bg-secondary, #f8f9fa);
    color: var(--text-disabled, #c3c8c2);
    cursor: not-allowed;
  }
</style>


я хочу чтобы стиль фокус   .a:focus-within {
    border: 1px solid var(--border-brand, #97cf9c);
    box-shadow: 0px 0px 0px 4px rgba(70, 167, 88, 0.24);
    z-index: 1;
  } не применялся когда errorText и когда пропс дизеблд
