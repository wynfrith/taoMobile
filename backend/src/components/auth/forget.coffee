styles = require './auth.less'

module.exports =
  template: require './forget.tpl'
  ready: ->
    if u = this.$route.query.u
      this.form.$set 'mobile', u
  data: () ->
    scoped: styles.scoped
    msg: ''
    form:
      mobile: ''
      code: ''
      newPwd: ''
  computed:
    codeMsg: ->
      if this.isWaiting
        return "#{this.waitTime}s后重新获取"
      else
        this.waitTime =this.defaultTime
        return '获取验证码'
  methods:
    getCode: (isPhoneValid)->
      url = tlj.domain + "/register/sms?reg=1"
      if !isPhoneValid
        return this.msg = '请输入正确的手机号'
      this.isWaiting = true # 等待验证码
      this.$http.get url, { mobile: this.form.mobile }
        .then (res)=>
          code =res.data.code
          if code == 0
            this.msg = '获取验证码成功!'
            timer = setInterval => ##验证码计时器
              if this.waitTime > 0
                this.waitTime -= 1
                console.log this.waitTime
              else
                this.isWaiting = false
                clearInterval timer
            , 1000
          else
            this.msg = tlj.error[code]
            this.isWaiting = false
        .catch (e)=>
          this.msg= '网络错误, 请重试'
          this.isWaiting = false
    changePass: (validation)->
      url = tlj.domain + "/findPwd"
      ##  验证表单
      return this.msg = '请输入正确的手机号' if validation.form.mobile.invalid
      return this.msg = '请输入6位有效数字验证码' if validation.form.code.invalid
      return this.msg = '密码长度至少为6位' if validation.form.newPwd.minLength
      return this.msg = '密码长度最长位20位' if validation.form.newPwd.maxLength
      ## 发送请求
      this.$http.post url, this.form
        .then (res)=>
          code =res.data.code
          if code == 0
            this.msg = '修改密码成功!'
            setTimeout =>
              router.go {name: 'login', query: {u:this.form.mobile}}
            , 800
          else
            this.msg = tlj.error[code] || '修改失败'
        .catch (e)=>
          this.msg= '网络错误, 请重试'
