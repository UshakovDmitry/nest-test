import { firstValueFrom } from 'rxjs';

// ...

try {
  const response = await firstValueFrom(this.httpService.get(url));
  console.log(response.data.GeoObjectCollection.featureMember[0].GeoObject.name,'город из яндекса');
  return response.data.GeoObjectCollection.featureMember[0].GeoObject.name;
} catch (error) {
  console.error("Ошибка при получении данных из Yandex Geocode:", error);
  throw error;
}

