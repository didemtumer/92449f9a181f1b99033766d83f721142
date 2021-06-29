<template>
  <div>
    <v-app-bar class="mb-15" app color="indigo">
      <Header />
    </v-app-bar>
    <v-main tag="main" class="hotel-details-container mt-15">
      <v-row align="center">
        <v-col cols="6" offset="3">
          <v-card class="detail-card">
            <v-icon class="detail-card__icon" large color="blue darken-2">
              mdi-calendar-multiple-check</v-icon
            >
            <v-card-title class="detail-card__title"
              >Rezervasyon Kaydınız Alınmıştır</v-card-title
            >
            <v-row align="center" justify="space-around">
              <v-btn depressed color="primary">
                New Booking
              </v-btn>
              <v-btn depressed color="primary">
                Update Booking
              </v-btn>
              <v-btn depressed color="primary">
                Cancel Booking
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
    <v-main class="mx-15">
      <h1>{{ getHotelName }}/ {{ selectedCity }}</h1>
      <v-row class="booking-info">
        <v-col cols="6">
          <v-card>
            <v-card-subtitle>Check-in</v-card-subtitle>
            <v-card-text>{{ getCheckIn }}</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-card-subtitle>Check-out</v-card-subtitle>
            <v-card-text>{{ getCheckOut }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card>
            <v-card-subtitle>Adults</v-card-subtitle>
            <v-card-text>{{ getAdultNumber }}</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-card-subtitle>Childeren</v-card-subtitle>
            <v-card-text>{{ getChildNumber }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card>
            <v-card-subtitle>Room Type</v-card-subtitle>
            <v-card-text>{{ getPickedRoomType }}</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-card-subtitle>Scenis Type</v-card-subtitle>
            <v-card-text>{{ getPickedRoomScenic }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-subtitle>Price</v-card-subtitle>
            <v-card-text>{{ getPrice }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </div>
</template>

<script>
import Header from "../components/Header";
import { mapGetters } from "vuex";
export default {
  components: {
    Header,
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
    selectedCity() {
      return this.getSelectedHotelDetails[0].city;
    },
  },
};
</script>

<style></style>
