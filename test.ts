я написал логику зпросов 
если в режиме разработки то обращаться на один адрес и если в режиме продакшн то на другой
В ЧЕМ ПРОБЛЕМА?

import { httpProvider } from "../providers/http.provider";
import { urls } from "../resourse/config/urls";

export function useGetApi(method: string, params?: string | undefined) {

    console.log(method, 'method');
    
  function getURL(apiName: string): string {
    const p: string = params ? params : "";
    if (import.meta.env.PROD as any) {
      return urls[apiName].production + p;
    }
    return urls[apiName].development + p;
  }


  function fetch(apiName: string) {
    const URL: string = getURL(apiName);
    const METHOD: string = "GET";

    return httpProvider(URL, METHOD);
  }

  const methods: { [key: string]: Function } = {
    getMessages: () => fetch("messages/getMessages"),
  };

  return methods[method]();
}


urls
export const urls: any = {
  getToken: {
    production: '',
    development: '',
  },
  getMessages: {
    production: 'https://tms.next.local/api',
    development: 'http://127.0.0.1:5173/api',
  },
};



getHTTP.service.ts:13 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'development')
    at getURL (getHTTP.service.ts:13:26)
    at fetch (getHTTP.service.ts:18:25)
    at Object.getMessages (getHTTP.service.ts:25:24)
    at useGetApi (getHTTP.service.ts:28:24)
    at TransportRequestsViewModel.getData (applications.viewmodel.ts:14:28)
    at new TransportRequestsViewModel (applications.viewmodel.ts:10:10)
    at setup (applications.component.vue:31:3)
    at callWithErrorHandling (runtime-core.esm-bundler.js:158:18)
    at setupStatefulComponent (runtime-core.esm-bundler.js:7236:25)
    at setupComponent (runtime-core.esm-bundler.js:7197:36)
