function getURL(apiName: string): string {
    console.log('API Name:', apiName); // Логируем имя API
    console.log('URLs Object:', urls); // Логируем объект с URL
    const p: string = params ? params : "";
    const isProduction = Boolean(import.meta.env.PROD);
    if (isProduction) {
        return urls[apiName].production + p;
    }
    return urls[apiName].development + p;
}

