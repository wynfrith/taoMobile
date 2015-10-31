<div class="{{scoped}}">
  <div class="wrapper" v-show="show" v-transition="modal">
    <img src="./slogan.png" alt="给你校园生活无限可能!">

    <div class="footer">
      <ul>
        <li>
          <a v-link="{name:'postJob'}">
            <div class="icon job">
              <i class="iconfont">&#xe609;</i>
            </div>

            <p>学生兼职</p>
          </a>
        </li>
        <li>
          <a v-link="{name:'postSh'}">
            <div class="icon sh">
              <i class="iconfont">&#xe60b;</i>
            </div>
            <p>校园二手</p>
          </a>
        </li>
      </ul>

      <a class="close" v-on="click:show = false"><i class="iconfont">&#xe60c;</i></a>
    </div>

  </div>
</div>
