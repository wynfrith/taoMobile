styles = require './home.less'

module.exports =
  template: '''
    <div class="{{scoped}}  nickname">
      <notify msg={{@msg}}></notify>
      <div class="wrapper" v-transition="modal">
        <header>
          <h1>修改昵称</h1>
          <a v-link="{name: 'setting'}" >
            <i class="iconfont">&#xe607;</i>
          </a>
        </header>
        <div class="form">
          <input type="text"
            v-model="text" placeholder="请输入您的昵称"
            v-validate="required, maxLength:20,
            pattern:'/^[_A-Za-z0-9\u4e00-\u9fa5]{0,20}$/'">
        </div>
      </div>
      <button class="save" v-touch="tap:ok()"
              v-attr="disabled:validation.text.invalid">
        <i class="iconfont">&#xe613;</i>
      </button>
    </div>
  '''
  ready: () ->
    uinfo = JSON.parse tlj.cookie.read 'uinfo'
    this.text= uinfo.nickname
  data: () ->
    scoped: styles.scoped
    text: ''
    msg: ''
  methods:
    ok: ->
      this.$http.put tlj.domain+'/api/user', {name: this.text}
        .then (res) =>
          tlj.setUInfo {nickname: this.text}
          this.msg = '修改昵称成功!'
          setTimeout ->
            router.go {name: 'setting'}
          ,1000
        .catch (e) =>
          alert e
          alert JSON.stringify e
          this.msg = tlj.error[-1]
