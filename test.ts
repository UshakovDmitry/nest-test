const handleStrategy = async () => {
  const strategy = chooseStrategy();
  if (strategy) {
    await strategy;
  } else {
    console.error("Не выбрана стратегия");
  }
};

handleStrategy();
