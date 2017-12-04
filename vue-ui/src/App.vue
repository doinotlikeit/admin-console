<template>
  <router-view :auth="auth"></router-view>
</template>

<script>
  import {auth} from './main'
  export default {
    name: 'app',
    data () {
      auth.authNotifier.on('authChange', authState => {
        auth.authenticated = authState.authenticated
        if (authState.authenticated) {
          console.log('===> App: Authenticated, redirect to /home. authenticate: ' + auth.isAuthenticated())
          this.$router.replace('/home')
        } else if (!authState.authenticated) {
          console.log('===> App: Not authenticated, redirect to /, authenticate: ' + auth.isAuthenticated())
          this.$router.replace('/')
        }
      })
      return {
        auth
      }
    },
    methods: {},
    created: function () {
      console.log('===> App component created ...')
    }
}
</script>

<style>
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
