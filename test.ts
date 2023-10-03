PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\frontend> npm run build

> alser.dispatcherworkplaceui@0.0.0 build
> vue-tsc && vite build

src/components/global/paginator/paginator.vue:34:37 - error TS2551: Property 'value' does not exist on type 'number'. Did you mean 'valueOf'?

34       :class="{ active: currentPage.value === page }"
                                       ~~~~~

  node_modules/typescript/lib/lib.es5.d.ts:585:5
    585     valueOf(): number;
            ~~~~~~~~~~~~~~~~~~
    'valueOf' is declared here.


Found 1 error in src/components/global/paginator/paginator.vue:34

PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\frontend>
