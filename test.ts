const drivers = response.data.map((driver: any) => {
  const {
    name,
    unit_icon,
    lmsg: { lat, lon },
    info,
  } = driver;

  // Распарсим поле "info" в объект
  const infoObject = JSON.parse(info);

  return {
    name,
    unit_icon,
    "lmsg.lat": lat,
    "lmsg.lon": lon,
    info: infoObject, // Вставляем распарсенный объект "info"
  };
});

return drivers;
