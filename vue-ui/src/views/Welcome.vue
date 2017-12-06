<template>
  <b-jumbotron class="col text-center" fluid header="Welcome" lead="Demo App">
    <hr class="col-xs-12">
    <p/>
    <p/>
    <div class="col text-center">
      <p>Please login to continue</p>
      <b-btn variant="primary" @click="auth.login()">Login</b-btn>
    </div>
  </b-jumbotron>
</template>

<script>
  export default {
    name: 'Welcome',
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
