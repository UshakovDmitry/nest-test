<script setup lang="ts">
import { ref } from 'vue';

// ... (остальной код)

const buttonClicked = (contractor: string) => {
  if (activeButton.value === contractor) {
    activeButton.value = '';
    emits('filterRequestsByContractor', ''); // Эмитируется событие с пустой строкой, чтобы снять фильтр
  } else {
    activeButton.value = contractor;
    emits('filterRequestsByContractor', contractor);
  }
};
</script>






filterRequestsByContractor(contractor: string): void {
  if (!contractor) { // Если contractor пустая строка, снимаем фильтр
    this.model.filteredTransportRequests = this.model.transportRequests;
  } else if (contractor === "Прочее") {
    this.model.filteredTransportRequests = this.model.transportRequests.filter(
        request => !request.filterContractor || request.filterContractor.trim() === ""
    );
  } else {
    this.model.filteredTransportRequests = this.model.transportRequests.filter(
        request => request.filterContractor === contractor
    );
  }  
}



