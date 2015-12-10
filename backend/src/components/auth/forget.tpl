<div class="{{scoped}} forget">
  <header class="forget">
    <h1>找回密码</h1>
    <a v-link="{name: 'login'}" class="back-btn"><span><i class="iconfont">&#xe607;</i></span></a>
  </header>

  <form>
    <div class="group">
      <input type="text" placeholder="请输入注册时的手机号" v-model="form.mobile"
      v-validate="required,pattern: '/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/'">
      <button type="button" class="group-clear" v-on="click:form.mobile= ''" v-if="form.mobile">✕</button>
      <i class="icon-font iconfont">&#xe604;</i>
    </div>
    <div class="group code-group">
      <input type="text" placeholder="请输入验证码" v-model="form.code"
       v-validate="required,pattern:'/^[0-9]{6}$/'">
      <button type="button" class="code-btn" v-text="codeMsg"  v-on="click: getCode(validation.form.mobile.valid)" v-attr="disabled:validation.form.mobile.required||isWaiting"></button>
      <i class="icon-font iconfont">&#xe608;</i>
    </div>
    <div class="group">
      <input type="password" placeholder="请输入新密码" v-model="form.newPwd"
       v-validate="required,minLength:6,maxLength:20">
      <i class="icon-font iconfont">&#xe600;</i>
    </div>
  <button class="reg-btn" type="button" v-on="click: changePass(validation)" v-attr="disabled:validation.form.mobile.required || validation.form.code.required || validation.form.newPwd.required">完成</button>
  </form>
 <notify msg={{@msg}}></notify>
</div>
