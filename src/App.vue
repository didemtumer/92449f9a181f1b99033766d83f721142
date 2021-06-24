<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <Header/>
    </v-app-bar>

    <v-main>
      <h1 class="helloTitle">Hello</h1>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header';

export default {
  name: 'App',

  components: {
    Header,
  },

  data () {
    return{}
  }
};
</script>
