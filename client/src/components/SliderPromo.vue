<template>
  <div class="slider">
    <!-- Set up your HTML -->
    <div v-if="loading" class="ui active centered inline loader">
    </div>
    <div v-else class="owl-carousel">
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
</template>

<script>
  export default {
    data () {
      return {
        loading: true
      }
    },
    mounted () {
      setTimeout(() => {
        this.loading = false
        this.$nextTick(() => {
          $('.owl-carousel').owlCarousel({
            loop:true,
            margin:10,
            autoplay: true,
            responsiveClass:true
          })
        })
      }, 2000)
    }
  }
</script>
