<template>
  <div>
test
  </div>

</template>
<script setup lang="ts">
import { ref, Ref } from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
// const courierID = router.params.id;
const car = router.query.type;
console.log(car,'car');


</script>
<style scoped></style>



  goToCourierDetail(row: any): void {    
    router.push({ name: 'CourierDetail', params: { id: row.fullName }, query: { type: row.type } });

}

main.ts:13 [Vue warn]: Unhandled error during execution of setup function 
  at <CourierDetail.component onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< undefined > > 
  at <RouterView> 
  at <Dafault onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< undefined > > 
  at <RouterView> 
  at <App>
warn2 @ runtime-core.esm-bundler.js:41
logError @ runtime-core.esm-bundler.js:216
handleError @ runtime-core.esm-bundler.js:208
callWithErrorHandling @ runtime-core.esm-bundler.js:160
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
main.ts:13 [Vue warn]: Unhandled error during execution of scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core 
  at <CourierDetail.component onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< undefined > > 
  at <RouterView> 
  at <Dafault onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< undefined > > 
  at <RouterView> 
  at <App>
warn2 @ runtime-core.esm-bundler.js:41
logError @ runtime-core.esm-bundler.js:216
handleError @ runtime-core.esm-bundler.js:208
callWithErrorHandling @ runtime-core.esm-bundler.js:160
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
courier-detail.component.vue:15 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'type')
    at setup (courier-detail.component.vue:15:26)
    at callWithErrorHandling (runtime-core.esm-bundler.js:158:18)
    at setupStatefulComponent (runtime-core.esm-bundler.js:7236:25)
    at setupComponent (runtime-core.esm-bundler.js:7197:36)
    at mountComponent (runtime-core.esm-bundler.js:5599:7)
    at processComponent (runtime-core.esm-bundler.js:5565:9)
    at patch (runtime-core.esm-bundler.js:5040:11)
    at ReactiveEffect.componentUpdateFn [as fn] (runtime-core.esm-bundler.js:5708:11)
    at ReactiveEffect.run (reactivity.esm-bundler.js:178:19)
    at instance.update (runtime-core.esm-bundler.js:5814:51)
