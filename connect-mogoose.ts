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
      <div class="a">
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
        <button class="btn">dfs</button>
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

  const emits = defineEmits(['onChange'])
</script>

<style scoped>
  .input-wrapper {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    border-radius: 16px;
    background: #fff;
    overflow: hidden;
    box-sizing: border-box;
  }

  .a {
    flex: 1;
    border-radius: 16px 0 0 16px;
    border: 1px solid rgba(35, 54, 45, 0.12);
    padding-left: 16px;
  }
  .b {
    flex: 1;
    width: 15%;
    max-width: 119px;
    border-radius: 0 16px 16px 0;
    border: 1px solid rgba(35, 54, 45, 0.12);
    overflow: hidden;
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
</style>
