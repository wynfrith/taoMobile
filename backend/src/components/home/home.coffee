styles = require './home.less'

module.exports =
  template: require './home.tpl'
  # ready: () ->
  #   if tlj.isLogged()
  #     uinfo = tlj.cookie.read 'uinfo'
  #     this.user = JSON.parse uinfo
  data: () ->
    scoped: styles.scoped
    user: ''
    author: 'wynfrith'
    title: 'Vue-Bootstrap Demo'
    showModal: false
  methods :
    goSetting: ()->
      router.go {name: 'setting'}
    isLogged: () ->
      return tlj.isLogged()
  components:
    'postmodal': require '../commons/postmodal/postmodal'
  route:
    waitForData: true
    data: (trans) ->
      if tlj.isLogged()
        uinfo = JSON.parse tlj.cookie.read 'uinfo'
      return {user: uinfo || ''}
      # else trans.next 'user', ''
