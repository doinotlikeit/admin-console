<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-link class="navbar-brand" to="#"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-nav is-nav-bar class="d-md-down-none">
      <b-nav-item class="px-3">Dashboard</b-nav-item>
      <b-nav-item class="px-3">Users</b-nav-item>
      <b-nav-item class="px-3">Settings</b-nav-item>
    </b-nav>
    <b-nav class="ml-auto">
      <b-nav-item>
        <span class="text-center">Welcome </span>
        <span class="text-center" v-bind:text-content.prop="firstName"/>
      </b-nav-item>
    </b-nav>
    <b-nav is-nav-bar class="ml-auto">
      <b-nav-item class="d-md-down-none">
        <i class="icon-bell"></i>
        <b-badge pill variant="danger">5</b-badge>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
        <i class="icon-list"></i>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
        <i class="icon-location-pin"></i>
      </b-nav-item>
      <HeaderDropdown v-bind:user-profile="profile"/>
    </b-nav>
    &nbsp;
    &nbsp;
    <b-button size="sm" variant="primary" @click="logout()">Logout</b-button>
    <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
  </header>
</template>
<script>
  import HeaderDropdown from './HeaderDropdown.vue'
  import * as main from '@/main'

  export default {
    name: 'header',
    components: {
      HeaderDropdown
    },
    data () {
      return {
        firstName: 'Blah',
        avatarLink: 'woot',
        profile: Object
      }
    },
    created () {
      this.$on('profileRetrievedEvent', function (jsonString) {
        this.firstName = jsonString.given_name
        this.avatarLink = jsonString.picture
        this.profile = jsonString
      })
      main.retrieveShortUserProfile(this, function (component, jsonString) {
        console.log('===> Header, short profile: ' + JSON.stringify(jsonString))
        component.$emit('profileRetrievedEvent', jsonString)
      })
    },
    methods: {
      logout () {
        main.logout()
      },
      sidebarToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-hidden')
      },
      sidebarMinimize (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-minimized')
      },
      mobileSidebarToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-mobile-show')
      },
      asideToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('aside-menu-hidden')
      }
    }
  }
</script>
