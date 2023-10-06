 const chooseStrategy = () => {
        if (props.drivers && props.drivers.length > 0) {
          return showDrivers(props.drivers);
        } else if (props.address) {
          return showAddress(props.address);
        } else if (props.search) {
          return determineAddress(props.city, props.street, props.house);
        }
      };

      const strategy = chooseStrategy();
      if (strategy) {
        strategy();
      } else {
        console.error("Не выбрана стратегия");
      }

This expression is not callable.
  Type 'Promise<void>' has no call signatures.ts(2349)
const strategy: Promise<void>
