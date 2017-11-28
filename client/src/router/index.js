import Vue from 'vue'
import Router from 'vue-router'
import VeeValidate from 'vee-validate'
import FBSignInButton from 'vue-facebook-signin-button'
import VueResource from 'vue-resource'
import VuePaginate from 'vue-paginate'

import HelloWorld from '@/components/HelloWorld'
import IndexPage from '@/components/IndexPage'
import Login from '@/components/AccountLoginPage'
import SignUp from '@/components/AccountRegisPage'
import Shop from '@/components/MyShop'
import Paging from '@/components/Pagination'

import '@/assets/css/style.css'
import '@/assets/semantic/dist/semantic.min.css'
import '@/assets/owl-carousel/dist/assets/owl.carousel.min.css'
import '@/assets/owl-carousel/dist/assets/owl.theme.default.min.css'
import '@/assets/semantic/dist/jquery.min.js'
import '@/assets/semantic/dist/semantic.min.js'
import '@/assets/owl-carousel/dist/owl.carousel.min.js'

Vue.use(Router)
Vue.use(FBSignInButton)
Vue.use(VeeValidate)
Vue.use(VueResource)
Vue.use(VuePaginate)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: IndexPage
    },
    {
      path: '/account/login',
      name: 'login',
      component: Login,
      meta: {
        'title': 'TEST'
      }
    },
    {
      path: '/account/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/shop/my_shop',
      name: 'my_shop',
      component: Shop
    },
    {
      path: '/test',
      name: 'test',
      component: Paging
    }
  ]
})

console.log('Hayo mau cari apa disini?')
