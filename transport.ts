<!--... ваш код ...-->

<div v-else>
  <!-- здесь содержимое для всех остальных случаев -->
  <IconComponent
    :сonfig="{
      name: 'default-icon', // пример имени для иконки по умолчанию
      color: '#777',
      width: 20,
      height: 20,
    }"
  ></IconComponent>

  <p class="cell__text">{{ config.value }}</p>
</div>
</template>

<!--... ваш код ...-->
