import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import jwt from 'jsonwebtoken'

Vue.use(Vuex)

const http = axios.create({
  baseURL: 'http://104.199.239.232'
})

const store = new Vuex.Store({
  state: {
    items: [],
    itemsInCart: [],
    itemC: [],
    totalPrice: [],
    checkOut: [],
    user: [],
    storage: [],
    itemByUser: [],
    loading: false,
    itemById: [],
    storageEdit: []
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

      for(let i = 0; i < state.itemC.length; i++){
        state.itemC.splice(i, state.itemC.length)
      }

      state.itemsInCart = []
    },
    newUser: function(state, payload) {
      state.users = payload
    },
    getStorage: function(state, payload) {
      state.storage = payload
    },
    setItemByUser: function(state, payload) {
      state.itemByUser = payload
    },
    saveItem: function(state, payload) {
      state.itemByUser.push(payload)
    },
    removeItem: function(state, payload) {
      const idx = state.itemByUser.findIndex(function(item){
        return item._id === payload
      })

      state.itemByUser.splice(idx, 1)
    },
    storageEdit: function(state, payload) {
      state.storageEdit = payload
    },
    updatedItem: function(state, payload) {
      const idx = state.itemByUser.findIndex(function(item){
        return item._id === localStorage.tgb
      })

      state.itemByUser.splice(idx, 1, payload[0])
      localStorage.removeItem('edc')
      localStorage.removeItem('rfv')
      localStorage.removeItem('tgb')
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
        console.log(data)
        http.get('/checkout/' + data._id)
        .then(({data}) => {
          console.log(data)
          context.commit('setCheckOut', data)
          $('.ui.modal.success_cart').modal('show')
          setTimeout(() => {
            $('.ui.dropdown.cart_item').dropdown('hide')
          }, 3000)
        })
      })
    },
    userRegister: function(context, payload) {
      http.post('/signup', payload)
      .then(({data}) => {
        context.commit('newUser', data)
        alert('Success SignUp')
        router.push('/account/login')
      })
    },
    userLogin: function(context, payload) {
      localStorage.setItem('qwerty', payload)
      router.push('/')
    },
    setStorage: function(context, payload) {
      let decoded = jwt.decode(localStorage.qwerty)
      if(decoded){
        localStorage.setItem('asdfgh', decoded.username)
      }
      context.commit('getStorage', decoded)
    },
    logout: function(context, payload) {
      localStorage.clear()
      context.state.storage = ''
      router.push('/')
    },
    fbLogin: function(context, payload) {
      http.post('/signup', {
        email: payload.id,
        username: payload.name,
        password: payload.id
      })
      .then(({data}) => {
        if(data == `Email '${payload.id}' already used!`){
          http.post('/signin', {
            email: payload.id,
            password: payload.id
          })
          .then(({data}) => {
            localStorage.setItem('qwerty', data)
            alert('Success Login!')
            router.push('/')
          })
        }
      })
    },
    getItemByUser: function(context, payload) {
      if(context.state.storage){
        http.get('/item/user/' + context.state.storage.username, {
          headers: {
            'token': localStorage.qwerty
          }
        })
        .then(({data}) => {
          context.commit('setItemByUser', data)
        })
      }
    },
    postItem: function(context, payload) {
      context.state.loading = true
      let data = new FormData()
      data.append('name', payload.name)
      data.append('price', payload.price)
      data.append('image', payload.image)
      data.append('author', payload.author)
      http.post('/item', data, {
        headers: {
          'token': localStorage.qwerty
        }
      })
      .then(({data}) => {
        if(data){
          setTimeout(() => {
            context.state.loading = false
            context.commit('saveItem', data)
          })
        }
      })
    },
    deleteItem: function(context, payload) {
      http.delete('/item/' + payload, {
        headers: {
          'token': localStorage.qwerty
        }
      })
      .then(({data}) => {
        context.commit('removeItem', payload)
        $(`#${payload}.ui.mini.modal.delete_item`).modal('hide')
      })
    },
    editItem: function(context, payload) {
      http.get('/item/' + payload)
      .then(({data}) => {
        if(data.length > 0){
          data.forEach(r => {
            localStorage.setItem('qaz', r.name)
            localStorage.setItem('wsx', r.price)
            localStorage.setItem('edc', r.image)
            localStorage.setItem('rfv', r.author)
            localStorage.setItem('tgb', r._id)
            $(`#${payload}.ui.mini.modal.edit_item`).modal('hide')
            let obj = {
              id: localStorage.tgb,
              name: localStorage.qaz,
              price: localStorage.wsx,
              image: localStorage.edc,
              author: localStorage.rfv
            }
            context.commit('storageEdit', obj)
          })
        }
      })
    },
    updateItem: function(context, payload) {
      context.state.loading = true
      let data = new FormData()
      data.append('name', payload.name)
      data.append('price', payload.price)
      data.append('image', payload.image)
      data.append('author', payload.author)
      http.put('/item/update/' + localStorage.tgb, data, {
        headers: {
          'token': localStorage.qwerty
        }
      })
      .then(({data}) => {
        if(data){
          context.state.loading = false
          context.commit('updatedItem', data)
        }
      })
    }
  }
})

export default store
