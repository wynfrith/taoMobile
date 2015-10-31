<div class="{{scoped}}">
  <header>
    <a v-link="{name: 'home'}">✕</a>
  </header>

<div class="logo">
  <img src="./logo.jpg" alt="桃李街" />
</div>

<form>
  <div class="group">
    <input type="text" placeholder="请输入您的手机号" v-model="form.username"
    v-validate="required,pattern: '/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/'">
    <button type="button" class="group-clear" v-on="click:form.username= ''" v-if="form.username">✕</button>
    <i class="icon-font iconfont">&#xe604;</i>
  </div>
  <div class="group code-group">
    <input type="text" placeholder="验证码" v-model="form.code"
     v-validate="required,pattern:'/^[0-9]{6}$/'">
    <button type="button" class="code-btn" v-text="codeMsg"  v-on="click: getCode(validation.form.username.valid)" v-attr="disabled:validation.form.username.required||isWaiting"></button>
    <i class="icon-font iconfont">&#xe608;</i>
  </div>
  <div class="group">
    <input type="password" placeholder="请输入密码" v-model="form.password"
     v-validate="required,minLength:6,maxLength:20">
    <i class="icon-font iconfont">&#xe600;</i>
  </div>
  <button class="reg-btn" type="button" v-on="click: register(validation)" v-attr="disabled:validation.form.username.required || validation.form.code.required || validation.form.password.required">完成注册</button>
  <button class="go-login-btn" type="button" v-on="click: goLogin()">已有账号,去登陆</button>
</form>

<notify msg={{@msg}}></notify>
</div>
