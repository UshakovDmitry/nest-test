<div class="form-component__body">
    <transition name="fade">
      <company-fields-step v-if="_first_step"></company-fields-step>
    </transition>
    
    <transition name="slide">
      <person-fields-step v-if="_second_step"></person-fields-step>
    </transition>

    <transition name="zoom">
      <success-step v-if="_third_step"></success-step>
    </transition>
</div>



/* Общие стили перехода */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s;
}
.slide
-enter, .slide-leave-to {
transform: translateY(20px);
opacity: 0;
}

.zoom-enter-active, .zoom-leave-active {
transition: transform 0.5s, opacity 0.5s;
}
.zoom-enter, .zoom-leave-to {
transform: scale(0.5);
opacity: 0;
}
