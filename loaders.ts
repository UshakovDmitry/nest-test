<script setup lang="ts">
// Импорты остаются прежними
import { computed, ref, watch } from "vue";

const name = ref('');
const surname = ref('');
const phone_number = ref('');
const email = ref('');
const job_title = ref('');
const password = ref('');
const password_confirmation = ref('');

// Методы валидации
const isValidEmail = (email) => email.includes("@");
const isValidPassword = (password) => password.length >= 8; // Пример условия

// Вычисляемые свойства для подсказок
const hint_email = computed(() => {
  return email.value.length > 0 && !isValidEmail(email.value) 
         ? "Неверный формат email" : "";
});

// Вычисляемое свойство для проверки валидности всех полей
const isFormValid = computed(() => {
  return name.value.length > 0
      && surname.value.length > 0
      && phone_number.value.length > 0
      && isValidEmail(email.value)
      && job_title.value.length > 0
      && isValidPassword(password.value)
      && password.value === password_confirmation.value;
});

// Следим за изменениями в полях
watch(isFormValid, (newValue) => {
  if (newValue) {
    // Вызываем emit с данными формы
    // Например: emit('formSubmitted', { name: name.value, surname: surname.value, ... });
    console.log('Form is valid, emit the data');
  }
});
</script>

</script>
