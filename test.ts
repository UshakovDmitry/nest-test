main.ts:13 [Vue warn]: Unhandled error during execution of render function 
  at <EmailField config= EmailField {label: 'Email', input: {…}, helper: {…}} onInput=fn > 
  at <Auth.component onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< undefined > > 
  at <RouterView> 
  at <App>
warn2 @ runtime-core.esm-bundler.js:41
logError @ runtime-core.esm-bundler.js:216
handleError @ runtime-core.esm-bundler.js:208
renderComponentRoot @ runtime-core.esm-bundler.js:853
componentUpdateFn @ runtime-core.esm-bundler.js:5701
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
setupRenderEffect @ runtime-core.esm-bundler.js:5822
mountComponent @ runtime-core.esm-bundler.js:5612
processComponent @ runtime-core.esm-bundler.js:5565
patch @ runtime-core.esm-bundler.js:5040
mountChildren @ runtime-core.esm-bundler.js:5284
mountElement @ runtime-core.esm-bundler.js:5191
processElement @ runtime-core.esm-bundler.js:5156
patch @ runtime-core.esm-bundler.js:5028
mountChildren @ runtime-core.esm-bundler.js:5284
mountElement @ runtime-core.esm-bundler.js:5191
processElement @ runtime-core.esm-bundler.js:5156
patch @ runtime-core.esm-bundler.js:5028
componentUpdateFn @ runtime-core.esm-bundler.js:5708
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
setupRenderEffect @ runtime-core.esm-bundler.js:5822
mountComponent @ runtime-core.esm-bundler.js:5612
processComponent @ runtime-core.esm-bundler.js:5565
patch @ runtime-core.esm-bundler.js:5040
componentUpdateFn @ runtime-core.esm-bundler.js:5773
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
callWithErrorHandling @ runtime-core.esm-bundler.js:158
flushJobs @ runtime-core.esm-bundler.js:357
Promise.then (async)
queueFlush @ runtime-core.esm-bundler.js:270
queuePostFlushCb @ runtime-core.esm-bundler.js:290
queueEffectWithSuspense @ runtime-core.esm-bundler.js:1603
scheduler @ runtime-core.esm-bundler.js:1773
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:363
triggerRefValue @ reactivity.esm-bundler.js:974
(anonymous) @ reactivity.esm-bundler.js:1135
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:358
triggerRefValue @ reactivity.esm-bundler.js:974
(anonymous) @ reactivity.esm-bundler.js:1135
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:358
triggerRefValue @ reactivity.esm-bundler.js:974
set value @ reactivity.esm-bundler.js:1018
finalizeNavigation @ vue-router.mjs:3355
(anonymous) @ vue-router.mjs:3220
Promise.then (async)
pushWithRedirect @ vue-router.mjs:3187
push @ vue-router.mjs:3112
install @ vue-router.mjs:3551
use @ runtime-core.esm-bundler.js:3752
(anonymous) @ main.ts:13
main.ts:13 [Vue warn]: Unhandled error during execution of scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core 
  at <EmailField config= EmailField {label: 'Email', input: {…}, helper: {…}} onInput=fn > 
  at <Auth.component onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< undefined > > 
  at <RouterView> 
  at <App>
warn2 @ runtime-core.esm-bundler.js:41
logError @ runtime-core.esm-bundler.js:216
handleError @ runtime-core.esm-bundler.js:208
callWithErrorHandling @ runtime-core.esm-bundler.js:160
flushJobs @ runtime-core.esm-bundler.js:357
Promise.then (async)
queueFlush @ runtime-core.esm-bundler.js:270
queuePostFlushCb @ runtime-core.esm-bundler.js:290
queueEffectWithSuspense @ runtime-core.esm-bundler.js:1603
scheduler @ runtime-core.esm-bundler.js:1773
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:363
triggerRefValue @ reactivity.esm-bundler.js:974
(anonymous) @ reactivity.esm-bundler.js:1135
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:358
triggerRefValue @ reactivity.esm-bundler.js:974
(anonymous) @ reactivity.esm-bundler.js:1135
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:358
triggerRefValue @ reactivity.esm-bundler.js:974
set value @ reactivity.esm-bundler.js:1018
finalizeNavigation @ vue-router.mjs:3355
(anonymous) @ vue-router.mjs:3220
Promise.then (async)
pushWithRedirect @ vue-router.mjs:3187
push @ vue-router.mjs:3112
install @ vue-router.mjs:3551
use @ runtime-core.esm-bundler.js:3752
(anonymous) @ main.ts:13
runtime-core.esm-bundler.js:843 Uncaught (in promise) TypeError: Class constructor EmailField cannot be invoked without 'new'
    at renderComponentRoot (runtime-core.esm-bundler.js:843:13)
    at ReactiveEffect.componentUpdateFn [as fn] (runtime-core.esm-bundler.js:5701:46)
    at ReactiveEffect.run (reactivity.esm-bundler.js:178:19)
    at instance.update (runtime-core.esm-bundler.js:5814:51)
    at setupRenderEffect (runtime-core.esm-bundler.js:5822:5)
    at mountComponent (runtime-core.esm-bundler.js:5612:5)
    at processComponent (runtime-core.esm-bundler.js:5565:9)
    at patch (runtime-core.esm-bundler.js:5040:11)
    at mountChildren (runtime-core.esm-bundler.js:5284:7)
    at mountElement (runtime-core.esm-bundler.js:5191:7)
<template>
  <div class="auth">
    <div class="auth__content">
      <img :src="logo" alt="logo" />
      <emailField
        :config="model.login.fields[0]"
        @input="viewModel.setEmail($event)"
      ></emailField>
      <passwordField :config="model.login.fields[1]"> </passwordField>
      <ButtonComponent
        :config="model.login.loginBtn"
        @onClick="viewModel.postData()"
      ></ButtonComponent>
    </div>
  </div>
</template>
<script setup lang="ts">
import logo from '../../public/icons/logo.svg';
import ButtonComponent from '../../components/global/button/button.vue';
import { AuthModel } from './auth.model';
import { EmailField } from '../../components/global/fields/email-field/email-field.model';
import { PasswordField } from '../../components/global/fields/password-field/password-field.model';
import { AuthViewModel } from './auth.viewmodel';
import { ref, Ref } from 'vue';

const model: Ref<AuthModel> = ref(new AuthModel({
  email: '',
  password: '',
  login: {
    fields:[
      new EmailField ({
        label: 'Email',
        input: {
          type: 'email',
          placeholder: 'Введите email',
          value: '',
          isError: false,
          isDisabled: false,
          required: true,
          body_key: 'email',
        },
        helper: {
          value: 'Пожалуйста, введите email',
          isActive: false,
        },
      }),
      new PasswordField ({
        label: 'Пароль',
        isShowed: false,
        input: {
          type: 'password',
          placeholder: 'Введите пароль',
          value: '',
          isError: false,
          isDisabled: false,
          required: true,
          body_key: 'password',
        },
        helper: {
          value: 'Пожалуйста, введите пароль',
          isActive: false,
        },
      }),
    ],
    loginBtn: {
      value: 'Войти',
      type: 'filled',
      color: 'green',
      border: 'large',
      loading: false,
      disabled: false,
      width: '100%',
    },
  }
}
  
));
const viewModel: Ref<AuthViewModel> = ref(new AuthViewModel(model.value));

</script>
<style scoped lang="scss">
.auth {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(108deg, #01a254 0%, #50d17f 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -72px;
  margin-top: -107px;
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


