import { useGetApi } from '../../domain/services/getHTTP.service';
import router from '../../router';
import { type TransportRequestsModel } from './applications.model';
// import { ITransportRequest } from '../../domain/interfaces/transportRequest.interface';

export class TransportRequestsViewModel {
  model: TransportRequestsModel;

  constructor(model: any) {
    this.model = model;
    this.getTransportRequests();
  }

  async getTransportRequests(): Promise<void> {
    const response = await useGetApi('getTransportRequests');
    response.forEach((data: any) => {
      const transformedData = this.transformToTransportRequest(data);
      const transformedDataForTable =
        this.transformToTransportForTable(transformedData);
      this.model.transportRequests.push(transformedDataForTable);
    });
  }

  selectCity(city: string): void {
    console.log(city);
  }

  downloadLoadersAsXLSX(): void {
    alert('Функционал в разработке');
  }

  goToTransportRequestDetail(row: any) {
    router.push({
      name: 'ApplicationDetail',
      params: { id: row.number },
      query: {
        number: row.number,
      },
    });
  }

  transformToTransportRequest(data: any) {
    return {
      number: String(data.Number),
      status: String(data.DocumentStatus),
      ISR: String(data.ISR),
      document: String(data.Informal_Document),
      carModel: String(data.CarModel),
      carNumber: String(data.NuberCar),
      numberPPO: String(data.NuberPPO),
      organization: String(data.Organization),
      typePayment: String(data.TypePayment),
      loanAgreementStatus: String(data.loanAgreementStatus),
      quantities: data.StructureQuantities,
      chronologies: data.ArrayChronologies,
      contactInformation: data.ContactInformation,
      orders: data.ArrayStrings,
      dataCreated: String(data.DateCreated),
      date: String(data.Date),
      driver: String(data.Driver),
      fiterContractor: String(data.FilterContractor),
    };
  }

  transformToTransportForTable(data: any) {
    return {
      number: String(data.number),
      status: String(data.status),
      ISR: String(data.ISR),
      document: String(data.document),
      // shippingAddress: {
      //   address: `${data.contactInformation.City}, ${data.contactInformation.Street}, ${data.contactInformation.Home}, ${data.contactInformation.Apartment}`,
      //   coordinates: `${data.contactInformation.Latitude}, ${data.contactInformation.Longitude}`,
      // },
      recipient: {
        name: String(data.contactInformation.Contractor),
        phone: String(data.contactInformation.Phone),
      },
      deliveryTime: {
        date: String(data.date),
        time: String(data.contactInformation.Date_Time_delivery),
      },
      deliveryAddress: {
        address: `${data.contactInformation.City}, ${data.contactInformation.Street}, ${data.contactInformation.Home}, ${data.contactInformation.Apartment}`,
        coordinates: `${data.contactInformation.Latitude}, ${data.contactInformation.Longitude}`,
      },
      skuWeight: ':(',


    };
  }
}


applications.viewmodel.ts:20 [Vue warn]: Maximum recursive updates exceeded in component <applications.component>. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.
warn2 @ runtime-core.esm-bundler.js:41
checkRecursiveUpdates @ runtime-core.esm-bundler.js:379
check @ runtime-core.esm-bundler.js:349
flushJobs @ runtime-core.esm-bundler.js:354
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
(anonymous) @ applications.viewmodel.ts:20
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
Show 75 more frames
Show less
