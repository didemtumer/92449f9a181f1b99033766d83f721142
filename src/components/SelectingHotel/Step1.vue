<template>
  <v-layout align-center justify-center class="white">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-select
            v-model="hotelItem"
            dense
            solo
            label="Choose Your Hotel"
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
                :rules="[(v) => !!v || 'Please choose your check-oin date']"
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
                :rules="[(v) => !!v || 'Please choose your check-out date']"
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
            label="Adults"
            v-model="adultCount"
            :items="dynamicAdultArray"
            :rules="[(v) => !!v || 'Please select adult size']"
            dense
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3" class="mt-4">
          <v-select
            label="Children"
            v-model="childCount"
            :items="children"
            :disabled="hotelItem ? disabledChildStatusInput : true"
            dense
          >
          </v-select>
          <p v-if="hotelItem ? !childStatus : false">
            We don'accept children!
          </p>
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
      this.$store.commit("setSelectHotelDetails", selectedHotelDetails);
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
    hotelItem: {
      get() {
        return this.$store.getters.getHotelName;
      },
      set(value) {
        this.$store.commit("setHotelName", value);
      },
    },
    checkIn: {
      get() {
        return this.$store.getters.getCheckIn;
      },
      set(value) {
        this.$store.commit("setCheckIn", value);
      },
    },
    checkOut: {
      get() {
        return this.$store.getters.getCheckOut;
      },
      set(value) {
        this.$store.commit("setCheckOut", value);
      },
    },
    adultCount: {
      get() {
        return this.$store.getters.getAdultNumber;
      },
      set(value) {
        this.$store.commit("setAdultNumber", value);
      },
    },
    childCount: {
      get() {
        return this.$store.getters.getChildNumber;
      },
      set(value) {
        this.$store.commit("setChildNumber", value);
      },
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
