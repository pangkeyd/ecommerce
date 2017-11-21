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
                          <button class="ui violet button but_check">Checkout</button>
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
          </div>
        </div>
      </div>
    </div>

    <div class="text_slide">
      <marquee behavior="" direction="">Harga satu nya Rp 50.000,-</marquee>
    </div>

    <div class="slider">
      <!-- Set up your HTML -->
      <div class="owl-carousel">
        <div>
          <img src="https://www.transformableclothing.com/new/wp-content/uploads/2017/01/homess1.jpg" alt="">
        </div>
        <div>
          <img src="http://www.woodinfashion.com/wp-content/uploads/2016/08/collectionpagecover-1.jpg" alt="">
        </div>
        <div>
          <img src="https://cdn.shopify.com/s/files/1/0874/8574/collections/Boys_And_Girls_50_Off_Sale_Banner_b62446f2-beff-4c7f-8148-eb85eddf869e.jpg?v=1498769705" alt="">
        </div>
      </div>
    </div>

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
          <div class="ui five column grid">
            <div class="column" v-for="item in items">
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

    <footer>
      <div class="ui inverted">
        <p>Kopiitemtehmanis &copy; 2017</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState([
      'items',
      'itemsInCart',
      'itemC',
      'totalPrice'
    ])
  },
  methods: {
    ...mapActions([
      'getAllItem',
      'getItemToCart',
      'removeCart'
    ])
  },
  mounted () {
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        autoplay: true,
        responsiveClass:true
    })

    $('.ui.dropdown').dropdown();

    this.getAllItem()
  }
}
</script>

<style scoped>

</style>
