<FilterContractorsButtonsComponent
  :key="Object.keys(filterContractors).length"
  :filterContractors="filterContractors"
  :currentCity="currentCity"
  @filterRequestsByContractor="emits('filterRequestsByContractor', $event)"
></FilterContractorsButtonsComponent>
