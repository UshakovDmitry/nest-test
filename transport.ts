<div v-else-if="config.value === ''" class="default">
    <div>
      <IconComponent
        :сonfig="{
          name: 'cancel',
          color: 'red',
          width: 22,
          height: 22,
        }"
      ></IconComponent>
    </div>
    <p class="cell__text-default">Без статуса</p>
  </div>
