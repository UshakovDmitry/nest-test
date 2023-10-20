user-info.component.vue:4 Uncaught (in promise) TypeError: Cannot read properties of null (reading 'fullName')
    at Proxy._sfc_render (user-info.component.vue:4:38)
    at renderComponentRoot (runtime-core.esm-bundler.js:816:16)
    at ReactiveEffect.componentUpdateFn [as fn] (runtime-core.esm-bundler.js:5701:46)
    at ReactiveEffect.run (reactivity.esm-bundler.js:178:19)
    at instance.update (runtime-core.esm-bundler.js:5814:51)
    at setupRenderEffect (runtime-core.esm-bundler.js:5822:5)
    at mountComponent (runtime-core.esm-bundler.js:5612:5)
    at processComponent (runtime-core.esm-bundler.js:5565:9)
    at patch (runtime-core.esm-bundler.js:5040:11)
    at mountChildren (runtime-core.esm-bundler.js:5284:7)


<template>
  <div>
    <AppHeaderComponent :user="user" v-if="!isAuthPage" />
    <div class="main-layout">
      <AppNavbarComponent v-if="!isAuthPage" />
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AppHeaderComponent from '../components/AppHeaderComponent.vue';
import AppNavbarComponent from '../components/AppNavbarComponent.vue';
import { IUser } from '../domain/interfaces/user.interface';

const route = useRoute();
const isAuthPage = ref(route.path === '/auth');

// Реактивное свойство для хранения данных пользователя
const user = ref<IUser | null>(null);

onMounted(() => {
  // Считывание данных пользователя из локального хранилища при монтировании компонента
  const userData = localStorage.getItem('user');
  if (userData) {
    user.value = JSON.parse(userData);
  }
});

</script>

<style>
.main-layout {
  display: flex;
  flex-direction: row;
  height: 100vh;
}
.content {
  flex: 1;
}
</style>

AppHeaderComponent
<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/dashboard"><img :src="logo" data-test="img-logo" alt="logo" /></router-link>
    </div>
    <div>
      <UserInfo :user="user"></UserInfo>
    </div>
  </header>
</template>

<script setup lang="ts">
import logo from '../public/icons/logo.svg';
import { IUser } from '../domain/interfaces/user.interface';
import UserInfo from './user-info/user-info.component.vue';

defineProps<{
  user: IUser;
}>();

</script>

<style>
.header {
  background-color: #fff;
  box-shadow:
    0px 1px 3px 1px rgba(204, 204, 204, 0.15),
    0px 1px 2px 0px rgba(204, 204, 204, 0.3);
  color: white;
  padding: 24px;
  box-sizing: border-box;
  position: fixed;
  height: 108px;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.app-header {
  color: black;
}
.header__logout {
  cursor: pointer;
  width: 100px;
  height: 40px;
  border: 1px solid #23362D4D;
}

.link{
  margin: 0 10px;
}
</style>

user-info
<template>
  <div class="user">
    <div class="user__info">
      <span class="fullname">{{ user.fullName }}</span>
      <div class="">
        <span class="iin">{{ user.iin }}</span>
      </div>
    </div>
    <div class="user__logout"
    @click="logout()"
    >
      <IconComponent
        :сonfig="{
          name: 'logout',
          color: '#000',
          width: 25,
          height: 25,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IUser } from '../../domain/interfaces/user.interface';
import IconComponent from '../../components/global/icon/icon.component.vue';
import { storeProviderRemoveValue } from '../../domain/providers/store.provider';

defineProps<{
  user: IUser;
}>();

const logout = () => {
  storeProviderRemoveValue('token');
  window.location.reload();
};
</script>

<style scoped>
.user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
}
.fullname {
    color: var(--text-dark, #23362D);
text-align: right;

/* Typography/Body Large */
font-family: Rubik;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 150% */
letter-spacing: 0.15px;
}

.iin {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #23362d;
}

.user__logout {
  display: flex;
  width: 40px;
  height: 40px;
  padding: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 64px;
  background: var(--secondary-light-mode-grey, #f2f3f5);
  cursor: pointer;
}
.user__logout:hover {
  background: var(--secondary-light-mode-grey-hover, #e4e6e9);
  scale: 1.1;
  transition: 0.4s;
}
</style>
