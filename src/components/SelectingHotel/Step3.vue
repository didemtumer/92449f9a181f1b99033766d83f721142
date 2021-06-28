<template>
  <v-layout align-center justify-center class="white">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="6" class="mt-4">
          <v-form ref="form" v-model="valid" lazy-validation>
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

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Validate
            </v-btn>
          </v-form>
        </v-col>
        <v-col cols="12" sm="6" md="6" class="mt-4">
          Hello
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 30) || "Name is required",
      ],
      cardNumber: "",
      cardNumberRules: [
        (v) => !!v || "Card number is required",
        (v) => (v && v.length <= 16) || "Name is required",
      ],
      cardMonth: "",
      cardMonthRules: [
        (v) => !!v || "Expire month is required",
        (v) => (v && v <= 12) || "Expire month must be less than 12",
      ],
      cardYear: "",
      cardYearRules: [
        (v) => !!v || "Expire year is required",
        (v) =>
          (v && v >= 2021 && v <= 2040) || "Expire year must be more than 2021",
      ],
      cardCVV: "",
      cardCVVRules: [
        (v) => !!v || "Expire CVV is required",
        (v) => (v && v.length >= 3) || "CVV must be 3 character",
      ],
    };
  },
};
</script>

<style></style>
