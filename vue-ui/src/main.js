// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import Simplert from 'vue2-simplert-plugin'
import AuthService from '@/auth/AuthService'

const auth = new AuthService()

Vue.use(BootstrapVue)
Vue.use(Simplert)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})

function handleAuthError (component, errMessage) {
  displayError(component, errMessage, function () {
    component.$router.replace('/welcome')
  })
}

function logout () {
  auth.logout()
}

function displayError (component, errMessage, onCloseCallback) {
  var obj = {
    isShown: true,
    title: 'Error',
    message: errMessage,
    type: 'error',
    onClose: onCloseCallback()
  }
  console.log('Alert ... ')
  component.$Simplert.open(obj)
}

function retrieveShortUserProfile (component, callback) {
  auth.retrieveShortUserProfile((userProfile) => {
    if (userProfile.err) {
      displayError(userProfile.errMsg)
    } else {
      localStorage.setItem('shortUserProfile', JSON.stringify(userProfile))
      callback(component, userProfile)
    }
  })
}

function retrieveFullUserProfile (component, callback) {
  auth.retrieveFullUserProfile(JSON.parse(localStorage.getItem('shortUserProfile')).sub, (longUserProfile) => {
    if (longUserProfile.err) {
      displayError(longUserProfile.errMsg)
    } else {
      localStorage.setItem('longUserProfile', longUserProfile)
      callback(component, longUserProfile)
    }
  })
}

export {auth, retrieveShortUserProfile, retrieveFullUserProfile, handleAuthError, logout, displayError}
