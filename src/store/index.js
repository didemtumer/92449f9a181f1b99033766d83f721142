import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hotelList: [],
    hotelDetails: [],
    selectedHotelDetails: [],
    hotelName: "",
    checkIn: new Date().toISOString().substr(0, 10),
    checkOut: new Date().toISOString().substr(0, 10),
    adult_number: "",
    child_number: "0"
  },
  mutations: {
    setHotelList(state, payload) {
      state.hotelList = payload;
      console.log(payload);
    },
    setHotelDetails(state, payload) {
      state.hotelDetails = payload;
      console.log("Otel Ayrıntıları", payload);
    },
    setHotelName(state, payload) {
      state.hotelName = payload;
    },
    setCheckIn(state, payload) {
      state.checkIn = payload;
    },
    setCheckOut(state, payload) {
      state.checkOut = payload;
    },
    setAdultNumber(state, payload) {
      state.adult_number = payload;
    },
    setChildNumber(state, payload) {
      state.child_number = payload;
    },
    setSelectHotelDetails(state, payload) {
      state.selectedHotelDetails = payload;
      console.log("vuex seçilen obje", payload);
    }
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
    },
    getHotelName(state) {
      return state.hotelName;
    },
    getCheckIn(state) {
      return state.checkIn;
    },
    getCheckOut(state) {
      return state.checkOut;
    },
    getAdultNumber(state) {
      return state.adult_number;
    },
    getChildNumber(state) {
      return state.child_number;
    },
    getSelectedHotelDetails(state) {
      return state.selectedHotelDetails;
    }

  }

})
