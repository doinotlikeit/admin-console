<template>
  <div>please wait ...</div>
</template>

<script>
  import * as main from '../main'

  export default {
    name: 'callback',
    props: ['auth'],
    data () {
      console.log('===> Auth Callback invoked by Auth0 ...')
      main.auth.handleAuthentication(this)
      return {}
    }
  }
</script>
