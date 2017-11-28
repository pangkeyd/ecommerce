<template>
  <fb-signin-button
    :params="fbSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    <i class="facebook f icon"></i>
    Log in with Facebook
  </fb-signin-button>
</template>

<script>
  export default {
    data () {
      return {
        fbSignInParams: {
          scope: 'email,user_likes',
          return_scopes: true
        }
      }
    },
    methods: {
      onSignInSuccess (response) {
        FB.api('/me', {
          fields: 'name, email, id'
        }, dude => {
          this.$store.dispatch('fbLogin', dude)
        })
      },
      onSignInError (error) {
        alert('Failed Login!')
      }
    }
  }
</script>

<style>
  .fb-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #4267b2;
    color: #fff;
    cursor: pointer;
  }
</style>
