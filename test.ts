<template>
<label class="toggle">
  <input class="toggle-checkbox" type="checkbox" checked>
  <div class="toggle-switch"></div>
  <span class="toggle-label"></span>
</label>
</template>

<script setup lang="ts">
// import { ref } from 'vue';

// const props = defineProps<{
//   id: number;
//   isActive?: boolean;
// }>();


</script>

<style scoped>


.toggle {
  cursor: pointer;
  display: inline-block;
}

.toggle-switch {
  display: inline-block;
  background: #ccc;
  border-radius: 16px;
  width: 42px;
  height: 24px;
  position: relative;
  vertical-align: middle;
  transition: background 0.25s;
}
.toggle-switch:before, .toggle-switch:after {
  content: "";
}
.toggle-switch:before {
  display: block;
  background: linear-gradient(to bottom, #fff 0%, #eee 100%);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: left 0.25s;
}
/* .toggle:hover .toggle-switch:before {
  background: linear-gradient(to bottom, #fff 0%, #fff 100%);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
} */
.toggle-checkbox:checked + .toggle-switch {
  background: #2F975C;
}
.toggle-checkbox:checked + .toggle-switch:before {
  left: 22px;
}

.toggle-checkbox {
  position: absolute;
  visibility: hidden;
}

.toggle-label {
  margin-left: 5px;
  position: relative;
  top: 2px;
}
</style>
