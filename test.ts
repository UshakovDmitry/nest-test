<template>
  <div class="input-container">
    <input
      class="base-input"
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :minLength="minLength"
      :maxlength="maxLength"
      :disabled="disabled"
      :readonly="readonly"
      autocomplete="off"
      @input="onChange"
      @blur="emits('blur', $event)"
      @focus="emits('focus', $event)"
    />
    <icon-component
      v-if="value"
      class="clear-button"
      :class="{'icon-visible': value}"
      :width="24"
      :height="24"
      :color="'gray-blue'"
      :view-box="'0 0 24 24'"
      @click="clearInput"
      :style="{cursor: 'pointer', transition: 'opacity 0.3s'}"
    >
      <CloseIcon></CloseIcon>
    </icon-component>
  </div>
</template>



.clear-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  background: none;
  border: none;
  opacity: 0; /* Изначально иконка невидима */
  transition: opacity 0.3s ease; /* Плавное изменение прозрачности */
}

.icon-visible {
  opacity: 1; /* Иконка становится видимой */
}
