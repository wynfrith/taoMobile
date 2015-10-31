<div class="{{scoped}}">
  <notify msg={{@msg}}></notify>
  <header class="setting-header">
    <h1>个人资料</h1>
    <a v-link="{name: 'home'}" class="back-btn"><span>返回</span></a>
  </header>

  <div class="list">
    <ul class="list-segment">
      <li>
        <a  class="photo-li">
          <span>头像</span>
          <label for="photo" class="photo-label"></label>
          <i class="iconfont right">&#xe610;</i>
          <img class="photo content" v-attr="src: user.photoPath" alt="">
          <input type="file" accept="image/*" id="photo" name="cameraInput" v-on="change: readImage()">
        </a>
      </li>
    </ul>

    <ul class="list-segment">
      <li>
        <a v-link="{ name: 'nickname'}">
          <span>昵称</span>
          <i class="iconfont right">&#xe610;</i>
          <span class="content" v-text="user.nickname"></span>
        </a>
      </li>
      <li>
        <a v-link="{ name: 'gender'}">
          <span>性别</span>
          <i class="iconfont right">&#xe610;</i>
          <span class="content"  v-text="user.gender || '选择性别'"></span>
        </a>
      </li>
      <li>
        <a>
          <span>绑定手机号</span>
          <!-- <i class="iconfont right">&#xe610;</i> -->
          <span class="content"  v-text="user.username | phoneScreen"></span>
        </a>
      </li>
    </ul>

    <ul class="list-segment">
      <li class="center" v-on="click:logout()">
        <a>
          <span>退出登录</span>
        </a>
      </li>
    </ul>
  </div>

</div>
