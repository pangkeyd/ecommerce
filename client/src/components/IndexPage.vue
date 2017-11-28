<template>
  <div class="index_page">
    <div class="content">
      <navbar></navbar>

      <div class="text_slide">
        <marquee behavior="" direction="">Selamat Datang di JualBeliDisini!</marquee>
      </div>

      <slider></slider>

      <div class="sale_content new_collections">
        <div class="ui container">
          <div class="row">
            <div class="row border_bot">
              <h2>New Collections!</h2>
            </div>
          </div>
          <div class="row">
            <div class="ui grid">
              <div class="ten wide column">
                <div class="ui three column grid">
                  <div class="row">
                    <div class="column" v-for="item in items">
                      <div class="ui segment">
                        <img :src="item.image" alt="">
                        <p>{{ item.name }}</p>
                        <p>Rp {{ item.price }}</p>
                        <button @click="getItemToCart(item._id)" class="ui fluid green button buy_item">
                          Buy
                          <i class="add to cart icon"></i>
                        </button>

                        <div class="ui basic modal collect_card">
                          <div class="ui icon header">
                            <i class="archive icon"></i>
                            Archive Old Messages
                          </div>
                          <div class="content">
                            <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
                          </div>
                          <div class="actions">
                            <div class="ui red basic cancel inverted button">
                              <i class="remove icon"></i>
                              No
                            </div>
                            <div class="ui green ok inverted button">
                              <i class="checkmark icon"></i>
                              Yes
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="six wide column">
                <div class="row">
                  <div class="ui middle aligned divided list">
                    <div class="item" v-for="(item, index) in items" :key="index">
                      <div class="right floated content">
                        <div @click="getItemToCart(item._id)" class="ui mini green button">Buy</div>
                      </div>
                      <img class="ui avatar image" :src="item.image">
                      <div class="content">
                        <p>{{ item.name }}</p>
                        <p>Rp {{ item.price }},-</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sale_content sale">
        <div class="ui container">
          <div class="row">
            <h2>Sale Item!</h2>
          </div>
          <div class="row">
            <div v-if="loading" class="ui active centered inline loader">
            </div>
            <div v-else class="ui five column grid">
              <div class="owl-carousel owl-theme">
                <div class="item" v-for="item in items">
                  <div class="column">
                    <div class="ui segment">
                      <img :src="item.image" alt="">
                      <p>{{ item.name }}</p>
                      <p>Rp {{ item.price }},-</p>
                      <p class="ui fluid green button">
                        Buy
                        <i class="add to cart icon"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ui modal success_cart">
      <i class="close icon"></i>
      <div class="header">
        Checkout
      </div>
      <div class="content" v-for="ck in checkOut">
        <div class="ui grid">
          <div class="ui four column grid">
            <div class="column" v-for="ckID in ck.itemID">
              <p>
                <span>Item: {{ ckID.name }}</span>
              </p>
              <p>
                <span>
                  <img :src="ckID.image" width="100" alt="">
                </span>
              </p>
            </div>
          </div>
        </div>
        <p style="font-weight: bold">Total Price: {{ ck.total_price }}</p>
      </div>
    </div>

    <footer-el></footer-el>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PromoSlider from './SliderPromo.vue'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

export default {
  data () {
    return {
      loading: true
    }
  },
  components: {
    'navbar': Navbar,
    'slider': PromoSlider,
    'footer-el': Footer
  },
  computed: {
    ...mapState([
      'items',
      'checkOut'
    ])
  },
  methods: {
    ...mapActions([
      'getAllItem',
      'getItemToCart',
      'removeCart',
      'checkOutCart',
      'setStorage'
    ])
  },
  mounted () {
    setTimeout(() => {
      this.loading = false
      this.$nextTick(() => {
        $(this.$el).find('.owl-carousel.owl-theme').owlCarousel({
          loop:true,
          margin:10,
          autoplay: true,
          responsive:{
            0:{
              items:1
            },
            600:{
              items:3
            },
            1000:{
              items:5
            }
          }
        })
      })
    }, 2000)

    this.getAllItem()
    this.setStorage()
  }
}
</script>

<style scoped>

</style>
