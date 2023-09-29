Start 0 End 7
table-component.vue:152 Start 0 End 7
applications.viewmodel.ts:19 [Vue warn]: Unhandled error during execution of render function 
  at <TableComponent headers= (9) ['№ заявки', 'Статус', 'ISR', 'Документ основания', 'Адрес отгрузки', 'Получатель', 'Время доставки', 'Адрес получателя', 'Вес SKU'] rows= (2) [{…}, {…}] config= {headers: Array(9), rows: Array(9)}  ... > 
  at <Applications.component onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< Proxy(Object) {__v_skip: true} > > 
  at <RouterView> 
  at <Dafault onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< Proxy(Object) {__v_skip: true} > > 
  at <RouterView> 
  at <App>
warn2 @ runtime-core.esm-bundler.js:41
logError @ runtime-core.esm-bundler.js:216
handleError @ runtime-core.esm-bundler.js:208
renderComponentRoot @ runtime-core.esm-bundler.js:853
componentUpdateFn @ runtime-core.esm-bundler.js:5764
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
callWithErrorHandling @ runtime-core.esm-bundler.js:158
flushJobs @ runtime-core.esm-bundler.js:357
Promise.then (async)
queueFlush @ runtime-core.esm-bundler.js:270
queueJob @ runtime-core.esm-bundler.js:264
(anonymous) @ runtime-core.esm-bundler.js:5810
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:363
triggerRefValue @ reactivity.esm-bundler.js:974
(anonymous) @ reactivity.esm-bundler.js:1135
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:358
trigger @ reactivity.esm-bundler.js:348
set2 @ reactivity.esm-bundler.js:485
instrumentations.<computed> @ reactivity.esm-bundler.js:412
(anonymous) @ applications.viewmodel.ts:19
getTransportRequests @ applications.viewmodel.ts:16
await in getTransportRequests (async)
TransportRequestsViewModel @ applications.viewmodel.ts:11
setup @ applications.component.vue:33
callWithErrorHandling @ runtime-core.esm-bundler.js:158
setupStatefulComponent @ runtime-core.esm-bundler.js:7236
setupComponent @ runtime-core.esm-bundler.js:7197
mountComponent @ runtime-core.esm-bundler.js:5599
processComponent @ runtime-core.esm-bundler.js:5565
patch @ runtime-core.esm-bundler.js:5040
componentUpdateFn @ runtime-core.esm-bundler.js:5708
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
setupRenderEffect @ runtime-core.esm-bundler.js:5822
mountComponent @ runtime-core.esm-bundler.js:5612
processComponent @ runtime-core.esm-bundler.js:5565
patch @ runtime-core.esm-bundler.js:5040
mountChildren @ runtime-core.esm-bundler.js:5284
mountElement @ runtime-core.esm-bundler.js:5191
processElement @ runtime-core.esm-bundler.js:5156
patch @ runtime-core.esm-bundler.js:5028
mountChildren @ runtime-core.esm-bundler.js:5284
mountElement @ runtime-core.esm-bundler.js:5191
processElement @ runtime-core.esm-bundler.js:5156
patch @ runtime-core.esm-bundler.js:5028
mountChildren @ runtime-core.esm-bundler.js:5284
mountElement @ runtime-core.esm-bundler.js:5191
processElement @ runtime-core.esm-bundler.js:5156
patch @ runtime-core.esm-bundler.js:5028
componentUpdateFn @ runtime-core.esm-bundler.js:5708
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
setupRenderEffect @ runtime-core.esm-bundler.js:5822
mountComponent @ runtime-core.esm-bundler.js:5612
processComponent @ runtime-core.esm-bundler.js:5565
patch @ runtime-core.esm-bundler.js:5040
componentUpdateFn @ runtime-core.esm-bundler.js:5773
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
callWithErrorHandling @ runtime-core.esm-bundler.js:158
flushJobs @ runtime-core.esm-bundler.js:357
Promise.then (async)
queueFlush @ runtime-core.esm-bundler.js:270
queuePostFlushCb @ runtime-core.esm-bundler.js:290
queueEffectWithSuspense @ runtime-core.esm-bundler.js:1603
scheduler @ runtime-core.esm-bundler.js:1773
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:363
triggerRefValue @ reactivity.esm-bundler.js:974
(anonymous) @ reactivity.esm-bundler.js:1135
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:358
triggerRefValue @ reactivity.esm-bundler.js:974
(anonymous) @ reactivity.esm-bundler.js:1135
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:358
triggerRefValue @ reactivity.esm-bundler.js:974
set value @ reactivity.esm-bundler.js:1018
finalizeNavigation @ vue-router.mjs:3355
(anonymous) @ vue-router.mjs:3220
Promise.then (async)
pushWithRedirect @ vue-router.mjs:3187
push @ vue-router.mjs:3112
install @ vue-router.mjs:3551
use @ runtime-core.esm-bundler.js:3752
(anonymous) @ main.ts:13
Show 80 more frames
Show less
applications.viewmodel.ts:19 [Vue warn]: Unhandled error during execution of scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core 
  at <TableComponent headers= (9) ['№ заявки', 'Статус', 'ISR', 'Документ основания', 'Адрес отгрузки', 'Получатель', 'Время доставки', 'Адрес получателя', 'Вес SKU'] rows= (2) [{…}, {…}] config= {headers: Array(9), rows: Array(9)}  ... > 
  at <Applications.component onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< Proxy(Object) {__v_skip: true} > > 
  at <RouterView> 
  at <Dafault onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< Proxy(Object) {__v_skip: true} > > 
  at <RouterView> 
  at <App>
