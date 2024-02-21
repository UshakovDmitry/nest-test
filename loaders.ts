<template>
  <div class="mobile-menu" v-show="true">
    <div class="mobile-menu__header">
      <div>
        <img class="logo__img" :src="logo" alt="my-logo" />
      </div>

      <p style="color: black" @click="emits('close', false)">X</p>
    </div>
    <nav class="mobile-menu__nav">
      <ul class="mobile-menu__list">
        <li class="mobile-menu__item">
          <p class="description-text">Ваш город</p>

          <CitiesComponent :cities="[]"></CitiesComponent>
        </li>
        <li class="mobile-menu__item">
          <p class="description-text">Сайт</p>
          <div class="flex">
            <AlserIcon :scale="1.5" :color="'gray-blue'">
              <call></call>
            </AlserIcon>
            <a
              href="https://alser.kz"
              target="_blank"
              class="footer__item_link"
            >
              Alser.kz</a
            >
          </div>
        </li>
        <li class="mobile-menu__item">
          <p class="description-text">Поддержка</p>
          <div class="flex">
            <AlserIcon :scale="1.5" :color="'gray-blue'">
              <call></call>
            </AlserIcon>
            <a href="tel:+77273303150"> Связаться с менеджером </a>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import CitiesComponent from "./cities.vue";
//@ts-ignore
import { AlserIcon } from "alser.vue.library";
import Call from "../../assets/IconCollection/Call.vue";
import logo from "../../assets/alser-logo.svg";

const emits = defineEmits(["close"]);
</script>

<style scoped>
.flex {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: flex-start;
}

.mobile-menu__header {
  width: 100%;
  display: flex;
  /* gap: 4px; */
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  height: 160px;
}
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.3s ease-in-out;
  z-index: 100;
  /* border: 4px solid #e72121; */
  /* transform: translateX(-100%); */
}

.mobile-menu__nav {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  /* border: 2px solid violet; */
}

.mobile-menu__list {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  justify-content: flex-start;
  align-items: flex-start;
}

.mobile-menu__item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
}

.mobile-menu__list a {
  text-decoration: none;
  color: #3d9a50;
  text-align: center;
  font-family: Rubik;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.4px;
  background-color: white;
  padding: 10px 12px;
}

