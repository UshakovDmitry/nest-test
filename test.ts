import { useGetApi } from '../../domain/services/getHTTP.service';
import { type TransportRequestsModel } from './applications.model';
// import { ITransportRequest } from '../../domain/interfaces/transportRequest.interface';

export class TransportRequestsViewModel {
  model: TransportRequestsModel;

  constructor(model: any) {
    this.model = model;
    this.getData();
  }

  async getData(): Promise<void> {
    const response = await useGetApi('getMessages');
    console.log(response, 'response');
    response.forEach((data: any) => {
      const transformedData = this.transformToTransportRequest(data);
      console.log(transformedData, 'transformedData');
      this.model.transportRequests.push(transformedData);
      console.log(
        this.model.transportRequests,
        'this.model.transportRequests',
      );
    });



import { httpProvider } from '../providers/http.provider';
import { urls } from '../resourse/config/urls';

export function useGetApi(method: string, params?: string | undefined) {
  console.log(method, 'method');

  function getURL(apiName: string): string {
    console.log('API Name:', apiName);
    console.log('URLs Object:', urls);
    const p: string = params ? params : '';
    const isProduction = Boolean(import.meta.env.PROD);
    if (isProduction) {
      return urls[apiName].production + p;
    }
    return urls[apiName].development + p;
  }

  function fetch(apiName: string) {
    const URL: string = getURL(apiName);
    const METHOD: string = 'GET';

    return httpProvider(URL, METHOD);
  }

  const methods: { [key: string]: Function } = {
    getMessages: () => fetch('getMessages'),
  };

  return methods[method]();
}

import { ref, Ref } from "vue";
// import { localStorageService } from "../services/localStorage.service";

export async function httpProvider(
  url: string,
  method: string,
  body?: any,
  sendType?: string
) {
  // const tokenAuth: string = `Bearer ${localStorageService.getValue("token")}` || "";

  const promise: Ref<Promise<any> | undefined> = ref();

  switch (method) {
    case "GET":
      promise.value = fetch(url, {
        method: "GET",
        // headers: {
        //   Authorization: tokenAuth,
        // },
      });
      break;
    case "POST":
      if (sendType === "sendFormData") {
        promise.value = fetch(url, {
          // headers: {
          //   Authorization: tokenAuth,
          // },
          method: "POST",
          body: new URLSearchParams(body),
        });
      } else if ("sendJSON") {
        promise.value = fetch(url, {
          headers: {
            // Authorization: tokenAuth,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(body),
        });
      } else {
        const error: Error = new Error();
        error.name = "[КРИТИЧЕСКАЯ ОШИБКА]";
        error.message =
          "Укажите тип исполняемого POST запроса (sendFormData или sendJSON). Подробнее /core/useFetch";
        throw error;
      }
      break;
  }

  if (!promise.value) {
    const error: Error = new Error();
    error.name = "[КРИТИЧЕСКАЯ ОШИБКА]";
    error.message = "Произошла ошибка при запросе к серверу";
    throw error;
  }

  return promise.value.then((res: Response) => {
    if (res.status === 401 || res.status === 400) {
      const error: Error = new Error();
      error.name = "[КРИТИЧЕСКАЯ ОШИБКА]";
      // error.message = "Авторизация пользователя провалилась";
      throw error;
    }
    return res.json();
  });
}

export const urls: any = {
  getMessages: {
      production: 'https://tms.next.local/api',
      development: 'http://127.0.0.1:5173/api',
  },
};

getMessages method
getHTTP.service.ts:8 API Name: getMessages
getHTTP.service.ts:9 URLs Object: 
{getMessages: {…}}
getMessages
: 
development
: 
"http://127.0.0.1:5173/api"
production
: 
"https://tms.next.local/api"
[[Prototype]]
: 
Object
[[Prototype]]
: 
Object
constructor
: 
ƒ Object()
hasOwnProperty
: 
ƒ hasOwnProperty()
isPrototypeOf
: 
ƒ isPrototypeOf()
propertyIsEnumerable
: 
ƒ propertyIsEnumerable()
toLocaleString
: 
ƒ toLocaleString()
toString
: 
ƒ toString()
valueOf
: 
ƒ valueOf()
__defineGetter__
: 
ƒ __defineGetter__()
__defineSetter__
: 
ƒ __defineSetter__()
__lookupGetter__
: 
ƒ __lookupGetter__()
__lookupSetter__
: 
ƒ __lookupSetter__()
__proto__
: 
(...)
get __proto__
: 
ƒ __proto__()
set __proto__
: 
ƒ __proto__()
VM3334:1 Uncaught (in promise) SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON
await (async)		
TransportRequestsViewModel	@	applications.viewmodel.ts:10
setup	@	applications.component.vue:31
Promise.then (async)		
(anonymous)	@	main.ts:13
Show 59 more frames

