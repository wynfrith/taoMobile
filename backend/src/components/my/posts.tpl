<div class="{{scoped}}">
  <notify msg={{@msg}}></notify>
  <postmodal show="{{@showModal}}"></postmodal>
  <header>
    <h1>我的发布</h1>
    <a v-link="{name: 'home'}" class="back-btn"><span><i class="iconfont">&#xe607;</i></span></a>
    <a v-touch="tap: showModal = true" class="right">发布信息</a>
  </header>
  <div class="nav-bar">
    <p v-class="active:isJob" v-on="click:isJob = true">学生兼职</p>
    <p class="sh-title" v-class="active:!isJob" v-on="click:isJob = false">校园二手</p>
  </div>

  <!-- 兼职 -->
  <ul class="lists job" v-if="isJob">
    <li v-repeat="job in jobList" track-by="id" v-class="disabled:job.expired
    ">
      <span>
        <div class="cate">
          <span v-text="job.category.name" style="color:{{job.category.themeColor}}; border-color:{{job.category.themeColor}}"></span>
        </div>
        <div class="content">
          <h2>
            <a href="http://taolijie.cn/m/dist/jobs/detail.html?id={{job.id}}">
              {{job.title | omit 10}}
            </a>
          </h2>
          <p class="des">
            <a><i class="iconfont">&#xe616;</i>发布时间: {{job.postTime | dateFormat 'MM月dd日 hh:mm'}}</a>
            <a><i class="iconfont">&#xe60a;</i>浏览量: {{job.pv || '0'}}</a>
          </p>
          <div class="edit" v-on="click: showEdit(job.id, true)">
            <span>编辑</span>
          </div>
        </div>

      </span>
      <div class="opreate" v-if="toggled.job == job.id">
        <span v-on="click:edit(job.id, true)">
          <i class="iconfont">&#xe618;</i>
          <p>修改</p>
        </span>
        <span v-on="click:down(job.id,job, true)">
          <i class="iconfont">&#xe61d;</i>
          <p>{{job.expired? '上' : '下'}}架</p>
        </span>
        <span v-on="click:del(job.id, true)">
          <i class="iconfont">&#xe619;</i>
          <p>删除</p>
        </span>
      </div>
    </li>
  </ul>

  <!-- 二手 -->
  <ul class="lists shs" v-if="!isJob">
    <li v-repeat="sh in shList" track-by="id" v-class="disabled:sh.expired
    ">
      <span>
        <div class="cate">
          <img v-attr="src:srcRoot+sh.picturePath.split(';')[0]+'!fix.189.153'" alt="">
        </div>
        <div class="content">
          <h2>
            <a href="http://taolijie.cn/m/dist/shs/detail.html?id={{sh.id}}">
              {{sh.title | omit 10}}
            </a>
            <div class="edit edit-abs" v-on="click: showEdit(sh.id, false)" style="float:right">
              <span>编辑</span>
            </div>
          </h2>
          <p class="des">
            <a><i class="iconfont">&#xe616;</i>发布时间: {{sh.postTime | dateFormat 'MM月dd日'}}</a>
            <a><i class="iconfont">&#xe616;</i>浏览量: {{sh.pv || '0'}}</a>
          </p>

          </p>
        </div>
        <!-- <div class="edit edit-abs" v-on="click: showEdit(sh.id, false)">
          <span>编辑</span>
        </div> -->
      </span>
      <div class="opreate" v-if="toggled.sh == sh.id">
        <span v-on="click:edit(sh.id, false)">
          <i class="iconfont">&#xe618;</i>
          <p>修改</p>
        </span>
        <span v-on="click:down(sh.id,sh, false)">
          <i class="iconfont">&#xe61d;</i>
          <p>{{sh.expired? '上' : '下'}}架</p>
        </span>
        <span v-on="click:del(sh.id, false)">
          <i class="iconfont">&#xe619;</i>
          <p>删除</p>
        </span>
      </div>
    </li>
  </ul>

<div class="more" v-show="hasMore()" v-on="click:loadMore()">
  <button>加载更多</button>
</div>
</div>
