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
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3" class="mt-4">
          <v-select
            label="Yetişkin Sayısı"
            v-model="adultCount"
            :items="adults"
            dense
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3" class="mt-4">
          <v-select
            label="Çocuk Sayısı"
            v-model="childCount"
            :items="children"
            dense
          >
          </v-select>
        </v-col>
      </v-row>
    </v-container>
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
      adults: [1, 2, 3, 4, 5],
      children: [1, 2, 3, 4, 5],
    };
  },
  computed: {
    ...mapGetters(["getHotelList", "getHotelDetails"]),
    hotelName() {
      return this.getHotelList.map((item) => item.hotel_name);
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
