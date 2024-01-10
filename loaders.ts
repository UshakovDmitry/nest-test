import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/ui/router/index.ts'



const app = createApp(App)
app
    .use(router)
    .mount('#app')





import { createRouter, createWebHistory, RouteRecordRaw,  } from "vue-router";


const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/ui/pages/login/login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/ui/pages/sign-up/sign-up.vue"),
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("@/ui/pages/orders/orders.vue"),
  },
  {
    path: "/service",
    name: "service",
    component: () => import("@/ui/pages/service/service.vue"),
  },
  {
    path: "/promotions",
    name: "promotions",
    component: () => import("@/ui/pages/promotions/promotions.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/ui/pages/cart/cart.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/ui/pages/profile/profile.vue"),
  },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, from,next) => {
  const token: string | null = localStorage.getItem('token')
  console.log(token, 'token');
  console.log(to,'to');
  console.log(from,'from');
  
  


  if (to.name === 'login' && token)
    return next({
      name: 'orders'
    })

})

export default router;


main.ts:11 [Vue Router warn]: No match found for location with path "/catalog"
warn @ vue-router.mjs:35
resolve @ vue-router.mjs:3015
(anonymous) @ vue-router.mjs:2164
run @ reactivity.esm-bundler.js:178
get value @ reactivity.esm-bundler.js:1142
useLink @ vue-router.mjs:2207
setup @ vue-router.mjs:2253
callWithErrorHandling @ runtime-core.esm-bundler.js:158
setupStatefulComponent @ runtime-core.esm-bundler.js:7331
setupComponent @ runtime-core.esm-bundler.js:7292
mountComponent @ runtime-core.esm-bundler.js:5687
processComponent @ runtime-core.esm-bundler.js:5653
patch @ runtime-core.esm-bundler.js:5128
mountChildren @ runtime-core.esm-bundler.js:5372
mountElement @ runtime-core.esm-bundler.js:5279
processElement @ runtime-core.esm-bundler.js:5244
patch @ runtime-core.esm-bundler.js:5116
mountChildren @ runtime-core.esm-bundler.js:5372
mountElement @ runtime-core.esm-bundler.js:5279
processElement @ runtime-core.esm-bundler.js:5244
patch @ runtime-core.esm-bundler.js:5116
mountChildren @ runtime-core.esm-bundler.js:5372
mountElement @ runtime-core.esm-bundler.js:5279
processElement @ runtime-core.esm-bundler.js:5244
patch @ runtime-core.esm-bundler.js:5116
mountChildren @ runtime-core.esm-bundler.js:5372
mountElement @ runtime-core.esm-bundler.js:5279
processElement @ runtime-core.esm-bundler.js:5244
patch @ runtime-core.esm-bundler.js:5116
componentUpdateFn @ runtime-core.esm-bundler.js:5796
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5902
setupRenderEffect @ runtime-core.esm-bundler.js:5910
mountComponent @ runtime-core.esm-bundler.js:5700
processComponent @ runtime-core.esm-bundler.js:5653
patch @ runtime-core.esm-bundler.js:5128
mountChildren @ runtime-core.esm-bundler.js:5372
processFragment @ runtime-core.esm-bundler.js:5587
patch @ runtime-core.esm-bundler.js:5102
componentUpdateFn @ runtime-core.esm-bundler.js:5796
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5902
setupRenderEffect @ runtime-core.esm-bundler.js:5910
mountComponent @ runtime-core.esm-bundler.js:5700
processComponent @ runtime-core.esm-bundler.js:5653
patch @ runtime-core.esm-bundler.js:5128
render2 @ runtime-core.esm-bundler.js:6420
mount @ runtime-core.esm-bundler.js:3855
app.mount @ runtime-dom.esm-bundler.js:1463
(anonymous) @ main.ts:11
Show 49 more frames
index.ts:52 "273|Q8edXiJwmemBXtAvd4L8npcni18aLCOdKFRA0p5D95b3bf10" token
index.ts:53 {fullPath: '/login', path: '/login', query: {…}, hash: '', name: 'login', …} 'to'
index.ts:54 {path: '/', name: undefined, params: {…}, query: {…}, hash: '', …} 'from'
index.ts:52 "273|Q8edXiJwmemBXtAvd4L8npcni18aLCOdKFRA0p5D95b3bf10" token
index.ts:53 {fullPath: '/orders', hash: '', query: {…}, name: 'orders', path: '/orders', …} 'to'
index.ts:54 {path: '/', name: undefined, params: {…}, query: {…}, hash: '', …} 'from'
main.ts:10 [Vue Router warn]: The "next" callback was never called inside of :
async (to, from, next) => {
  const token = localStorage.getItem("token");
  console.log(token, "token");
  console.log(to, "to");
  console.log(from, "from");
  if (to.name === "login" && token)
    return next({
      name: "orders"
    });
}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.
warn @ vue-router.mjs:35
(anonymous) @ vue-router.mjs:2014
Promise.then (async)
(anonymous) @ vue-router.mjs:2011
(anonymous) @ vue-router.mjs:1976
runWithContext @ runtime-core.esm-bundler.js:3896
runWithContext @ vue-router.mjs:3237
(anonymous) @ vue-router.mjs:3590
Promise.then (async)
(anonymous) @ vue-router.mjs:3590
runGuardQueue @ vue-router.mjs:3590
(anonymous) @ vue-router.mjs:3263
Promise.then (async)
navigate @ vue-router.mjs:3256
pushWithRedirect @ vue-router.mjs:3177
(anonymous) @ vue-router.mjs:3201
Promise.then (async)
pushWithRedirect @ vue-router.mjs:3185
push @ vue-router.mjs:3110
install @ vue-router.mjs:3551
use @ runtime-core.esm-bundler.js:3786
(anonymous) @ main.ts:10
Show 17 more frames
main.ts:10 [Vue Router warn]: uncaught error during route navigation:
warn @ vue-router.mjs:35
triggerError @ vue-router.mjs:3469
(anonymous) @ vue-router.mjs:3184
Promise.catch (async)
pushWithRedirect @ vue-router.mjs:3178
(anonymous) @ vue-router.mjs:3201
Promise.then (async)
pushWithRedirect @ vue-router.mjs:3185
push @ vue-router.mjs:3110
install @ vue-router.mjs:3551
use @ runtime-core.esm-bundler.js:3786
(anonymous) @ main.ts:10
Show 9 more frames
main.ts:10 Error: Invalid navigation guard
    at vue-router.mjs:2015:47
triggerError @ vue-router.mjs:3471
(anonymous) @ vue-router.mjs:3184
Promise.catch (async)
pushWithRedirect @ vue-router.mjs:3178
(anonymous) @ vue-router.mjs:3201
Promise.then (async)
pushWithRedirect @ vue-router.mjs:3185
push @ vue-router.mjs:3110
install @ vue-router.mjs:3551
use @ runtime-core.esm-bundler.js:3786
(anonymous) @ main.ts:10
Show 8 more frames
main.ts:10 [Vue Router warn]: Unexpected error when starting the router: Error: Invalid navigation guard
    at vue-router.mjs:2015:47



