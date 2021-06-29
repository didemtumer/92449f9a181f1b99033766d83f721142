<template>
  <v-container class="header">
    <v-toolbar flat color="indigo">
      <v-toolbar-title>
        <span class="header__title">Hote</span>
        <span class="header__subtitle">Reservasion Siystem</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="btn-container">
        <v-btn class="btn-booking" @click="newBooking">
          <v-icon left color="indigo">
            mdi-pencil
          </v-icon>
          New Booking
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {};
  },
  methods: {
    newBooking() {
      console.log("tıklandı");
      this.$emit("newBookingPage");
    },
  },
};
</script>
