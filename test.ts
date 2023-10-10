  sort (index: number): void {
this.model.filteredCouriers.sort((a, b) => {
  if (a.courierFullName > b.courierFullName) {
    return 1;
  };
  if (a.courierFullName < b.courierFullName) {
    return -1;
  };
  return 0;
});
  }
}
