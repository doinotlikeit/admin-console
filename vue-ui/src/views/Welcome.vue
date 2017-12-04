<template>
  <b-jumbotron class="col text-center" fluid header="Welcome" lead="Demo App">
    <hr class="col-xs-12">
    <p/>
    <p/>
    <div class="col text-center">
      <p>You can login using LinkedIn credentials</p>
      <b-btn variant="primary" @click="auth.login()">Login</b-btn>
    </div>
  </b-jumbotron>
</template>

<script>
  import BaseComponent from '@/components/BaseComponent'

  export default {
    name: 'Welcome',
    extends: BaseComponent,
    props: ['auth'],
    data () {
      return {}
    },
    methods: {},
    created: function () {
      console.log('===> Welcome view created ...')
    }
  }
</script>

<style>
</style>
