      <YandexMapComponent
          :api-key="'6fb5af6e-2d56-4694-8beb-ec23ea4ad479'"
          :address-list="['fdgasdf', 'fdgasdf']"
          :stop-remove-all-before-click="true"
          :zoom="13"
          :drivers="[
            {
              name: 'Александр',
              longitude: '69.62451',
              latitude: '42.3420105',
            },
            {
              name: 'Александр',
              longitude: '71.401836',
              latitude: '51.173581',
            },
            {
              name: 'Александр',
              longitude: '69.62451',
              latitude: '52.296423',
            },
            {
              name: 'Александр',
              longitude: '76.968408',
              latitude: '42.3420105',
            },
          ]"
          :search="false"
          :hint-content="'ALSER.kz'"
        ></YandexMapComponent>

 function marker(coords: any, address: any) {
        //  Создание макета балуна на основе Twitter Bootstrap.
        const MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
          '<div class="popover">' +
            // '<a class="close" href="#">	&#x2716;</a>' +

            '$[[options.contentLayout observeSize minWidth=300 maxWidth=300 maxHeight=300]]' +
            '</div>',
        );
        //  Создание вложенного макета содержимого балуна.
        const MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
          `<h3 class="popover-title"> ${address.name}</h3>` +
            `<div class="popover-main1">` +
            `<img class="popover__img" src="https:aport.kz/wp-content/uploads/2016/12/alser-300x77.png" alt="" />` +
            `<div class="popover-address">${address.name}</div>` +
            `<div class="popover-schedule">` +
            `<div class="popover-content">
                      <p class="popover-text">Будние дни</p>
                      <p class="popover-text">${address.name}</p>
                      </div>` +
            `<div class="popover-content">
                      <p class="popover-text">Сб</p>
                      <p class="popover-text">${address.name}</p>
                      </div>` +
            `<div class="popover-content">
                      <p class="popover-text">Вс</p>
                      <p class="popover-text">${address.name}</p>
                      </div>` +
            `</div>` +
            `</div>` +
            `<div class="popover__btns">` +
            `<button class="popover-btn"><a  href="https:yandex.ru/maps/?rtext=~${[
              address.latitude,
              address.longitude,
            ]}" target="_blank">Проложить маршрут </a></button>` +
            `<button class="popover-btn">Позвонить</button>` +
            `</div>`,
        );
        const placemark = new ymaps.Placemark(
          coords,
          {
            hintContent: ` ${address.name}`,
          },
          {
            iconLayout: 'default#image',
            iconImageHref: 'icons/logo.svg',
            iconImageSize: [48, 65] ,
            iconImageOffset: [-5, -38],
            zIndex:  1 ,
            balloonShadow: false,
            balloonLayout: MyBalloonLayout,
            balloonContentLayout: MyBalloonContentLayout,
            // balloonPanelMaxMapArea: 0,
            hideIconOnBalloonOpen: false,
            // И дополнительно смещаем балун, для открытия над иконкой.
            balloonOffset: [-150, -285],
          },
        );
        if (address.selected) {
          myMap.setCenter(coords, 13, {
            flying: true,
            duration: 1000,
          });

        }

        placemark.events.add('click', (e) => {
          // emits('getCurrentCoordinates', {
          //   id: address.id,
          //   coordinates: coords,
          // });
          myMap.panTo(coords, {
            flying: true,
            duration: 1000,
            zoom: 13,
          });
        });
        return placemark;
      }

      const showAddress = async (address: any) => {
        myMap.geoObjects.removeAll();

        const placemark = new ymaps.Placemark(
          address,
          {
            hintContent: props.hintContent,
          },
          {
            iconLayout: 'default#image',
            iconImageHref: 'icons/new-selected-marker.svg',
            iconImageSize: [65, 62],
            iconImageOffset: [-5, -38],
            balloonShadow: false,
            hideIconOnBalloonOpen: false,
            balloonOffset: [-150, -285],
          },
        );
        myMap.geoObjects.add(placemark);
        myMap.panTo(address, {
          flying: true,
          duration: 1000,
          zoom: 13,
        });
        const res = await ymaps.geocode(address);
        if (res.geoObjects.get(0)) {
          const address = res.geoObjects.get(0).properties.get('text');

          ymaps.geocode(address).then((res: any) => {
            const addressData = res.geoObjects
              .get(0)
              .properties.get('metaDataProperty');

            const addressComponents =
              addressData.GeocoderMetaData.Address.Components;
            const addressObject = {
              country: '',
              province: '',
              locality: '',
              street: '',
              house: '',
            };
            addressComponents.forEach((component: any) => {
              if (component.kind === 'country') {
                addressObject.country = component.name;
              }
              if (component.kind === 'province') {
                addressObject.province = component.name;
              }
              if (component.kind === 'locality') {
                addressObject.locality = component.name;
              }
              if (component.kind === 'street') {
                addressObject.street = component.name;
              }
              if (component.kind === 'house') {
                addressObject.house = component.name;
              }
            });
            emits('setAddressFromYandexMaps', addressObject);
          });
        }
      };
