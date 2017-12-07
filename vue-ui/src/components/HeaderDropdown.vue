<template>
  <div>
    <b-nav-item-dropdown right no-caret>
      <template slot="button-content">
        <img v-bind:src="userProfile.picture">
      </template>
      <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-bell-o"></i> Updates
        <b-badge variant="info">{{itemsCount}}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-envelope-o"></i> Messages
        <b-badge variant="success">{{itemsCount}}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-tasks"></i> Tasks
        <b-badge variant="danger">{{itemsCount}}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-comments"></i> Comments
        <b-badge variant="warning">{{itemsCount}}</b-badge>
      </b-dropdown-item>
      <b-dropdown-header tag="div" class="text-center"><strong>Settings</strong></b-dropdown-header>
      <b-dropdown-item @click="retrieveFullProfile()"><i class="fa fa-user"></i> Profile</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-wrench"></i> Settings</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-usd"></i> Payments
        <b-badge variant="default">{{itemsCount}}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-file"></i> Projects
        <b-badge variant="primary">{{itemsCount}}</b-badge>
      </b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item><i class="fa fa-shield"></i> Lock Account</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-lock"></i> Logout</b-dropdown-item>
    </b-nav-item-dropdown>
    <b-modal title="LinkedIn Profile" size="lg" ok-only center v-model="showProfileModal">
      <!--<b-list-group>-->
      <!--<b-list-group-item active>-->
      <!--<div class="container">-->
      <!--<div class="row">-->
      <!--<div class="col">-->
      <!--<h2>{{ userProfile.name }}</h2>-->
      <!--</div>-->
      <!--<div class="col">-->
      <!--<img class="float-right" v-bind:src="userProfile.picture"/>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</b-list-group-item>-->
      <!--<b-list-group-item>-->
      <!--{{ fullUserProfile.headline }}-->
      <!--</b-list-group-item>-->
      <!--</b-list-group>-->
      <b-media no-body>
        <b-media-aside vertical-align="center">
          <b-img slot="aside" alt="placeholder" v-bind:src="userProfile.picture"/>
        </b-media-aside>
        <b-media-body class="ml-3">
          <h5 class="mt-0">{{ userProfile.name }}</h5>
          <b-list-group>
            <b-list-group-item active>
              <h6>{{ fullUserProfile.headline }}</h6>
            </b-list-group-item>
            <b-list-group-item>
              {{ fullUserProfile.summary }}
            </b-list-group-item>
            <b-list-group-item>
              <div class="container">
                <div class="row">
                  <div class="col">
                    Location:
                  </div>
                  <div class="col">
                    {{ location }}
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    Country:
                  </div>
                  <div class="col">
                    {{ country }}
                  </div>
                </div>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-media-body>
      </b-media>
    </b-modal>
  </div>
</template>
<script>
  import * as main from '@/main'

  export default {
    name: 'header-dropdown',
    props: ['userProfile'],
    data: () => {
      return {
        itemsCount: 42,
        showProfileModal: false,
        fullUserProfile: {},
        location: '',
        country: ''
      }
    },
    methods: {
      retrieveFullProfile () {
        this.$on('profileRetrievedEvent', function (jsonString) {
          this.fullUserProfile = jsonString
          this.showProfileModal = true
          this.location = this.fullUserProfile.location.name
          this.country = this.fullUserProfile.location.country.code
        })
        main.retrieveFullUserProfile(this, function (component, jsonString) {
          console.log('===> Header, full profile: ' + JSON.stringify(jsonString))
          component.$emit('profileRetrievedEvent', jsonString)
        })
      }
    },
    created () {
    }
  }
</script>

