<template>
  <div class="regis_page">
    <div class="ui three column centered grid">
      <div class="column">
        <h2>Sign Up JualBeliDisini!</h2>
        <div class="ui segment">
          <form @submit.prevent="submitRegister">
            <div class="ui fluid left icon input" :class="{ 'input': true, 'error': errors.has('email') }">
              <input type="text" placeholder="Email" autocomplete="off" name="email" v-model="formRegister.email" v-validate="'required|email|email-unique'" autofocus>
              <i class="mail icon"></i>
            </div>
            <div class="ui column error_regis" v-show="errors.has('email')">
              {{ errors.first('email') }}
            </div>

            <div class="ui fluid left icon input" :class="{ 'input': true, 'error': errors.has('username') }">
              <input type="text" placeholder="Username" autocomplete="off" name="username" v-model="formRegister.username" v-validate="'required|min:8|regex:^[a-zA-Z0-9-_]+$|user-unique'">
              <i class="user icon"></i>
            </div>
            <div class="ui column error_regis" v-show="errors.has('username')">
              {{ errors.first('username') }}
            </div>

            <div class="ui fluid left icon input" :class="{ 'input': true, 'error': errors.has('password') }">
              <input type="password" placeholder="Password" name="password" v-model="formRegister.password" v-validate="'required|min:8'">
              <i class="privacy icon"></i>
            </div>
            <div class="ui column error_regis" v-show="errors.has('password')">
              {{ errors.first('password') }}
            </div>

            <div class="ui fluid left icon input" :class="{ 'input': true, 'error': errors.has('confirmPassword') }">
              <input type="password" placeholder="Confirm Password" name="confirmPassword" v-validate="'required|confirmed:password'">
              <i class="privacy icon"></i>
            </div>
            <div class="ui column error_regis" v-show="errors.has('confirmPassword')">
              {{ errors.first('confirmPassword') }}
            </div>

            <button class="ui fluid blue button">Sign Up</button>
          </form>
          <p class="ctr_align">Already Have an Acount? <router-link to="/account/login">Log In</router-link></p>
        </div>
        <p class="ctr_align">
          <router-link to="/"> << Back to Home </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { Validator } from 'vee-validate'

  export default {
    data () {
      return {
        formRegister: {
          email: '',
          username: '',
          password: ''
        }
      }
    },
    methods: {
      submitRegister: function() {
        this.$validator.validateAll({
          email: this.formRegister.email,
          username: this.formRegister.username,
          password: this.formRegister.password,
          confirmPassword: this.formRegister.password
        })
        .then(result => {
          if(result){
            this.$store.dispatch('userRegister', this.formRegister)
          }
        })
      }
    },
    created () {
      const uniqueEmail = value => new Promise((resolve) => {
        this.$http.get('http://104.199.239.232/signup/email/' + value)
        .then(({body}) => {
          if(body.length > 0){
            if(value !== body[0].email){
              return resolve({
                valid: true
              })
            }

            return resolve({
              valid: false,
              data: {
                message: `Email '${value}' is already used!`
              }
            })
          }else{
            return resolve({
              valid: true
            })
          }
        })
      })

      Validator.extend('email-unique', {
        validate: uniqueEmail,
        getMessage: (fields, params, data) => data.message
      })

      const uniqueUser = value => new Promise((resolve) => {
        this.$http.get('http://104.199.239.232/signup/username/' + value)
        .then(({body}) => {
          if(body.length > 0){
            if(value !== body[0].username){
              return resolve({
                valid: true
              })
            }

            return resolve({
              valid: false,
              data: {
                message: `Username '${value}' is already used!`
              }
            })
          }else{
            return resolve({
              valid: true
            })
          }
        })
      })

      Validator.extend('user-unique', {
        validate: uniqueUser,
        getMessage: (fields, params, data) => data.message
      })
    }
  }
</script>

<style scoped>
  h2 {
    text-align: center
  }

  .ctr_align {
    text-align: center
  }

  .regis_page .ui.fluid.left.icon.input {
    margin-bottom: 8px;
  }

  button.ui.fluid.blue.button {
    margin-bottom: 10px
  }

  .regis_page {
    padding: 120px 0;
  }

  .error_regis {
    color: red;
    margin-top: -8px;
    margin-bottom: 5px;
    font-size: 12px;
  }
</style>
