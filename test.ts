.no-hover:hover {
  background-color: initial !important;
  cursor: initial !important;
}


<tr
  class="table-tbody-tr"
  :class="{ 'no-hover': !props.hover }"
  v-for="(row, rowIndex) in paginatedRows"
  :key="rowIndex"
  @click="emits('goToDetail', row)"
>
  <!-- остальной код -->
</tr>


const props = defineProps({
  // ... другие пропы
  hover: {
    type: Boolean,
    default: true,
  },
});
