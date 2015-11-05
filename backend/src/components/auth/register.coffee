styles = require './auth.less'

## TODO 表单验证

module.exports =
  template: require './register.tpl'
  data: ->
    isWaiting: false
    defaultTime: 180
    waitTime: 180
    scoped: styles.scoped
    msg:''
    form:
      regType: 1
      code: ''
      username: ''
      password: ''
      rePassword: ''
      nickname: '' #随机昵称
      isEmployer: true
  computed:
    codeMsg: ->
      if this.isWaiting
        return "#{this.waitTime}s后重新获取"
      else
        this.waitTime =this.defaultTime
        return '获取验证码'
  methods:
    getRandomName: ->
      return "tlj_#{this.form.username}"
    goLogin: ->
      router.go { name: 'login' }
    register: (validation)->
      url = tlj.domain + "/register"
      ##  验证表单
      return this.msg = '请输入正确的手机号' if validation.form.username.invalid
      return this.msg = '请输入6位有效数字验证码' if validation.form.code.invalid
      return this.msg = '密码长度至少为6位' if validation.form.password.minLength
      return this.msg = '密码长度最长位20位' if validation.form.password.maxLength

      this.form.rePassword = this.form.password
      this.form.nickname = this.getRandomName()
      this.$http.post url, this.form
        .then (res)=>
          code =res.data.code
          if code == 0
            this.msg = '注册成功!'
            setTimeout =>
              router.go {name: 'login', query: {u:this.form.username}}
            , 800
          else
            this.msg = tlj.error[code] || '注册失败'
        .catch (e)=>
          this.msg= '网络错误, 请重试'
    getCode: (isPhoneValid)->
      url = tlj.domain + "/register/sms"
      if !isPhoneValid
        return this.msg = '请输入正确的手机号'
      this.isWaiting = true # 等待验证码
      this.$http.get url, { mobile: this.form.username }
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
