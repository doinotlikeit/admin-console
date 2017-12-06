import auth0 from 'auth0-js'
import {AUTH_CONFIG} from './auth0-variables'
import EventEmitter from 'EventEmitter'
import * as main from '@/main'

// const axios = require('axios')

export default class AuthService {
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    console.log('===> AuthService created ...')
  }

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid profile'
  })

  login () {
    this.auth0.authorize()
  }

  handleAuthentication (component) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        console.log('===> AuthService: Authenticated, accessToken: ' + authResult.accessToken)
        this.authNotifier.emit('authChange', {authenticated: true})
      } else if (err) {
        console.log('===> AuthService: Auth0 auth failure: ' + err)
        main.handleAuthError(component, "Couldn't to authenticate via Auth0: \n\n" + JSON.stringify(err))
      }
    })
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    this.authNotifier.emit('authChange', {authenticated: false})
    console.log('===> AuthService: sent authChange event')
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  retrieveShortUserProfile (callback) {
    // const AuthStr = 'Bearer '.concat(authResult.accessToken)
    // let url = 'https://itstcb.auth0.com/userinfo'
    // axios.get(url, {headers: {Authorization: AuthStr}}).then(response => {
    //   console.log(JSON.stringify(response.data))
    // }).catch((error) => {
    //   console.log('error 3 ' + error)
    // })

    this.auth0.client.userInfo(localStorage.getItem('access_token'), function (err, user) {
      if (err) {
        return {
          err: true, errMsg: err
        }
      }
      console.log('===> AuthService: Retrieved short User Profile from Auth0 ...')
      callback(user)
    })
  }

  retrieveFullUserProfile (userId, callback) {
    var auth0Manage = new auth0.Management({
      domain: 'itstcb.auth0.com',
      token: localStorage.getItem('id_token')
    })
    console.log('===> AuthService: Retrieving full profile for user id: ' + userId)
    auth0Manage.getUser(userId, (err, res) => {
      if (err) {
        return {
          err: true, errMsg: err
        }
      }
      console.log('===> AuthService: Retrieved full User Profile from Auth0 ...')
      callback(res)
    })
  }
}
