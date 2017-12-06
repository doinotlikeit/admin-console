<template>
  <div>
    <simplert></simplert>
    <router-view :auth="main.auth"></router-view>
  </div>
</template>

<script>
  import * as main from './main'

  export default {
    name: 'app',
    data () {
      main.auth.authNotifier.on('authChange', authState => {
        main.auth.authenticated = authState.authenticated
        if (authState.authenticated) {
          console.log('===> App: Authenticated, redirect to /home. authenticate: ' + main.auth.isAuthenticated())
          this.$router.replace('/home')
        } else if (!authState.authenticated) {
          console.log('===> App: Not authenticated(logged out?), redirect to /welcome, authenticate: ' + main.auth.isAuthenticated())
          this.$router.replace('/welcome')
        }
      })
      return {
        main
      }
    },
    methods: {},
    created: function () {
      console.log('===> App component created ...')
    }
  }
</script>

<style lang="scss">
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/css/font-awesome.min.css';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/css/simple-line-icons.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
</style>
<style lang="scss">
  // Import Main styles for this application
  @import './scss/style';
</style>
