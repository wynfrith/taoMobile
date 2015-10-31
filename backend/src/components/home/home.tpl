<div class="{{scoped}}">
    <postmodal show="{{@showModal}}"></postmodal>
  <header>
    <h1>个人中心</h1>
    <!-- <a v-link="{name: 'setting'}" >
      <i class="iconfont">&#xe604;</i>
    </a> -->
  </header>
  <div class="top" v-if="!isLogged()">
    <a v-link="{name: 'login'}" class="login-btn btn">登陆</a>
    <a v-link="{name: 'register'}" class="btn">注册</a>
  </div>
  <div class="top top-2" v-if="isLogged()">
    <span class="img-box">
      <!-- <img src="./default.jpg" alt="头像" v-if="!user.photoPath"> -->
      <img v-attr="src:user.photoPath" alt="" >
    </span>
    <span class="right"><a v-link="{name: 'setting'}"><i class="iconfont">&#xe610;</i></a></span>
    <span class="content">
      <p class="user-name">{{user.nickname}}</p>
      <p class="user-phone">{{user.username}}</p>
    </span>
  </div>
  <div class="list">
    <ul class="list-segment">
      <li>
        <a href="http://cdn.taolijie.cn/m/jobs/list.html">
          <span class="home-icon jobs">
            <i class="iconfont">&#xe609;</i>
          </span>
          <span>找兼职</span>
          <i class="iconfont right">&#xe610;</i>
        </a>
      </li>
      <li>
        <a href="http://cdn.taolijie.cn/m/shs/list.html">
          <span class="home-icon shs">
            <i class="iconfont">&#xe60b;</i>
          </span>
          <span>找二手</span>
          <i class="iconfont right">&#xe610;</i>
        </a>
      </li>
    </ul>
    <ul class="list-segment">
      <!-- <li>
        <a v-link="{name: 'favs'}">
          <span class="home-icon myfav">
            <i class="iconfont">&#xe601;</i>
          </span>
          <span>我的收藏</span>
          <i class="iconfont right">&#xe610;</i>
        </a>
      </li> -->
      <li>
        <a v-link="{name: 'posts'}">
          <span class="home-icon mypost">
            <i class="iconfont">&#xe613;</i>
          </span>
          <span>我的发布</span>
          <i class="iconfont right">&#xe610;</i>
        </a>
      </li>
    </ul>
  </div>

  <div class="post">
    <button type="button" v-on="click: showModal = true">发布信息</button>
  </div>

  <footer>
    <p>create by {{author}}</p>
  </footer>


</div>
