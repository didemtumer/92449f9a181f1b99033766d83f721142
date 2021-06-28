<template>
  <v-layout align-center justify-center class="white">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="6" class="mt-4">
          <v-form ref="form">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="cardNumber"
              :rules="cardNumberRules"
              label="Card Number"
              v-mask="'################'"
              required
            ></v-text-field>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="cardMonth"
                  :rules="cardMonthRules"
                  label="Expire Month"
                  v-mask="'##'"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="cardYear"
                  :rules="cardYearRules"
                  label="Expire Year"
                  v-mask="'####'"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="cardCVV"
                  :rules="cardCVVRules"
                  v-mask="'###'"
                  label="CVV"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
        <v-col cols="12" sm="6" md="6" class="mt-4">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  Credit Card
                </div>
                <v-list-item-subtitle>
                  Card Number {{ cardNumber }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>Name {{ name }} </v-list-item-subtitle>
                <v-list-item-subtitle
                  >Expire Date {{ cardMonth }}/{{ cardYear }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 30) || "Name is required",
      ],
      cardNumberRules: [
        (v) => !!v || "Card number is required",
        (v) => (v && v.length <= 16) || "Name is required",
      ],
      cardMonthRules: [
        (v) => !!v || "Expire month is required",
        (v) => (v && v <= 12) || "Expire month must be less than 12",
      ],
      cardYearRules: [
        (v) => !!v || "Expire year is required",
        (v) =>
          (v && v >= 2021 && v <= 2040) ||
          "Expire year must be 2021 between 2040",
      ],
      cardCVVRules: [
        (v) => !!v || "Expire CVV is required",
        (v) => (v && v.length >= 3) || "CVV must be 3 character",
      ],
    };
  },
  computed: {
    name: {
      get() {
        return this.$store.getters.getCustomerName;
      },
      set(value) {
        this.$store.commit("setCustomerName", value);
      },
    },
    cardNumber: {
      get() {
        return this.$store.getters.getCardNumber;
      },
      set(value) {
        this.$store.commit("setCardNumber", value);
      },
    },
    cardMonth: {
      get() {
        return this.$store.getters.getCardMonth;
      },
      set(value) {
        this.$store.commit("setCardMonth", value);
      },
    },
    cardYear: {
      get() {
        return this.$store.getters.getCardYear;
      },
      set(value) {
        this.$store.commit("setCardYear", value);
      },
    },
    cardCVV: {
      get() {
        return this.$store.getters.getCardCVV;
      },
      set(value) {
        this.$store.commit("setCardCVV", value);
      },
    },
  },
};
</script>

<style></style>
