this.model.cities = [
  ...new Set(this.model.couriers.map((item) => item.city)),
].sort((a, b) => a.localeCompare(b, 'ru'));

