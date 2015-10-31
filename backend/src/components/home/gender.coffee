styles = require './home.less'

module.exports =
  template: '''
    <div class="{{scoped}}  nickname">
      <notify msg={{@msg}}></notify>
      <div class="wrapper" v-transition="modal">
        <header>
          <h1>修改性别</h1>
          <a v-link="{name: 'setting'}" >
            <i class="iconfont">&#xe607;</i>
          </a>
        </header>
        <div class="form">
          <button type="button" class="male"
          v-attr="disabled:gender == '男'" v-touch="tap:choose('男')">男</button>
          <button type="button" class="female"
          v-attr="disabled:gender == '女'" v-touch="tap:choose('女')">女</button>
          <input type="hidden" v-model="gender" v-validate="required">
        </div>
      </div>
      <button class="save" v-touch="tap:ok()"
              v-attr="disabled:validation.gender.invalid">
        <i class="iconfont">&#xe613;</i>
      </button>
    </div>
  '''
  ready: () ->
    uinfo = JSON.parse tlj.cookie.read 'uinfo'
    this.gender = uinfo.gender
  data: () ->
    scoped: styles.scoped
    text: ''
    msg: ''
    gender: ''
  methods:
    choose: (gender)->
      this.gender = gender
    ok: ->
      this.$http.put tlj.domain+'/api/user', {gender: this.gender}
        .then (res) =>
          tlj.setUInfo {gender: this.gender}
          this.msg = '修改性别成功!'
          setTimeout ->
            console.log '?'
            router.go {name: 'setting'}
          , 1000
        .catch (e) =>
          console.log e
          this.msg = tlj.error[-1]
