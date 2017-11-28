<template>
  <div class="login_page">
    <div class="ui three column centered grid">
      <div class="column">
        <h2>Log In JualBeliDisini!</h2>
        <div class="ui segment">
          <form @submit.prevent="submitLogin">
            <div class="ui fluid left icon input" :class="{ 'input': true, 'error': errors.has('emailUser') }">
              <input type="text" placeholder="Email / Username" id="emailUser" name="emailUser" v-model="formLogin.fields" v-validate="'required'" autocomplete="off" autofocus>
              <i class="user icon"></i>
            </div>
            <div class="ui column error_login" v-show="errors.has('emailUser')">
              {{ errors.first('emailUser') }}
            </div>

            <div class="ui fluid left icon input" :class="{ 'input': true, 'error': errors.has('pass') }">
              <input type="password" placeholder="Password" id="passLogin" name="pass" v-model="formLogin.pass" v-validate="'required'">
              <i class="privacy icon"></i>
            </div>
            <div class="ui column error_login" v-show="errors.has('pass')">
              {{ errors.first('pass') }}
            </div>

            <button class="ui fluid blue button">Log In</button>
          </form>
          <p class="ctr_align">
            <fb></fb>
          </p>
          <p class="ctr_align">New Here? <router-link to="/account/signup">Sign Up</router-link></p>
        </div>
        <p class="ctr_align">
          <router-link to="/"> << Back to Home </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import FB from './FBLog.vue'

  export default {
    data () {
      return {
        formLogin: {
          fields: '',
          pass: ''
        }
      }
    },
    components: {
      'fb': FB
    },
    methods: {
      submitLogin: function() {
        this.$validator.validateAll({
          emailUser: this.formLogin.fields,
          pass: this.formLogin.pass
        })
        .then(result => {
          if(result){
            let validateEmail = function(email){
              let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return re.test(email)
            }
            if(validateEmail(this.formLogin.fields)){
              this.$http.get('http://104.199.239.232/signup/email/' + this.formLogin.fields)
              .then(({body}) => {
                if(body.length > 0){
                  let obj = {
                    email: body,
                    pass: this.formLogin.pass
                  }
                  this.$http.post('http://104.199.239.232/signin', {
                    email: this.formLogin.fields,
                    password: this.formLogin.pass
                  })
                  .then(({body}) => {
                    if(body == 'Wrong Username or Password!'){
                      alert(body)
                      $('#emailUser').focus()
                      this.formLogin.fields = '',
                      this.formLogin.pass = ''
                    }else{
                      this.$store.dispatch('userLogin', body)
                    }
                  })
                }else{
                  alert('Wrong Email/Username or Password!')
                  $('#emailUser').focus()
                  this.formLogin.fields = ''
                  this.formLogin.pass = ''
                }
              })
            }else{
              this.$http.get('http://104.199.239.232/signup/username/' + this.formLogin.fields)
              .then(({body}) => {
                if(body.length> 0){
                  let obj = {
                    username: body,
                    pass: this.formLogin.pass
                  }
                  this.$http.post('http://104.199.239.232/signin', {
                    username: this.formLogin.fields,
                    password: this.formLogin.pass
                  })
                  .then(({body}) => {
                    if(body == 'Wrong Username or Password!'){
                      alert(body)
                      $('#emailUser').focus()
                      this.formLogin.fields = ''
                      this.formLogin.pass = ''
                    }else{
                      this.$store.dispatch('userLogin', body)
                    }
                  })
                }else{
                  alert('Wrong Email/Username or Password!')
                  $('#emailUser').focus()
                  this.formLogin.fields = ''
                  this.formLogin.pass = ''
                }
              })
            }
          }
        })
      }
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

  .login_page .ui.fluid.left.icon.input {
    margin-bottom: 8px;
  }

  button.ui.fluid.blue.button {
    margin-bottom: 10px
  }

  .login_page {
    padding: 120px 0;
  }

  .error_login {
    color: red;
    margin-top: -8px;
    margin-bottom: 5px;
    font-size: 12px;
  }
</style>
