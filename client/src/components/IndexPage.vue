<template>
  <div class="index_page">
    <div class="menu_header">
      <div class="ui inverted menu">
        <div class="ui container">
          <a class="item logo_web">
            JualBeliDisini!
          </a>
          <a class="item">
            Home
          </a>
          <a class="item">
            Messages
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
                          <img :src="'../static/image_item/' + itemCart.image" alt="" width="70">
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
            <a class="item">
              <i class="icon user"></i>
              <div class="ui dropdown">
                Account
                <i class="icon dropdown"></i>
                <div class="menu">
                  <div class="item">
                    <router-link to="/admin/login" style="color: black">Login</router-link>
                  </div>
                  <div class="item">
                    <router-link to="/admin/register" style="color: black">Register</router-link>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="text_slide">
      <marquee behavior="" direction="">Harga satu nya Rp 50.000,-</marquee>
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
                      <img :src="'../static/image_item/' + item.image" alt="">
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
                  <div class="item">
                    <div class="right floated content">
                      <div class="ui mini green button">Buy</div>
                    </div>
                    <img class="ui avatar image" src="https://dvfnvgxhycwzf.cloudfront.net/media/SharedImage/image300/.fiQX894V/SharedImage-75312.jpg?t=47c4cfc6ff4dc834e703">
                    <div class="content">
                      <p>Queen</p>
                      <p>Rp 1.000,-</p>
                    </div>
                  </div>
                  <div class="item">
                    <div class="right floated content">
                      <div class="ui mini green button">Buy</div>
                    </div>
                    <img class="ui avatar image" src="https://cdn.shopify.com/s/files/1/2226/0995/products/unnamed-4_300x300.jpg?v=1501759701">
                    <div class="content">
                      <p>High Times</p>
                      <p>Rp 1.000,-</p>
                    </div>
                  </div>
                  <div class="item">
                    <div class="right floated content">
                      <div class="ui mini green button">Buy</div>
                    </div>
                    <img class="ui avatar image" src="https://bartlettsfarm.com/wp-content/uploads/2017/04/Corn-Tom-Ack-Mens_Front-300x300.jpg">
                    <div class="content">
                      <p>Tomatoes</p>
                      <p>Rp 1.000,-</p>
                    </div>
                  </div>
                  <div class="item">
                    <div class="right floated content">
                      <div class="ui mini green button">Buy</div>
                    </div>
                    <img class="ui avatar image" src="https://dvfnvgxhycwzf.cloudfront.net/media/SharedImage/image300/.fiQX894V/SharedImage-75312.jpg?t=47c4cfc6ff4dc834e703">
                    <div class="content">
                      <p>Queen</p>
                      <p>Rp 1.000,-</p>
                    </div>
                  </div>
                  <div class="item">
                    <div class="right floated content">
                      <div class="ui mini green button">Buy</div>
                    </div>
                    <img class="ui avatar image" src="https://cdn.shopify.com/s/files/1/2226/0995/products/unnamed-4_300x300.jpg?v=1501759701">
                    <div class="content">
                      <p>High Times</p>
                      <p>Rp 1.000,-</p>
                    </div>
                  </div>
                  <div class="item">
                    <div class="right floated content">
                      <div class="ui mini green button">Buy</div>
                    </div>
                    <img class="ui avatar image" src="https://bartlettsfarm.com/wp-content/uploads/2017/04/Corn-Tom-Ack-Mens_Front-300x300.jpg">
                    <div class="content">
                      <p>Tomatoes</p>
                      <p>Rp 1.000,-</p>
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
                    <img :src="'../static/image_item/' + item.image" alt="">
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

    <footer>
      <div class="ui inverted">
        <p>Kopiitemtehmanis &copy; 2017</p>
      </div>
    </footer>

    <div class="ui modal success_cart">
      <i class="close icon"></i>
      <div class="header">
        Checkout
      </div>
      <div class="content" v-for="ck in checkOut">
        <div class="description">
          <p v-for="ckID in ck.itemID">
            <span>Item: {{ ckID.name }}</span>
            <span>
              <img :src="'../static/image_item/' + ckID.image" width="100" alt="">
            </span>
          </p>
          <p>Total Price: {{ ck.total_price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PromoSlider from './SliderPromo.vue'

export default {
  data () {
    return {
      loading: true
    }
  },
  components: {
    'slider': PromoSlider
  },
  computed: {
    ...mapState([
      'items',
      'itemsInCart',
      'itemC',
      'totalPrice',
      'checkOut'
    ])
  },
  methods: {
    ...mapActions([
      'getAllItem',
      'getItemToCart',
      'removeCart',
      'checkOutCart'
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

    $('.ui.dropdown').dropdown();

    this.getAllItem()
  }
}
</script>

<style scoped>

</style>
