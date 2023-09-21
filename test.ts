getMessages method
getHTTP.service.ts:19 API Name: messages/getMessages
getHTTP.service.ts:20 URLs Object: {getMessages: {…}}getMessages: development: "http://127.0.0.1:5173/api"production: "https://tms.next.local/api"[[Prototype]]: Object[[Prototype]]: Object
getHTTP.service.ts:26 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'development')
    at getURL (getHTTP.service.ts:26:28)
    at fetch (getHTTP.service.ts:30:29)
    at Object.getMessages (getHTTP.service.ts:37:28)
    at useGetApi (getHTTP.service.ts:40:26)
    at TransportRequestsViewModel.getData (applications.viewmodel.ts:14:28)
    at new TransportRequestsViewModel (applications.viewmodel.ts:10:10)
    at setup (applications.component.vue:31:3)
    at callWithErrorHandling (runtime-core.esm-bundler.js:158:18)
    at setupStatefulComponent (runtime-core.esm-bundler.js:7236:25)
    at setupComponent (runtime-core.esm-bundler.js:7197:36)
