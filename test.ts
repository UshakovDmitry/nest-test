<template>
  <div
    class="field"
    :class="{ invalid: config.helper.isActive && config.input.isError }"
  >
    <label for="email-field" class="body-small grey-text">
      {{ config.label }}
    </label>
    <input
      :type="config.input.type"
      name="email-field"
      class="body-medium"
      :class="{ disabled: config.input.isDisabled }"
      :value="config.input.value"
      :placeholder="config.input.placeholder"
      @focusout="
        config.setValue(($event.target as HTMLInputElement).value.trim());
        !config.input.required && config.isEmpty();
      "
      @input="
        config.setValue(($event.target as HTMLInputElement).value.trim());
        emits('input', config.input.value);
      "
    />
    <div
      class="label-small red-text"
      v-if="config.helper.isActive && config.input.isError"
    >
      {{ config.helper.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { IEmailField } from './email-field.model';

 defineProps<{
  config: IEmailField;
}>();

const emits = defineEmits(['input']);
</script>

<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 80px;
}

input {
  box-sizing: border-box;
  background: inherit;
  border: 1px solid var(--light);
  border-radius: 16px;
  width: 100%;
  height: 40px;
  padding: 12px;
  outline: none;
}

input.disabled {
  border: none;
  font-weight: 500;
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
