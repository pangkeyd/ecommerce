import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import IndexPage from '@/components/IndexPage'
import '@/assets/css/style.css'
import '@/assets/semantic/dist/semantic.min.css'
import '@/assets/owl-carousel/dist/assets/owl.carousel.min.css'
import '@/assets/owl-carousel/dist/assets/owl.theme.default.min.css'
import '@/assets/semantic/dist/jquery.min.js'
import '@/assets/semantic/dist/semantic.min.js'
import '@/assets/owl-carousel/dist/owl.carousel.min.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: IndexPage
    }
  ]
})