warn2 @ runtime-core.esm-bundler.js:41
logError @ runtime-core.esm-bundler.js:216
handleError @ runtime-core.esm-bundler.js:208
callWithErrorHandling @ runtime-core.esm-bundler.js:160
flushJobs @ runtime-core.esm-bundler.js:357
Promise.then (async)
queueFlush @ runtime-core.esm-bundler.js:270
queueJob @ runtime-core.esm-bundler.js:264
(anonymous) @ runtime-core.esm-bundler.js:5810
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:363
triggerRefValue @ reactivity.esm-bundler.js:974
(anonymous) @ reactivity.esm-bundler.js:1135
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:358
trigger @ reactivity.esm-bundler.js:348
set2 @ reactivity.esm-bundler.js:485
instrumentations.<computed> @ reactivity.esm-bundler.js:412
(anonymous) @ applications.viewmodel.ts:19
getTransportRequests @ applications.viewmodel.ts:16
await in getTransportRequests (async)
TransportRequestsViewModel @ applications.viewmodel.ts:11
setup @ applications.component.vue:33
callWithErrorHandling @ runtime-core.esm-bundler.js:158
setupStatefulComponent @ runtime-core.esm-bundler.js:7236
setupComponent @ runtime-core.esm-bundler.js:7197
mountComponent @ runtime-core.esm-bundler.js:5599
processComponent @ runtime-core.esm-bundler.js:5565
patch @ runtime-core.esm-bundler.js:5040
componentUpdateFn @ runtime-core.esm-bundler.js:5708
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
setupRenderEffect @ runtime-core.esm-bundler.js:5822
mountComponent @ runtime-core.esm-bundler.js:5612
processComponent @ runtime-core.esm-bundler.js:5565
patch @ runtime-core.esm-bundler.js:5040
mountChildren @ runtime-core.esm-bundler.js:5284
mountElement @ runtime-core.esm-bundler.js:5191
processElement @ runtime-core.esm-bundler.js:5156
patch @ runtime-core.esm-bundler.js:5028
mountChildren @ runtime-core.esm-bundler.js:5284
mountElement @ runtime-core.esm-bundler.js:5191
processElement @ runtime-core.esm-bundler.js:5156
patch @ runtime-core.esm-bundler.js:5028
mountChildren @ runtime-core.esm-bundler.js:5284
mountElement @ runtime-core.esm-bundler.js:5191
processElement @ runtime-core.esm-bundler.js:5156
patch @ runtime-core.esm-bundler.js:5028
componentUpdateFn @ runtime-core.esm-bundler.js:5708
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
setupRenderEffect @ runtime-core.esm-bundler.js:5822
mountComponent @ runtime-core.esm-bundler.js:5612
processComponent @ runtime-core.esm-bundler.js:5565
patch @ runtime-core.esm-bundler.js:5040
componentUpdateFn @ runtime-core.esm-bundler.js:5773
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
callWithErrorHandling @ runtime-core.esm-bundler.js:158
flushJobs @ runtime-core.esm-bundler.js:357
Promise.then (async)
queueFlush @ runtime-core.esm-bundler.js:270
queuePostFlushCb @ runtime-core.esm-bundler.js:290
queueEffectWithSuspense @ runtime-core.esm-bundler.js:1603
scheduler @ runtime-core.esm-bundler.js:1773
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:363
triggerRefValue @ reactivity.esm-bundler.js:974
(anonymous) @ reactivity.esm-bundler.js:1135
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:358
triggerRefValue @ reactivity.esm-bundler.js:974
(anonymous) @ reactivity.esm-bundler.js:1135
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:358
triggerRefValue @ reactivity.esm-bundler.js:974
set value @ reactivity.esm-bundler.js:1018
finalizeNavigation @ vue-router.mjs:3355
(anonymous) @ vue-router.mjs:3220
Promise.then (async)
pushWithRedirect @ vue-router.mjs:3187
push @ vue-router.mjs:3112
install @ vue-router.mjs:3551
use @ runtime-core.esm-bundler.js:3752
(anonymous) @ main.ts:13
Show 76 more frames
Show less
table-component.vue:51 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'config')
    at table-component.vue:51:44
    at renderList (runtime-core.esm-bundler.js:2776:18)
    at table-component.vue:80:18
    at renderList (runtime-core.esm-bundler.js:2755:16)
    at Proxy._sfc_render (table-component.vue:81:16)
    at renderComponentRoot (runtime-core.esm-bundler.js:816:16)
    at ReactiveEffect.componentUpdateFn [as fn] (runtime-core.esm-bundler.js:5764:26)
    at ReactiveEffect.run (reactivity.esm-bundler.js:178:19)
    at instance.update (runtime-core.esm-bundler.js:5814:51)
    at callWithErrorHandling (runtime-core.esm-bundler.js:158:32)
