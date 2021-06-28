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
              @on-complete="onComplete"
              shape="circle"
              class="blue lighten-4 wizard"
              color="#1565C0"
              title
              subtitle
              stepSize="sm"
              ref="wizard"
              error-color="red"
            >
              <tab-content
                v-for="tab in tabs"
                :key="tab.id"
                :title="tab.title"
                :before-change="tab.beforeChange"
              >
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
import axios from "axios";
import Header from "./components/Header";
import Step1 from "./components/SelectingHotel/Step1.vue";
import Step2 from "./components/SelectingHotel/Step2.vue";
import Step3 from "./components/SelectingHotel/Step3.vue";
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters([
      "getAdultNumber",
      "getHotelName",
      "getPickedRoomType",
      "getPickedRoomScenic",
      "getSelectedHotelDetails",
      "getCheckIn",
      "getCheckOut",
      "getChildNumber",
      "getPrice",
      "getCustomerName",
      "getCardNumber",
      "getCardMonth",
      "getCardYear",
      "getCardCVV",
    ]),
  },
  methods: {
    validateStep1: function() {
      return new Promise((resolve, reject) => {
        if (this.getHotelName && this.getAdultNumber) {
          /*    console.log("Color: ", this.getColorSelected); */
          resolve(true);
        } else {
          this.dialog = true;
          reject();
        }
      });
    },
    validateStep2: function() {
      return new Promise((resolve, reject) => {
        if (this.getPickedRoomType && this.getPickedRoomScenic) {
          /*    console.log("Color: ", this.getColorSelected); */
          resolve(true);
        } else {
          this.dialog = true;
          reject();
        }
      });
    },
    onComplete() {
      axios
        .post(
          "https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings",
          {
            hotel_id: this.getSelectedHotelDetails[0].hotel_id,
            start_date: this.getCheckIn,
            end_date: this.getCheckOut,
            adult: this.getAdultNumber,
            child: this.getChildNumber === "" ? null : this.getChildNumber,
            room_type: this.getPickedRoomType,
            room_scnic: this.getPickedRoomScenic,
            price: this.getPrice,
            coupon_code: "CODE100",
            card_name: this.getCustomerName,
            card_number: this.getCardNumber,
            card_date_month: this.getCardMonth,
            card_date_year: this.getCardYear,
            card_cvv: this.getCardCVV,
          }
        )
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>
