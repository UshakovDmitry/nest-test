<template>
  <div
    :style="'height:' + config?.input?.height"
    class="field"
    :class="{ invalid: config.helper.isActive && config.input.isError }"
  >
    <label for="email-field" class="body-small grey-text">
      <span v-if="config.input.required">{{config.label}} *</span></label
    >
    <input
      v-if="!config.input.isTextarea"
      :style="
        'height:' +
        (config?.input?.height
          ? 'calc(' + config?.input?.height + '-40px'
          : '40px')
      "
      :class="{ disabled: config.input.isDisabled }"
      :type="config.input.type || 'text'"
      :value="config.input.value"
      :autocomplete="
        config.input.type === 'password' ? 'new-password' : 'one-time-code'
      "
      name="email-field"
      class="body-medium"
      :placeholder="config.input.placeholder"
      :readonly="config.input.isDisabled"
      :maxLength="config.input.maxLength"
      @input="
        emits(
          'input',
          ($event.target as HTMLInputElement | HTMLTextAreaElement).value,
        );
        config.setValue(
          ($event.target as HTMLInputElement | HTMLTextAreaElement).value,
        );
      "
      @focusout="config.input.required && config.isEmpty()"
      @focus="emits('onFocus')"
      @blur="emits('onBlur')"
    />
    <textarea
      v-if="config.input.isTextarea"
      :value="config.input.value"
      :style="'height:' + (config?.input?.height || '40px')"
      class="body-medium"
      :placeholder="config.input.placeholder"
      @input="
        emits(
          'input',
          ($event.target as HTMLInputElement | HTMLTextAreaElement).value,
        );
        config.setValue(
          ($event.target as HTMLInputElement | HTMLTextAreaElement).value,
        );
      "
      @focusout="config.input.required && config.isEmpty()"
      @focus="emits('onFocus')"
      @blur="emits('onBlur')"
    ></textarea>

    <div
      v-if="config.helper.isActive && config.input.isError"
      class="label-small red-text"
    >
      {{ config.helper.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { IField } from './field.model';

defineProps<{
  config: IField;
}>();
const emits = defineEmits(['input', 'onFocus', 'onBlur']);
</script>

<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 80px;
}

input,
textarea {
  box-sizing: border-box;
  background: inherit;
  border: 1px solid var(--light);
  border-radius: 16px;
  width: 100%;
  padding: 12px;
  resize: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0;
  /* <-- Apparently some margin are still there even though it's hidden */
}

input.disabled {
  border: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 143%;
  letter-spacing: 0.1px;
  padding: 0;
}

.invalid {
  input {
    border-color: var(--red) !important;

    &::placeholder {
      color: var(--red) !important;
    }
  }

  label {
    color: var(--red) !important;
  }
}
</style>