(anonymous) @ table-component.vue:51
renderList @ runtime-core.esm-bundler.js:2776
(anonymous) @ table-component.vue:80
renderList @ runtime-core.esm-bundler.js:2755
_sfc_render @ table-component.vue:81
renderComponentRoot @ runtime-core.esm-bundler.js:816
componentUpdateFn @ runtime-core.esm-bundler.js:5764
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
callWithErrorHandling @ runtime-core.esm-bundler.js:158
flushJobs @ runtime-core.esm-bundler.js:357
Promise.then (async)
queueFlush @ runtime-core.esm-bundler.js:270
queueJob @ runtime-core.esm-bundler.js:264
(anonymous) @ runtime-core.esm-bundler.js:5810
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:363
triggerRefValue @ reactivity.esm-bundler.js:974
(anonymous) @ reactivity.esm-bundler.js:1135
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:358
trigger @ reactivity.esm-bundler.js:348
set2 @ reactivity.esm-bundler.js:485
instrumentations.<computed> @ reactivity.esm-bundler.js:412
(anonymous) @ applications.viewmodel.ts:19
getTransportRequests @ applications.viewmodel.ts:16
await in getTransportRequests (async)
TransportRequestsViewModel @ applications.viewmodel.ts:11
setup @ applications.component.vue:33
callWithErrorHandling @ runtime-core.esm-bundler.js:158
setupStatefulComponent @ runtime-core.esm-bundler.js:7236
setupComponent @ runtime-core.esm-bundler.js:7197
mountComponent @ runtime-core.esm-bundler.js:5599
processComponent @ runtime-core.esm-bundler.js:5565
patch @ runtime-core.esm-bundler.js:5040
componentUpdateFn @ runtime-core.esm-bundler.js:5708
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
setupRenderEffect @ runtime-core.esm-bundler.js:5822
mountComponent @ runtime-core.esm-bundler.js:5612
processComponent @ runtime-core.esm-bundler.js:5565
patch @ runtime-core.esm-bundler.js:5040
mountChildren @ runtime-core.esm-bundler.js:5284
mountElement @ runtime-core.esm-bundler.js:5191
processElement @ runtime-core.esm-bundler.js:5156
patch @ runtime-core.esm-bundler.js:5028
mountChildren @ runtime-core.esm-bundler.js:5284
mountElement @ runtime-core.esm-bundler.js:5191
processElement @ runtime-core.esm-bundler.js:5156
patch @ runtime-core.esm-bundler.js:5028
mountChildren @ runtime-core.esm-bundler.js:5284
mountElement @ runtime-core.esm-bundler.js:5191
processElement @ runtime-core.esm-bundler.js:5156
patch @ runtime-core.esm-bundler.js:5028
componentUpdateFn @ runtime-core.esm-bundler.js:5708
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
setupRenderEffect @ runtime-core.esm-bundler.js:5822
mountComponent @ runtime-core.esm-bundler.js:5612
processComponent @ runtime-core.esm-bundler.js:5565
patch @ runtime-core.esm-bundler.js:5040
componentUpdateFn @ runtime-core.esm-bundler.js:5773
run @ reactivity.esm-bundler.js:178
instance.update @ runtime-core.esm-bundler.js:5814
callWithErrorHandling @ runtime-core.esm-bundler.js:158
flushJobs @ runtime-core.esm-bundler.js:357
Promise.then (async)
queueFlush @ runtime-core.esm-bundler.js:270
queuePostFlushCb @ runtime-core.esm-bundler.js:290
queueEffectWithSuspense @ runtime-core.esm-bundler.js:1603
scheduler @ runtime-core.esm-bundler.js:1773
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:363
triggerRefValue @ reactivity.esm-bundler.js:974
(anonymous) @ reactivity.esm-bundler.js:1135
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:358
triggerRefValue @ reactivity.esm-bundler.js:974
(anonymous) @ reactivity.esm-bundler.js:1135
triggerEffect @ reactivity.esm-bundler.js:373
triggerEffects @ reactivity.esm-bundler.js:358
triggerRefValue @ reactivity.esm-bundler.js:974
set value @ reactivity.esm-bundler.js:1018
finalizeNavigation @ vue-router.mjs:3355
(anonymous) @ vue-router.mjs:3220
Promise.then (async)
pushWithRedirect @ vue-router.mjs:3187
push @ vue-router.mjs:3112
install @ vue-router.mjs:3551
use @ runtime-core.esm-bundler.js:3752
(anonymous) @ main.ts:13
Show 79 more frames
Show less
