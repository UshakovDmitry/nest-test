<script setup lang="ts">
// Импорты остаются прежними
import { computed, ref } from "vue";

const user_name = ref('');
const user_surname = ref('');
const phone_number = ref('');
const email = ref(''); 
const job_title = ref('');

const hint_user_name = computed(() => {
  // Показываем подсказку, если пользователь начал ввод, но длина меньше 12 символов
  if (user_name.value.length > 0 && user_name.value.length < 12) {
    return 'Имя должно быть длиннее 12 символов';
  }
  // Возвращаем пустую строку, если условие не выполняется
  return '';
});
</script>
