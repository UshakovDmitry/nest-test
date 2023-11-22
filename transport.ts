const updateSearch = (event: InputEvent) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  emits('onSearch', value);
};
