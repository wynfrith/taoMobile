styles = require './auth.less'

## TODO 表单验证

module.exports =
  template: require './login.tpl'
  ready: ->
    tlj.showLoading = false
    if u = this.$route.query.u
      this.form.$set 'username', u
  data: () ->
    scoped: styles.scoped
    msg: ''
    form:
      rememberMe: true
      username: ''
      password: ''
  methods:
    login: ->
      url = tlj.domain + "/login"
      this.$http.post url, this.form
        .then (res) =>
          code =res.data.code
          if code == 0
            this.msg = '登陆成功,正在跳转'
            console.log res.data.data
            tlj.cookie.create 'sid', res.data.data.sid, tlj.cookie.exp
            tlj.cookie.create 'id', res.data.data.id, tlj.cookie.exp
            tlj.cookie.create 'uinfo', JSON.stringify(res.data.data), tlj.cookie.exp
            Vue.http.headers.common['sid'] = tlj.cookie.read 'sid'
            router.go {name: 'home'}
          else
            this.msg = tlj.error[code] || '登陆出错'
        .catch (e) =>
          this.msg= tlj.error[-1]
    goRegister: ->
      router.go { name: 'register' }
