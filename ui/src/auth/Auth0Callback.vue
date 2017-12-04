<template>
  <div>please wait ...</div>
</template>

<script>
  import BaseComponent from '@/components/BaseComponent'

  export default {
    name: 'callback',
    extends: BaseComponent,
    props: ['auth'],
    data () {
      console.log('===> Auth Callback invoked by Auth0 ...')
      this.auth.handleAuthentication(this.handleAuthError)
      return {}
    }
  }
</script>

<style>
  .spinner {
    position: absolute;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: white;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
