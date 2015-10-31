## core
Vue = require 'vue'
VueRouter = require 'router'
VueResource = require 'resource'
VueValidator = require 'vue-validator'
VueTouch = require 'vue-touch'
Vue.use VueValidator
Vue.use VueTouch

App = new Vue()


## vendors
require './vendors/mobile-utils'
require './vendors/swiper/css/swiper.min.css'
require './vendors/swiper/js/swiper.min.js'
require './main.less' #global css

## config
window.tlj = require './tlj'
Vue.config.debug = true  # debug mode
Vue.http.options.emulateJSON = true #application/x-www-form-urlencoded
if tlj.cookie.read 'sid'
  Vue.http.headers.common['sid'] = tlj.cookie.read 'sid'

## global components
Vue.component 'notify', require './components/commons/notify/notify'




## filter
require './filters/omit'
require './filters/dataFormat'
require './filters/phone'

# router
router = new VueRouter {
    # history: true,  # the server needs to be properly configured
    # saveScrollPosition: true
  }

ConfigureRouter = require './router'
ConfigureRouter router



window.router = router # router debug..

## bootstrap
if !!tlj.cookie.read('sid') && !!tlj.cookie.read('id')
  App.$http.post tlj.domain+"/api/user/#{tlj.cookie.read('id')}"
    .then (res) ->
      data = res.data.data
      uinfo = {
        nickname: data.name
        username: data.username
        gender: data.gender
        role: data.roleList[0].rolename
        photoPath: data.profilePhotoPath
      }
      tlj.cookie.create 'uinfo', uinfo, tlj.cookie.exp
      router.start App, '#app'
    .catch (e) ->
      tlj.cookie.erase ['sid', 'id', 'uinfo']
      router.start App, '#app'
else
  tlj.cookie.erase ['sid', 'id', 'uinfo']
  router.start App, '#app'
