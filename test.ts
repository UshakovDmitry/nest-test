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

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 80px;
}

.field input {
  box-sizing: border-box;
  background: inherit;
  border: 1px solid var(--light);
  border-radius: 16px;
  width: 100%;
  padding: 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 143%;
  letter-spacing: 0.1px;
  color: var(--dark);
  outline: none;
  transition: border-color 0.2s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.field textarea {
  box-sizing: border-box;
  background: inherit;
  border: 1px solid var(--light);
  border-radius: 16px;
  width: 100%;
  padding: 12px;
  resize: none;
}

.field input::-webkit-outer-spin-button,
.field input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.field input.disabled {
  border: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 143%;
  letter-spacing: 0.1px;
  padding: 0;
}

.field.invalid input {
  border-color: #e7344c !important;
}

.field.invalid input::placeholder {
  color: #e7344c !important;
}

.field.invalid label {
  color: #e7344c !important;
}
</style>

export interface IField {
    label: string;
    translateLabel?: string | undefined;
    input: {
      type: string;
      placeholder: string;
      translateKey?: string | undefined;
      value: string;
      isError: boolean;
      isDisabled: boolean;
      required: boolean;
      body_key?: string;
      height?: string;
      isTextarea?: boolean;
      maxLength?: number | undefined;
    };
    helper: {
      value: string;
      isActive: boolean;
    };
    isEmpty: () => void;
    setValue: (value: string) => void;
  }
  
  export class FieldModel implements IField {
    label: any;
    input: any;
    helper: any;
  
    constructor(object: {
      label: string;
      translateLabel?: string;
      input: {
        type: string;
        placeholder: string;
        translateKey?: string;
        value: string;
        isError: boolean;
        isDisabled: boolean;
        required: boolean;
        body_key?: string;
        height?: string;
        isTextarea?: boolean;
        maxLength?: number;
      };
      helper: {
        value: string;
        isActive: boolean;
      };
    }) {
      for (const key in object) {
        (this as any)[key] = (object as any)[key];
      }
    }
  
    setValue(value: string) {
      this.clearError();
      if (!value.length) {
        this.helper.isActive = true;
      }
      if (this.input.body_key?.includes("phone_number")) {
        this.input.value = this.phoneNumberValidation(value.trim());
      } else if (this.input.body_key?.includes("card_number")) {
        this.input.value = this.cardNumberValidation(value.trim());
      } else if (this.input.body_key?.includes("card_expire")) {
        this.input.value = this.cardExpiredValidate(value.trim());
      } else if (this.input.body_key?.includes("card_cvv")) {
        this.input.value = this.cardCVVValidation(value.trim());
      } else if (this.input.body_key?.includes("card_name")) {
        this.input.value = this.cardHandlerName(value);
      } else if (this.input.body_key?.includes("summa")) {
        const summa = parseInt(value.trim().replace(/\s/g, ""));
        if (isNaN(Number(summa))) {
          this.input.value = "";
          return;
        }
        this.input.value = new Intl.NumberFormat("ru-KK", {
          useGrouping: true
        }).format(Number(summa));
      } else {
        this.input.value = value.trim();
      }
    }
  
    isEmpty(): any {
      if (!this.input.value.length) {
        this.helper.isActive = true;
        this.input.isError = true;
        this.helper.value = "Поле не должно быть пустым";
      }
    }
  
    clearError() {
      this.input.isError = false;
      this.helper.isActive = false;
      this.helper.value = "";
    }
  
    cardCVVValidation(value: string) {
      value = value.replace(/\D/g, "");
      if (value.length > 3) {
        value = value.substring(0, 3);
      } else if (isNaN(Number(value))) {
        value = "";
      }
      return value;
    }
  
    cardHandlerName(value: any) {
      return value.toUpperCase();
    }
  
    cardExpiredValidate(value: string) {
      const x: any = value.replace(/\D/g, "").match(/(\d{0,2})(\d{0,2})/);
  
      if (!x[1]) {
        value = "";
      } else if (isNaN(x[1])) {
        value = "";
      } else if (x[1] < 2) {
        value = x[1];
      } else if (!x[2] || isNaN(x[2])) {
        value = x[1] + "/";
      } else {
        value = x[1] + "/" + x[2];
      }
      return value.substring(0, 5);
    }
  
    cardNumberValidation(value: string) {
      const x: any = value
        .replace(/\D/g, "")
        .match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
  
      if (!x[1]) {
        value = "";
      } else if (x[1].length < 4) {
        value = x[1];
      } else if (x[1].length === 4 && x[2].length < 4) {
        value = x[1] + " " + x[2];
      } else if (x[1].length + x[2].length === 8 && x[3].length < 4) {
        value = x[1] + " " + x[2] + " " + x[3];
      } else {
        value = x[1] + " " + x[2] + " " + x[3] + " " + x[4];
      }
      return value.substring(0, 19);
    }
  
    phoneNumberValidation(value: string) {
      const x: any = value
        .replace(/\D/g, "")
        .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);
  
      if (!x[1]) {
        value = "";
      } else if (x[1] < 7) {
        value = "";
      } else if (x[1] === 8) {
        value = "+7";
      } else if (x[1] > 8) {
        value = "+7" + x[1];
      } else if (!x[2] && x[1] !== "") {
        value = x[1] === "+" ? x[1] : "+" + x[1] === "8" ? x[1] : "+7";
      } else {
        value = !x[3]
          ? "+" + x[1] + x[2]
          : "+" + x[1] + "(" + x[2] + ") " + x[3] + (x[4] ? "-" + x[4] : "");
      }
      return value.substring(0, 16);
    }
  }
