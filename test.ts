applications.viewmodel.ts:67 Ошибка при получении данных: TypeError: response.json is not a function
    at Proxy.getTransportRequestsByDateRange (applications.viewmodel.ts:53:35)
    at Proxy.setTimeRange (applications.viewmodel.ts:35:10)
    at _createVNode.onSetTimeRange._cache.<computed>._cache.<computed> (applications.component.vue:9:34)
    at callWithErrorHandling (runtime-core.esm-bundler.js:158:18)
    at callWithAsyncErrorHandling (runtime-core.esm-bundler.js:166:17)
    at emit (runtime-core.esm-bundler.js:664:5)
    at runtime-core.esm-bundler.js:7422:45
    at handleDate (filters-panel.component.vue:61:3)
    at callWithErrorHandling (runtime-core.esm-bundler.js:158:18)
    at callWithAsyncErrorHandling (runtime-core.esm-bundler.js:166:17)
Определи почему в этом запросе ошибка и исправь


  async getTransportRequestsByDateRange(
    dateStart: string,
    dateEnd: string,
  ): Promise<void> {
    const body = {
      startDate: dateStart,
      endDate: dateEnd,
    };
    try {
      const response = usePostApi('getTransportRequestsbyDateRange', body,'sendFormData');


      const data = await response.json();
      console.log(data, 'data');

      // Очистить текущие данные перед добавлением новых
      this.model.transportRequests = [];

      data.forEach((dataItem: any) => {
        const transformedData = this.transformToTransportRequest(dataItem);
        const transformedDataForTable =
          this.transformToTransportForTable(transformedData);
        this.model.transportRequests.push(transformedDataForTable);
      });
      this.model.filteredTransportRequests;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }
usePostApi
import { httpProvider } from "../providers/http.provider";
import { urls } from "../resourse/config/urls";

export function usePostApi(method: string, body?: any, sendType = 'sendJSON') {
    function getURL(apiName: string) {
        if (import.meta.env.PROD) {
            return urls[apiName].production;
        }
        return urls[apiName].development;
    }

    function fetch(apiName: string) {
        const URL: string = getURL(apiName);
        const METHOD: string = "POST";
        const BODY = body;
        const SENDTYPE = sendType;

        return httpProvider(URL, METHOD, BODY, SENDTYPE);
    }

    const methods: { [key: string]: Function } = {
        getToken: () => fetch("getToken"),
        getTransportRequestsbyDateRange: () => fetch("getTransportRequestsbyDateRange"),

    };


    return methods[method]();
}
httpProvider
import { ref, type Ref } from 'vue';
// import { localStorageService } from "../services/localStorage.service";

export async function httpProvider(
  url: string,
  method: string,
  body?: any,
  sendType?: string,
) {
  // const tokenAuth: string = `Bearer ${localStorageService.getValue("token")}` || "";

  const promise: Ref<Promise<any> | undefined> = ref();

  switch (method) {
    case 'GET':
      promise.value = fetch(url, {
        method: 'GET',
        // headers: {
        //   Authorization: tokenAuth,
        // },
      });
      break;
    case 'POST':
      if (sendType === 'sendFormData') {
        promise.value = fetch(url, {
          // headers: {
          //   Authorization: tokenAuth,
          // },
          method: 'POST',
          body: new URLSearchParams(body),
        });
      } else if ('sendJSON') {
        promise.value = fetch(url, {
          headers: {
            // Authorization: tokenAuth,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(body),
        });
      } else {
        const error: Error = new Error();
        error.name = '[КРИТИЧЕСКАЯ ОШИБКА]';
        error.message =
          'Укажите тип исполняемого POST запроса (sendFormData или sendJSON). Подробнее /core/useFetch';
        throw error;
      }
      break;
  }

  if (promise.value == null) {
    const error: Error = new Error();
    error.name = '[КРИТИЧЕСКАЯ ОШИБКА]';
    error.message = 'Произошла ошибка при запросе к серверу';
    throw error;
  }

  return await promise.value.then(async (res: Response) => {
    if (res.status === 401 || res.status === 400) {
      const error: Error = new Error();
      error.name = '[КРИТИЧЕСКАЯ ОШИБКА]';
      // error.message = "Авторизация пользователя провалилась";
      throw error;
    }
    return await res.json();
  });
}
urls
export const urls: any = {
  getTransportRequests: {
    production: 'http://tms.next.local/api/getTransportRequests',
    development: 'http://localhost:4000/api/getTransportRequests',
  },
  getDrivers: {
    production: 'http://tms.next.local/api/getDrivers',
    development: 'http://localhost:4000/api/getDrivers',
  },
  getTransportRequestsbyDateRange: {
    production: 'http://tms.next.local/api/getTransportRequests/byDateRange',
    development: 'http://localhost:4000/api/getTransportRequests/byDateRange',
  },
};


