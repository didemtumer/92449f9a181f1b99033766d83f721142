<template>
  <v-container class="header">
    <v-toolbar flat color="indigo">
      <v-toolbar-title>
        <span class="header__title">Otel</span>
        <span class="header__subtitle">Rezervasyon Sistemi</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="btn-container">
        <v-btn class="btn-booking">
          <v-icon left color="indigo">
            mdi-pencil
          </v-icon>
          Yeni Rezervasyon Yap
        </v-btn>

      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script>
  export default {
    name: 'Header',

    data (){
      return{
        
      }
    }
  }
</script>
