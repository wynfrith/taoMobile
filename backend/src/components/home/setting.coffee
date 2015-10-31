styles = require './home.less'

module.exports =
  template: require './setting.tpl'
  # ready: () ->
  #   uinfo = tlj.cookie.read 'uinfo'
  #   this.user = JSON.parse uinfo
  data: () ->
    scoped: styles.scoped
    msg: ''
    user:''
  route:
    data: (trans) ->
      uinfo = JSON.parse tlj.cookie.read 'uinfo'
      return { user: uinfo || ''}

  methods:
    logout: ->
      tlj.cookie.erase 'sid'
      delete Vue.http.headers.common['sid']
      router.go {name: 'home'}

    updateProfile: (form)->
      this.$http.put tlj.domain + '/api/user', form
        .then (res) =>
          uinfo = JSON.parse tlj.cookie.read 'uinfo'
          for k, v of form
            this.user.$set(k, v)
            uinfo[k] = v
          tlj.cookie.create 'uinfo',  uinfo
          this.msg = '修改头像成功!'

    readImage: (that)->
      photo = document.getElementById 'photo'
      return if !photo.files[0]

      tlj.pic.upload(
        photo.files[0]
        ,(() -> {})
        ,()=> ## error
          this.msg = "头像上传失败"
        ,(info)=> ## success
          path = tlj.pic.srcRoot + info.saveKey + '!mavator2'
          this.updateProfile {photoPath: path}
        , {width: 400}
      )
