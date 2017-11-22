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
    totalPrice: [],
    checkOut: []
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
    },
    deleteCartItem: function(state, payload) {
      const idx = state.itemsInCart.findIndex(function(cart){
        return cart._id === payload
      })

      let arr = []
      state.itemsInCart.forEach(r => {
        if(payload == r._id){
          state.totalPrice -= r.price
        }
      })

      state.itemC.forEach(s => {
        if(payload == s._id){
          arr.push(s._id)
        }
      })

      state.itemC.splice(idx, arr.length)
      state.itemsInCart.splice(idx, 1)

      if(state.itemsInCart.length === 0){
        state.itemC.length = 0
      }
    },
    setCheckOut: function(state, payload) {
      state.checkOut = payload
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
            commit('setItemInCart', r)
            alert('Masuk ke Cart!')
          })
        }
      })
    },
    removeCart: function(context, payload) {
      context.commit('deleteCartItem', payload)
    },
    checkOutCart: function(context, payload) {
      let arr = []
      let obj = {}
      context.state.itemsInCart.forEach(r => {
        arr.push(r._id)
        let split = arr.join(',')
        obj.item = split
        obj.total = payload
      })
      http.post('/checkout', obj)
      .then(({data}) => {
        http.get('/checkout/' + data._id)
        .then(({data}) => {
          context.commit('setCheckOut', data)
          $('.ui.modal.success_cart').modal('show')
          setTimeout(() => {
            $('.ui.modal.success_cart').modal('hide')
          }, 3000)
        })
      })
    }
  }
})

export default store
