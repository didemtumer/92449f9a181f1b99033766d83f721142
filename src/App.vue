<template>
  <v-app>
    <v-app-bar app color="indigo">
      <Header />
    </v-app-bar>

    <v-main tag="main" class="mt-15">
      <v-row>
        <v-col md="12" lg="8" xl="8" offset-lg="2" offset-xl="2">
          <v-card class="mx-auto" max-height="50" flat tile>
            <form-wizard
              shape="circle"
              class="blue lighten-4 wizard"
              color="#1565C0"
              title
              subtitle
              stepSize="sm"
              ref="wizard"
              error-color="red"
            >
              <tab-content v-for="tab in tabs" :key="tab.id" :title="tab.title">
                <component
                  :is="(selectedComponent = tab.component)"
                ></component>
              </tab-content>
              <v-btn color="primary" slot="prev">Back</v-btn>
              <v-btn color="primary" slot="next">Next</v-btn>

              <v-btn color="primary" slot="finish">Finish</v-btn>
              <transition mode="out-in"></transition>
            </form-wizard>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Step1 from "./components/SelectingHotel/Step1.vue";
import Step2 from "./components/SelectingHotel/Step2.vue";
import Step3 from "./components/SelectingHotel/Step3.vue";

export default {
  name: "App",

  components: {
    Header,
    Step1,
    Step2,
    Step3,
  },

  data() {
    return {
      selectedComponent: "Step1",
      tabs: [
        {
          id: "1",
          title: "Otel ve Tarih Seçimi",
          icon: "ti-user",
          component: "Step1",
          beforeChange: this.validateStep1,
        },
        {
          id: "2",
          title: "Oda Tipi ve Manzara Seçimi",
          icon: "ti-settings",
          component: "Step2",
          beforeChange: this.validateStep2,
        },
        {
          id: "3",
          title: "Önizleme ve Ödeme İşlemleri",
          icon: "ti-location-pin",
          component: "Step3",
        },
      ],
    };
  },
};
</script>
