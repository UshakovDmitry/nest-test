const isStatusActive = (status, chronology) => {
  const delivery = findDeliveryOperation(chronology);
  const hasPickup = chronology.some(
    (item) => item.TypeOperation === 'Самовывоз',
  );
  const waitingClient = chronology.some(
    (item) => item.statuses.includes('Ожидает клиента'),
  );

  if (status === 'Оформлен' && waitingClient) {
    return true;
  }
  if (status === 'Доставляется' && hasPickup) {
    return true;
  }

  return delivery.statuses && delivery.statuses.includes(status);
};
