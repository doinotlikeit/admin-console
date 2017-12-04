<script>
  import * as main from '../main'

  export default {
    methods: {
      logout: function () {
        main.auth.logout()
      },
      displayError: function (errMessage) {
        var obj = {
          isShown: true,
          title: 'Error',
          message: errMessage,
          type: 'error',
          onClose: this.onClose
        }
        console.log('Alert ...')
        this.$Simplert.open(obj)
      },
      handleAuthError: function (errMessage) {
        this.displayError(errMessage)
      },
      retrieveShortUserProfile: function () {
        main.auth.retrieveShortUserProfile((userProfile) => {
          if (userProfile.err) {
            this.displayError(userProfile.errMsg)
          } else {
            console.log(JSON.stringify(userProfile))
            localStorage.setItem('shortUserProfile', JSON.stringify(userProfile))
          }
        })
      },
      retrieveFullUserProfile: function () {
        let shortUserProfile = localStorage.getItem('shortUserProfile')
        let jsonStream = JSON.parse(shortUserProfile)
        main.auth.retrieveFullUserProfile(jsonStream.sub, (longUserProfile) => {
          if (longUserProfile.err) {
            this.displayError(longUserProfile.errMsg)
          } else {
            console.log(JSON.stringify(longUserProfile))
            localStorage.setItem('longUserProfile', JSON.stringify(longUserProfile))
          }
        })
      }
    },
    created: function () {
      // console.log('===> BaseComponent created ...')
    }
  }
</script>
