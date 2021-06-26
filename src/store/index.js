import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hotelList: [],
    hotelDetails: []
  },
  mutations: {
    setHotelList(state, payload) {
      state.hotelList = payload;
    },
    setHotelDetails(state, payload) {
      state.hotelDetails = payload;
      console.log(payload);
    },
  },
  actions: {
    loadHotelList({ commit }) {
      axios.get(`https://5f6d939160cf97001641b049.mockapi.io/tkn/hotels`).then((response) => {
        console.log(response.data);
        let hotelList = response.data;
        commit("setHotelList", hotelList);
      })
        .catch((e) => {
          console.log("error", e);
        })
    },
    loadHotelDetails({ commit }) {
      axios.get(`https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details`).then((response) => {
        console.log("Otel Detayları", response.data);
        let hotelDetails = response.data;
        commit("setHotelDetails", hotelDetails);
      })
        .catch((e) => {
          console.log("error", e);
        })
    },
  },
  getters: {
    getHotelList(state) {
      return state.hotelList;
    },
    getHotelDetails(state) {
      return state.hotelDetails;
    }
  }

})
