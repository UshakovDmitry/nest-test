const updatedDrivers = drivers.map(driver => {
  const countDoneOrders = driver.transportRequests.filter(req => req.documentStatus === "Доставлено").length;
  const countProcessOrders = driver.transportRequests.filter(req => req.documentStatus === "Доставляется").length;
  
  return {
    ...driver,
    countDoneOrdreds: String(countDoneOrders),
    countProccesOrdreds: String(countProcessOrders)
  };
});

       
        ]
    },
