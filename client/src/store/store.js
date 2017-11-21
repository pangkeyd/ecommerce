import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

const store = new Vuex.Store({
  state: {
    items: [],
    itemsInCart: [],
    itemC: [],
    totalPrice: []
  },
  mutations: {
    setItem: function(state, payload) {
      state.items = payload
    },
    setItemInCart: function(state, payload) {
      const itemIdx = state.itemsInCart.findIndex(function(cart){
        return cart._id === payload._id
      })

      if(itemIdx === - 1){
        payload.qty = 1
        payload.base_price = payload.price
        state.itemsInCart.push(payload)
      }else{
        state.itemsInCart[itemIdx].qty += 1
        if(state.itemsInCart[itemIdx].qty > 0){
          state.itemsInCart[itemIdx].price *= state.itemsInCart[itemIdx].qty
        }
      }

      let total = []
      state.itemsInCart.forEach(r => {
        if(r._id == payload._id){
          total.push(r.price)
        }else{
          total.push(r.price)
        }
        let sum = total.reduce((x, y) => x + y)
        state.totalPrice = sum
      })

      state.itemC.push(payload)
    }
  },
  actions: {
    getAllItem: function({ commit }) {
      http.get('/item')
      .then(({data}) => {
        commit('setItem', data)
      })
    },
    getItemToCart: function({ commit }, payload) {
      http.get('/item/' + payload)
      .then(({data}) => {
        if(data.length > 0){
          data.forEach(r => {
            localStorage.setItem('zxcvbn', r._id)
            commit('setItemInCart', r)
          })
        }
      })
    }
  }
})

export default store