.description-text {
  color: var(--text-secondary, #818780);
  font-family: Rubik;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.4px;
  text-align: left;
  width: 100%;
  margin: 0;
  padding: 0;
  /* border: 1px solid #e72121; */
}
</style>
и вот родительский компонент
<template>
  <header class="header">
    <div class="header__top">
      <div class="header__wrapper_top">
        <LocalizationComponent></LocalizationComponent>
        <CitiesComponent :cities="model.cities"></CitiesComponent>
      </div>
    </div>

    <div class="header__wrapper">
      <div class="burger" id="burger" @click="toggleMobileMenu(true)">X</div>
      <!-- ... -->
      <MobileMenuComponent
        v-if="showMobileMenu"
        @close="toggleMobileMenu($event)"
      />
      <div class="header__logo">
        <router-link to="/"
          ><img class="logo__img" :src="logo" alt="my-logo"
        /></router-link>
      </div>
      <nav class="header__menu">
        <ul class="menu__list">
          <li>
            <router-link to="/catalog">Каталог</router-link>
          </li>
          <li>
            <router-link to="/orders">Заказы</router-link>
          </li>
          <li>
            <router-link to="/service">Сервис</router-link>
          </li>
        </ul>
      </nav>

      <manager-component
        :manager_full_name="model.manager_full_name"
        :manager_phone="model.manager_phone"
        :manager_email="model.manager_email"
      ></manager-component>

      <nav class="header__menu_icons">
        <ul class="menu__list_icons">
          <li class="menu__item_icons">
            <router-link to="/compare">
              <AlserIcon :scale="1.5" :color="'gray-blue'">
                <balance></balance>
              </AlserIcon>
            </router-link>
          </li>
          <li class="menu__item_icons">
            <router-link to="/favorites">
              <AlserIcon :scale="1.5" :color="'gray-blue'">
                <FavoriteBorder></FavoriteBorder>
              </AlserIcon>
            </router-link>
          </li>
          <li class="menu__item_icons">
            <router-link to="/profile">
              <AlserIcon :scale="1.5" :color="'gray-blue'">
                <AccountCircle></AccountCircle>
              </AlserIcon>
            </router-link>
          </li>
          <li class="menu__item_icons">
            <router-link to="/cart">
              <AlserIcon :scale="1.5" :color="'gray-blue'">
                <ShoppingCart></ShoppingCart>
              </AlserIcon>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="mobile__local-cities">
        <LocalizationComponent></LocalizationComponent>
        <CitiesComponent :cities="model.cities"></CitiesComponent>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";

import logo from "../assets/alser-logo.svg";
//@ts-ignore
import Balance from "@/ui/assets/IconCollection/Balance.vue";
import FavoriteBorder from "@/ui/assets/IconCollection/FavoriteBorder.vue";
import AccountCircle from "@/ui/assets/IconCollection/AccountCircle.vue";
import ShoppingCart from "@/ui/assets/IconCollection/ShoppingCart.vue";
import ManagerComponent from "@/ui/layout/components/manager.vue";
//@ts-ignore
import { AlserIcon } from "alser.vue.library";

import LocalizationComponent from "@/ui/layout/components/localization.vue";
import CitiesComponent from "@/ui/layout/components/cities.vue";

import { LayoutModel } from "./layout.model";
import { LayoutViewModel } from "./layout.viewModel";
import MobileMenuComponent from "./components/mobile-menu.vue";
//   const model: Ref<ServiceModel> = ref(new ServiceModel());
//   const viewModel: Ref<ServiceViewModel> = ref(new ServiceViewModel(model.value));

const model: Ref<LayoutModel> = ref(new LayoutModel());
const viewModel: Ref<LayoutViewModel> = ref(new LayoutViewModel(model.value));

onMounted(() => {
  viewModel.value.getCities();
  viewModel.value.getManager();
});

const showMobileMenu = ref(false);

const toggleMobileMenu = (bool: boolean) => {
  showMobileMenu.value = bool;
};
</script>

<style scoped>
.burger {
  color: #3d9a50;
}
/* __________________________ */
.header {
  width: 100%;
  height: 130px;
  border-bottom: 1px solid rgba(35, 54, 45, 0.12);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.header__top {
  height: 40px;
  width: 100%;
  background: var(--bg-primary, #fff);
  border-bottom: 1px solid var(--border-tertiary, #e6e9e6);
}

@media screen and (max-width: 768px) {
  .header__top {
    display: none;
  }
}

.header__wrapper {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  background-color: white;
  border: none;
  color: white;
  padding: 16px 0;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}

@media screen and (max-width: 768px) {
  .header__wrapper {
    padding: 16px;
  }
}

.header__wrapper_top {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  border: none;
  color: white;
  padding: 16px 0;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  gap: 18px;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  background: var(--bg-primary, #fff);
}

.header__menu_icons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  gap: 8px;
  /* background-color: rgb(119, 45, 45); */
  /* border: 1px solid red; */
}

@media screen and (max-width: 768px) {
  .header__menu_icons {
    display: none;
  }
}

.menu__list_icons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  gap: 28px;
  background-color: white;
}

.menu__item_icons {
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
}
.logo__img {
  width: 188px;
  height: 24px;
}

@media screen and (max-width: 768px) {
  .logo__img {
    width: 108px;
    height: 24px;
  }
}

.header__menu {
  background-color: white;
}

.menu__list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  background-color: white;
}

nav a {
  text-decoration: none;
  color: #3d9a50;
  text-align: center;
  font-family: Rubik;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.4px;
  background-color: white;
  padding: 10px 12px;
}

nav .router-link-active {
  color: #3d9a50;
  border-radius: 16px;
  background-color: rgba(0, 161, 83, 0.24);
  padding: 10px 12px;
  text-decoration: none;
  font-family: Rubik;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.4px;
}

.menu__list li {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .header__menu {
    display: none;
  }
}

.mobile__local-cities {
  display: none;
}

@media screen and (max-width: 768px) {
  .mobile__local-cities {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 170px;
    gap: 18px;
    border: 1px solid #18ad18;
  }
}
</style>


я хочу реализовать плавное выезжаение мобильного меню слева с помощью оборачивания с <transition>
