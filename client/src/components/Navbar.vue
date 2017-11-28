<template>
  <div class="menu_header">
    <div class="ui inverted menu">
      <div class="ui container">
        <a class="item logo_web">
          JualBeliDisini!
        </a>
        <a class="item">
          <router-link to="/">Home</router-link>
        </a>
        <a class="item" v-if="storage">
          <router-link to="/shop/my_shop">My Shop</router-link>
        </a>
        <div class="right menu">
          <a class="item">
            <div class="ui inline dropdown cart_item">
              <div class="text">
                <i class="in cart icon"></i>: {{ itemC.length }} Items
              </div>
              <i class="dropdown icon"></i>
              <div class="menu" v-if="itemsInCart.length > 0">
                <div class="ui message">
                  <div class="row" v-for="itemCart in itemsInCart">
                    <div class="ui two column grid">
                      <div class="column">
                        <button class="ui mini red button" @click="removeCart(itemCart._id)">
                          <i class="icon remove"></i>
                        </button>
                        <img :src="itemCart.image" alt="" width="70">
                      </div>
                      <div class="column">
                        <p>{{ itemCart.qty }} pcs <span>{{ itemCart.name }}</span></p>
                        <p>Rp {{ itemCart.price }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="ui two column grid total_sale">
                      <div class="row">
                        <div class="column">
                          <span>Total:</span>
                        </div>
                        <div class="column">
                          <span>Rp {{ totalPrice }}</span>
                        </div>
                      </div>
                      <div class="row">
                        <button class="ui violet button but_check" @click="checkOutCart(totalPrice)">Checkout</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="menu" v-else>
                <div class="ui message">
                  Gak ada Item, beli dulu!
                </div>
              </div>
            </div>
          </a>
          <a class="item" v-if="storage">
            <i class="icon user"></i>
            <div class="ui dropdown">
              {{ storage.username }}
              <i class="icon dropdown"></i>
              <div class="menu">
                <div class="item">
                  <a @click="logout" style="color: black">Logout</a>
                </div>
              </div>
            </div>
          </a>
          <a class="item" v-else>
            <i class="icon user"></i>
            <div class="ui dropdown">
              Account
              <i class="icon dropdown"></i>
              <div class="menu">
                <div class="item">
                  <router-link to="/account/login" style="color: black">Login</router-link>
                </div>
                <div class="item">
                  <router-link to="/account/signup" style="color: black">Register</router-link>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'itemsInCart',
        'itemC',
        'totalPrice',
        'storage'
      ])
    },
    methods: {
      ...mapActions([
        'removeCart',
        'logout',
        'checkOutCart',
        'getItemToCart'
      ])
    },
    mounted () {
      $('.ui.dropdown').dropdown('refresh');
    }
  }
</script>
