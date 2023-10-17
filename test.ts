вот метод который делает запрос 
добавь обработку и 
async getDriverLocations(login: string, pass: string) {
    try {
      // Выполните запрос к API GeliosPro для получения данных о координатах водителей
      const response = await axios.get(
        `https://admin.geliospro.com/sdk/?login=${login}&pass=${pass}&svc=get_units&params={}`
      );

      const drivers = response.data.forEach((driver: any) => {
        // Преобразуйте данные о координатах водителей в формат, который ожидает клиентское приложение
        return {
// тут 
        };
      });

      return response.data; // Верните данные о координатах водителей
    } catch (error) {
      throw new Error('Не удалось получить данные о водителях');
    }
  }
вот как выглядит элемент массива response.data
    {
        "id": 154364,
        "creator": 42539,
        "name": "Актау M 121 237 (ГАЗ-3302)",
        "hw_type": "ruptella",
        "hw_id": "860906043285615",
        "phone": "7013050186",
        "is_free": 0,
        "type": "auto",
        "fuel_norm": "",
        "phone2": null,
        "max_permissible_speed": 0,
        "unit_icon": "http://geliospro.com/img/libauto/trucks/042.png",
        "options": "0,",
        "info": "{\"year\": \"\", \"brand\": \"Gazel\", \"travels\": {\"fe\": 0, \"la\": 0, \"mm\": 1, \"mt\": 60, \"mtd\": 100, \"mts\": 300, \"omr\": 0, \"fign\": 1, \"mign\": 1}, \"conLossTm\": {\"isOn\": \"1\", \"value\": 300}, \"numberPlate\": \"M 121 237\", \"isGlobalView\": 0, \"organization\": \"\"}",
        "removed": 0,
        "filter_by_sats_count_is_on": false,
        "filter_by_sats_count_value": 0,
        "created_at": 1602754471,
        "activated_at": 1604599200,
        "decrypt_key": null,
        "tacho_lmsg_time": null,
        "tacho_connected": 0,
        "filling_theft_search__only_on_stops": null,
        "filling_theft_search__check_ignition_sensor_on_stops": null,
        "filling_theft_search__seconds_to_ignore_after_movement_start": null,
        "device_type_id": null,
        "motohours_correction_coefficient": "1",
        "pre_set_command_group_id": 8,
        "lmsg": {
            "id": 136557,
            "unit_type": "ruptella",
            "unit_id": "860906043285615",
            "time": 1697522824,
            "lat": "43.65487",
            "lon": "51.162015",
            "speed": 0,
            "course": 184,
            "height": 30,
            "sats": 14,
            "params": "io176:0;io5:0;io29:12711;io65:62441398;priority:0;io150:40102;htop:0;io28:1;io30:1850;io27:23;io22:73;",
            "time_speed": 1697518144,
            "object_id": 154364,
            "address": "1, Актау, Казахстан",
            "sensors": [
                {
                    "name": "Зажигание",
                    "type": "ign",
                    "value": "0",
                    "textValue": "Выкл"
                },
                {
                    "name": "Оператор",
                    "type": "arbitrary_sensor",
                    "value": "40102",
                    "textValue": "Kcell"
                },
                {
                    "name": "Напряжение ",
                    "type": "voltage",
                    "value": 12.71,
                    "textValue": 12.71
                },
                {
                    "name": "Напряжение батареи",
                    "type": "arbitrary_sensor",
                    "value": 1.85,
                    "textValue": 1.85
                }
            ]
        },
        "sensors": [
            {
                "options": [],
                "id": 587118,
                "id_unit": 154364,
                "type": "ign",
                "msg_param": "io5",
                "conversion": "0:0:Выкл;1:1:Вкл",
                "name": "Зажигание",
                "measure": null,
                "is_visible": 1,
                "min_valid_param_value": null,
                "max_valid_param_value": null,
                "fuel_tank_volume": null,
                "display_fuel_tank_volume": null
            },
            {
                "options": [],
                "id": 587119,
                "id_unit": 154364,
                "type": "arbitrary_sensor",
                "msg_param": "io150",
                "conversion": "40102:40102:Kcell",
                "name": "Оператор",
                "measure": null,
                "is_visible": 1,
                "min_valid_param_value": null,
                "max_valid_param_value": null,
                "fuel_tank_volume": null,
                "display_fuel_tank_volume": null
            },
            {
                "options": [],
                "id": 587120,
                "id_unit": 154364,
                "type": "voltage",
                "msg_param": "io29",
                "conversion": "1000:1:;2000:2:;20000:20:",
                "name": "Напряжение ",
                "measure": null,
                "is_visible": 1,
                "min_valid_param_value": null,
                "max_valid_param_value": null,
                "fuel_tank_volume": null,
                "display_fuel_tank_volume": null
            },
            {
                "options": [],
                "id": 587121,
                "id_unit": 154364,
                "type": "arbitrary_sensor",
                "msg_param": "io30",
                "conversion": "1000:1:;5000:5:",
                "name": "Напряжение батареи",
                "measure": null,
                "is_visible": 1,
                "min_valid_param_value": null,
                "max_valid_param_value": null,
                "fuel_tank_volume": null,
                "display_fuel_tank_volume": null
            }
        ]
    },


мне нужно привести в к такому виду 
{
        "name",
        "unit_icon",
        "lmsg.lat",
        "lmsg.lon",
        "info" (распарсить)
        
        
}

