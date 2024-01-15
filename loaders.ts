<template>
  <div class="person-data">
    <div class="flex-row">
    <alser-default-field
      :placeholder="'Имя'"
      :label="'Имя'"
      :required="true"
      :disabled="false"
      :value="user_name"
      :hint-text="hint_user_name"
    ></alser-default-field>
    <alser-default-field
      :placeholder="'Фамилия'"
      :label="'Фамилия'"
      :required="true"
      :disabled="false"
      :value="user_surname"
      :hint-text="''"
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
      ></alser-tel-field>
      <alser-email-field
        :placeholder="'user@email.com'"
        :label="'Email'"
        :required="true"
        :disabled="false"
        :value="email"
        :hint-text="''"
      ></alser-email-field>
    </div>
    <alser-default-field
      :placeholder="'Например, Менеджер по закупкам'"
      :label="'Должность'"
      :required="true"
      :disabled="false"
      :value="job_title"
      :hint-text="''"
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
    ></alser-password-field>
    <alser-password-field
      :placeholder="'Повторите пароль'"
      :required="true"
      :disabled="false"
      :value="''"
      :hint-text="''"
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
import { computed, ref } from "vue";

const user_name = ref('')
const user_surname = ref('')
const phone_number = ref('')
const email = ref('') 
const job_title = ref('')

const hint_user_name = computed(() => {
  return user_name.value.length ? '' : 'Введите имя'
})

