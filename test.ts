<template>
  <section class="transport-requests">
    <h1 class="transport-requests__title">
      Заявки на транспорт : {{ model.transportRequests.length }}/{{  model.filteredTransportRequests.length }} 
    </h1>
    <div class="transport-requests__content">
      <filters-panel-component
        :cities="model.cities"
        :placeholder="'Введите номер заявки ...'"
        @setTimeRange="viewModel.setTimeRange($event)"
        @search="viewModel.search($event)"
        @select-city="viewModel.selectCity($event)"
        @downloadLoadersAsXLSX="viewModel.downloadLoadersAsXLSX"
      ></filters-panel-component>
      
      <div v-if="model.filteredTransportRequests.length && model.filteredTransportRequests.length">
        <table-component
          :headers="model.headersTransportRequests"
          :rows="model.filteredTransportRequests"
          :config="model.configTransportRequests"
          :currentCity="model.currentCity"
          :pagination="true"
          @goToDetailRequest="viewModel.goToTransportRequestDetail($event)"
        ></table-component>
      </div>
      <div v-if="!model.filteredTransportRequests.length && model.transportRequests.length">
        <div class="empty">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="216"
              height="215"
              viewBox="0 0 216 215"
              fill="none"
            >
              <path
                d="M18.752 96.3445C18.752 120.015 28.1549 142.715 44.8922 159.452C61.6295 176.19 84.3301 185.593 108 185.593C131.67 185.593 154.371 176.19 171.108 159.452C187.846 142.715 197.248 120.015 197.248 96.3445C197.248 72.6743 187.846 49.9737 171.108 33.2364C154.371 16.4991 131.67 7.09619 108 7.09619C84.3301 7.09619 61.6295 16.4991 44.8922 33.2364C28.1549 49.9737 18.752 72.6743 18.752 96.3445Z"
                fill="#F8F9FD"
              />
              <path
                d="M108 7.09619C90.3486 7.09619 73.0934 12.3305 58.4166 22.1372C43.7398 31.944 32.3006 45.8826 25.5456 62.1906C18.7906 78.4986 17.0232 96.4434 20.4669 113.756C23.9105 131.068 32.4106 146.971 44.8922 159.452C57.3738 171.934 73.2763 180.434 90.5888 183.878C107.901 187.321 125.846 185.554 142.154 178.799C158.462 172.044 172.401 160.605 182.207 145.928C192.014 131.251 197.248 113.996 197.248 96.3444C197.248 72.6743 187.846 49.9737 171.108 33.2364C154.371 16.4991 131.67 7.09619 108 7.09619ZM108 172.205C91.8931 172.205 76.1477 167.429 62.7551 158.48C49.3626 149.532 38.9243 136.813 32.7604 121.932C26.5965 107.051 24.9837 90.6761 28.126 74.8785C31.2684 59.0808 39.0247 44.5698 50.4142 33.1803C61.8036 21.7909 76.3147 14.0346 92.1123 10.8922C107.91 7.74988 124.285 9.36265 139.166 15.5266C154.047 21.6905 166.766 32.1287 175.714 45.5213C184.663 58.9139 189.439 74.6593 189.439 90.7664C189.439 112.365 180.859 133.08 165.586 148.353C150.314 163.625 129.599 172.205 108 172.205Z"
                fill="#F3F4F8"
              />
              <path
                opacity="0.15"
                d="M36.6016 203.442C36.6016 205.217 44.1239 206.92 57.5137 208.175C70.9036 209.431 89.0641 210.136 108 210.136C126.936 210.136 145.097 209.431 158.487 208.175C171.876 206.92 179.399 205.217 179.399 203.442C179.399 201.667 171.876 199.964 158.487 198.709C145.097 197.454 126.936 196.749 108 196.749C89.0641 196.749 70.9036 197.454 57.5137 198.709C44.1239 199.964 36.6016 201.667 36.6016 203.442Z"
                fill="#D7D8DB"
              />
              <path
                d="M18.752 96.3444C18.752 120.015 28.1549 142.715 44.8922 159.452C61.6295 176.19 84.3301 185.593 108 185.593C131.67 185.593 154.371 176.19 171.108 159.452C187.846 142.715 197.248 120.015 197.248 96.3444C197.248 72.6743 187.846 49.9737 171.108 33.2364C154.371 16.4991 131.67 7.09619 108 7.09619C84.3301 7.09619 61.6295 16.4991 44.8922 33.2364C28.1549 49.9737 18.752 72.6743 18.752 96.3444Z"
                stroke="#D7D8DB"
                stroke-width="4.46241"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M172.706 118.657C172.706 122.36 167.708 125.35 161.55 125.35C155.391 125.35 150.394 122.36 150.394 118.657C150.394 114.953 155.391 111.963 161.55 111.963C167.708 111.963 172.706 114.953 172.706 118.657Z"
                fill="#F3F4F8"
              />
              <path
                d="M43.2959 118.657C43.2959 122.36 48.2938 125.35 54.4519 125.35C60.6101 125.35 65.608 122.36 65.608 118.657C65.608 114.953 60.6101 111.963 54.4519 111.963C48.2938 111.963 43.2959 114.953 43.2959 118.657Z"
                fill="#F3F4F8"
              />
              <path
                d="M85.6885 138.737H130.313"
                stroke="#D7D8DB"
                stroke-width="4.46241"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M74.5325 98.5752H49.9893"
                stroke="#D7D8DB"
                stroke-width="4.46241"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M166.012 98.5752H141.469"
                stroke="#D7D8DB"
                stroke-width="4.46241"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <p class="empty-text">Ничего не найдено</p>
        </div>
      </div>
      <div v-if="!model.filteredTransportRequests.length && !model.transportRequests.length"
      class="skeleton"
      ></div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, Ref } from 'vue';
import { TransportRequestsModel } from './transportRequests.model';
import { TransportRequestsViewModel } from './transportRequests.viewmodel';
import TableComponent from '../../components/table/table-component.vue';
import filtersPanelComponent from './components/filters-panel/filters-panel.component.vue';
const model: Ref<TransportRequestsModel> = ref(new TransportRequestsModel());
const viewModel: Ref<TransportRequestsViewModel> = ref(
  new TransportRequestsViewModel(model.value),
);
</script>
<style scoped>
.transport-requests {
  padding: 107px 20px 40px 90px;

  width: 100%;
  /* height: 100vh; */
  background-color: #f8f9fd;
  margin-bottom: 20px;
  box-sizing: border-box;
}
.transport-requests__title {
  align-self: stretch;
  color: var(--text-dark, #23362d);
  font-family: Rubik;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
}
.wrapper-toggle-btns {
  width: 394px;
  height: 44px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.wrapper-toggle-btns-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.isActiveTab {
  color: var(--primary-light-mode-main, #00a153);
  border-bottom: 3px solid var(--primary-light-mode-main, #00a153);
}


.transport-requests__content {
  margin-top: 24px;
  padding: 0 16px 16px 16px;
  border-radius: 16px;
  height: 840px;
  border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  background: #fff;
  box-shadow:
    0px 1px 3px 0px rgba(204, 204, 204, 0.3),
    0px 4px 8px 3px rgba(204, 204, 204, 0.15);
}

.empty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
.empty-text {
  color: #b4b2b2;
  font-family: Rubik;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px;
}

.skeleton {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 16px;
  box-shadow:
    0px 1px 3px 0px rgba(204, 204, 204, 0.3),
    0px 4px 8px 3px rgba(204, 204, 204, 0.15);
}
</style>
