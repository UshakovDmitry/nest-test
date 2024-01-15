<template>
  <div class="person-data">
    <div class="flex-row">
    <alser-default-field
      :placeholder="'Имя'"
      :label="'Имя'"
      :required="true"
      :disabled="false"
      :value="name"
      :hint-text="''"
      @onChange="(value: string) => name = value"
    ></alser-default-field>
    <alser-default-field
      :placeholder="'Фамилия'"
      :label="'Фамилия'"
      :required="true"
      :disabled="false"
      :value="surname"
      :hint-text="''"
      @onChange="(value: string) => surname = value"
      
    ></alser-default-field>
  </div>
    <div class="flex-row">
      <alser-tel-field
        :placeholder="'+7 777 777 77 77'"
        :label="'Телефон'"
        :required="true"
        :disabled="false"
        :value="phone_number"
        :hint-text="''"
        @onChange="(value: string) => phone_number = value"
      ></alser-tel-field>
      <alser-email-field
        :placeholder="'user@email.com'"
        :label="'Email'"
        :required="true"
        :disabled="false"
        :value="email"
        :hint-text="hint_email"
        @onChange="(value: string) => email = value"
      ></alser-email-field>
    </div>
    <alser-default-field
      :placeholder="'Например, Менеджер по закупкам'"
      :label="'Должность'"
      :required="true"
      :disabled="false"
      :value="job_title"
      :hint-text="''"
      @onChange="(value: string) => job_title = value"
    ></alser-default-field>

    <div>
      <h3 class="body__title">Пароль</h3>
      <p>
        Придумайте новый пароль длинной 8 символов. Он должен содержать хотя бы
        одну цифру, одну строчную и одну заглавную буквы.
      </p>
    </div>
    <alser-password-field
      :placeholder="'Введите пароль'"
      :required="true"
      :disabled="false"
      :value="''"
      :hint-text="''"
      @onChange="(value: string) => password = value"
    ></alser-password-field>
    <alser-password-field
      :placeholder="'Повторите пароль'"
      :required="true"
      :disabled="false"
      :value="''"
      :hint-text="''"
      @onChange="(value: string) => password_confirmation = value"
    ></alser-password-field>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import { AlserDefaultField } from "alser.vue.library";
//@ts-ignore
import { AlserTelField } from "alser.vue.library";
//@ts-ignore
import { AlserEmailField } from "alser.vue.library";
//@ts-ignore
import { AlserPasswordField } from "alser.vue.library";
import { computed, ref, watch } from "vue";

const name = ref('');
const surname = ref('');
const phone_number = ref('');
const email = ref('');
const job_title = ref('');
const password = ref('');
const password_confirmation = ref('');



const hint_email = computed(() => {
if (email.value.length > 0 && !email.value.includes("@")) {
  return "Неверный формат email";
}
return "";
});

watch([name, surname, phone_number, email, job_title, password, password_confirmation], () => {
 if (name.value.length > 0 && surname.value.length > 0 && phone_number.value.length > 0 && email.value.length > 0 && job_title.value.length > 0 && password.value.length > 0 && password_confirmation.value.length > 0) {
   console.log('all fields are filled');
 }
});

</script>
