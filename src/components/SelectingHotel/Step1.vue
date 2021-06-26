<template>
  <v-layout align-center justify-center class="white">
    <v-container>
      <v-row>
        <v-col cols="12" style="background-color: #e9ecef">
          <v-select
            v-model="hotelItem"
            dense
            solo
            label="Rezervasyon Yapmak İstediğiniz Oteli Seçiniz"
            :items="hotelName"
          >
            <v-icon>mdi-home-search-outline</v-icon>
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <!-- Check-in -->
        <v-col cols="12" sm="6" md="3">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="checkIn"
                label="Check-in"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="checkIn"
              @input="menu = false"
              :min="new Date().toISOString().substr(0, 10)"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <!-- Check-out -->
        <v-col cols="12" sm="6" md="3">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="checkOut"
                label="Check-out"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="checkOut"
              @input="menu2 = false"
              :min="checkIn"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3" class="mt-4">
          <v-select
            label="Yetişkin Sayısı"
            v-model="adultCount"
            :items="dynamicAdultArray"
            dense
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3" class="mt-4">
          <v-select
            label="Çocuk Sayısı"
            v-model="childCount"
            :items="children"
            :disabled="hotelItem ? disabledChildStatusInput : true"
            dense
          >
          </v-select>
          <p v-if="hotelItem ? !childStatus : false">
            Çocuk Ziyaretçi Kabul Edilmiyor!
          </p>
        </v-col>
      </v-row>
    </v-container>
    <!-- {{ hotelItem ? selectedHotelDetail : "-" }} -->
    {{ hotelItem ? maxAdultSize : "-" }}
  </v-layout>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      menu: false,
      menu2: false,
      hotelItem: "",
      checkIn: new Date().toISOString().substr(0, 10),
      checkOut: new Date().toISOString().substr(0, 10),
      childCount: null,
      adultCount: null,
      adults: [],
      children: [1, 2, 3, 4, 5],
    };
  },
  computed: {
    ...mapGetters(["getHotelList", "getHotelDetails"]),
    hotelName() {
      return this.getHotelList.map((item) => item.hotel_name);
    },
    selectedHotelId() {
      let compareHotel = this.getHotelList.find((item) => {
        return item.hotel_name === this.hotelItem ? item.id : null;
      });
      let compareHotelId = compareHotel.id;
      console.log("selectedHotel", compareHotelId);
      return compareHotelId;
    },
    selectedHotelDetail() {
      let selectedHotelDetails = this.getHotelDetails.filter(
        (item) => this.selectedHotelId === item.id
      );
      console.log(selectedHotelDetails);
      return selectedHotelDetails;
    },
    childStatus() {
      console.log(this.selectedHotelDetail[0].child_status);
      return this.selectedHotelDetail[0].child_status;
    },
    maxAdultSize() {
      return this.selectedHotelDetail[0].max_adult_size;
    },

    disabledChildStatusInput() {
      if (this.childStatus) {
        return false;
      } else {
        return true;
      }
    },
    dynamicAdultArray() {
      let adultSize = [];
      if (this.hotelItem) {
        for (let i = 0; i < this.maxAdultSize; i++) {
          adultSize.push(i);
        }
      }
      return adultSize;
    },
  },
  methods: {
    ...mapActions(["loadHotelList", "loadHotelDetails"]),
  },
  created() {
    this.loadHotelList();
    this.loadHotelDetails();
  },
};
</script>
