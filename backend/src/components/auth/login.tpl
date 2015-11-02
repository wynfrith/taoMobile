<div class="{{scoped}}">
  <header>
    <a v-link="{name: 'home'}">✕</a>
  </header>

  <div class="logo">
    <img src="./logo.jpg" alt="桃李街" />
  </div>

  <form>
    <div class="group">
      <input type="text" placeholder="手机号" v-model="form.username" v-validate="required">
      <i class="icon-font iconfont">&#xe604;</i>
    </div>
    <div class="group">
      <input type="password" placeholder="请输入密码" v-model="form.password" v-validate="required">
      <i class="icon-font iconfont">&#xe600;</i>
    </div>
    <button type="button" class="login-btn" v-on="click:login()" v-attr="disabled:invalid">登录</button>

    <div class="login-links">
      <a href class="links-forget">忘记密码?</a>
      <a v-link="{name: 'register'}" class="links-reg">还没有账号?</a>
    </div>

    <div class="oauth">
      <p>或者</p>
      <div>
        <a href="">微信</a>
        <a href="">QQ</a>
        <a href="">微博</a>
      </div>
    </div>
  </form>

<notify msg={{@msg}}></notify>

</div>
