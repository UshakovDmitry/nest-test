<template>
  <emailField
    :config="emailConfig"
    @input="viewModel.setEmail($event)"
  ></emailField>
</template>

<script setup>
import { EmailField } from './path-to-email-field.model';

const emailConfig = new EmailField({
  label: 'Email',
  input: {
    type: 'email',
    placeholder: 'Введите email',
    value: '',
    isError: false,
    isDisabled: false,
    required: true,
  },
  helper: {
    value: 'Пожалуйста, введите email',
    isActive: false,
  },
});
</script>
