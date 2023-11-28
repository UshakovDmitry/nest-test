[plugin:vite:import-analysis] Failed to resolve import "../../components/default_modals/no-access.component.vue" from "src\pages\auth\auth.component.vue". Does the file exist?
C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/src/pages/auth/auth.component.vue:45:21
5  |  import { AuthViewModel } from "./auth.viewmodel";
6  |  import NotValid from "../../components/default_modals/not-valid.component.vue";
7  |  import NoAccess from "../../components/default_modals/no-access.component.vue";
   |                        ^
8  |  import Field from "../../components/global/fields/fieild/field.vue";
9  |  import { FieldModel } from "../../components/global/fields/fieild/field.model";
    at formatError (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:43993:46)
    at TransformContext.error (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:43989:19)
    at normalizeUrl (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:41801:33)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:41945:47
    at async Promise.all (index 6)
    at async TransformContext.transform (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:41870:13)
    at async Object.transform (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:44283:30)
    at async loadAndTransform (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:54950:29)
    at async viteTransformMiddleware (file:///C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/node_modules/vite/dist/node/chunks/dep-df561101.js:64345:32
Click outside, press Esc key, or fix the code to dismiss.
You can also disable this overlay by setting server.hmr.overlay to false in vite.config.js.

<template>
  <div class="auth">
    <div class="auth__content">
      <img :src="logo" alt="logo" />
      <Field
        :config="model.fields[0]"
        @input="viewModel.setEmail($event)"
        @on-enter="viewModel.handleLogin()"
      ></Field>
      <Field
        :config="model.fields[1]"
        @input="viewModel.setPassword($event)"
        @on-enter="viewModel.handleLogin()"
      ></Field>
      <div>
        <ButtonComponent
          :config="{
            type: 'filled',
            color: 'green',
            value: 'Войти',
            border: 'large',
            width: '350px',
            disabled: model.email.length === 0 || model.password.length === 0,
          }"
          @on-click="viewModel.handleLogin()"
        ></ButtonComponent>
      </div>
      <not-valid 
      v-if="model.isModalError"
      @close="viewModel.closeErrorModal()"
      ></not-valid>
      <no-access 
      v-if="model.isErrorNoAccess"
      @close="viewModel.closeErrorModal()"
      ></no-access>
    </div>
  </div>
</template>
<script setup lang="ts">
import logo from '../../public/icons/logo.svg';
import ButtonComponent from '../../components/global/button/button.vue';
import { AuthModel } from './auth.model';
import { AuthViewModel } from './auth.viewmodel';
import NotValid from '../../components/default_modals/not-valid.component.vue';
import NoAccess from '../../components/default_modals/no-access.component.vue';
import Field from '../../components/global/fields/fieild/field.vue';
import { FieldModel } from '../../components/global/fields/fieild/field.model';
import { ref, Ref } from 'vue';

const model: Ref<AuthModel> = ref(
  new AuthModel({
    fields: [
      new FieldModel({
        label: 'Email',
        input: {
          type: 'email',
          value: '',
          placeholder: 'Введите Email',
          isError: false,
          isDisabled: false,
          isTextarea: false,
          required: true,
          maxLength: 20,
        },
        helper: {
          isActive: true,
          value: 'test',
        },
      }),
      new FieldModel({
        label: 'Пароль',
        input: {
          type: 'password',
          value: '',
          placeholder: 'Введите пароль',
          isDisabled: false,
          isTextarea: false,
          required: true,
          maxLength: 20,
          isError: false,
        },
        helper: {
          isActive: true,
          value: 'test',
        },
      }),
    ],
  }),
);
const viewModel: Ref<AuthViewModel> = ref(new AuthViewModel(model.value));
</script>
<style scoped>
.auth {
  background: linear-gradient(108deg, #01a254 0%, #50d17f 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  /* margin-left: -72px;
  margin-top: -107px; */
  box-sizing: border-box;
}
.auth__content {
  display: flex;
  width: 420px;
  padding: 36px;
  flex-direction: column;
  align-items: center;
  gap: 11px;
  flex-shrink: 0;
  border-radius: 16px;
  box-sizing: border-box;
  background: #fff;
}
</style>
