import { httpProvider } from "../providers/http.provider";
import { urls } from "../resourse/config/urls";

export function useGetApi(method: string, params?: string | undefined) {
    console.log(method, 'method');
    
    function getURL(apiName: string): string {
        const p: string = params ? params : "";
        
        // Изменяем проверку окружения
        const isProduction = Boolean(import.meta.env.PROD);
        
        if (isProduction) {
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

// Убираем getToken из объекта urls
export const urls: any = {
    getMessages: {
        production: 'https://tms.next.local/api',
        development: 'http://127.0.0.1:5173/api',
    },
};
