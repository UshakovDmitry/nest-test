function getTotalTransportRequests(drivers) {
    let totalRequests = 0;
    
    drivers.forEach(driver => {
        totalRequests += driver.transportRequests.length;
    });
    
    return totalRequests;
}

// Теперь вы можете вызвать функцию getTotalTransportRequests с вашим массивом водителей
const drivers = [ /* ваш массив объектов водителей */ ];
const totalRequests = getTotalTransportRequests(drivers);

console.log(`Общее количество заявок у всех водителей: ${totalRequests}`);
