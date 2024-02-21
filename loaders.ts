<transition name="slide-in">
  <MobileMenuComponent
    v-if="showMobileMenu"
    @close="toggleMobileMenu($event)"
  />
</transition>



.slide-in-enter-active, .slide-in-leave-active {
  transition: transform 0.3s ease;
}
.slide-in-enter, .slide-in-leave-to /* .slide-in-leave-active в <2.1.8 */ {
  transform: translateX(-100%);
}







.mobile-menu {
  /* Ваши стили */
  transform: translateX(-100%); /* Скрыть меню за левым краем экрана */
}



.mobile-menu-enter-active {
  transform: translateX(0);
}
