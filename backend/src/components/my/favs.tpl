<div class="{{scoped}}">
  <header>
    <h1>我的收藏</h1>
    <a v-link="{name: 'home'}" class="back-btn"><span><i class="iconfont">&#xe607;</i></span></a>
  </header>
  <div class="nav-bar">
    <p v-class="active:isJob" v-touch="tap:isJob = true">学生兼职</p>
    <p v-class="active:!isJob" v-touch="tap:isJob = false">校园二手</p>
  </div>

  <!-- 兼职 -->
  <ul class="lists job" v-if="isJob">
    <li v-repeat="job in jobList" track-by="id">
      <a>
        <div class="cate">
          <span v-text="job.category.name" style="color:{{job.category.themeColor}}; border-color:{{job.category.themeColor}}"></span>
        </div>
        <div class="content">
          <h2 v-text="job.title | omit 10"></h2>
          <p class="des">
            <span><i class="iconfont">&#xe616;</i>发布时间: {{job.postTime | dateFormat 'MM月dd日 hh:mm'}}</span>
          </p>
        </div>
        <div class="edit" v-touch="tap: showEdit(job.id, true)">
          <span>编辑</span>
        </div>
      </a>
      <div class="opreate" v-if="toggled.job == job.id">
        <span v-touch="tap:edit(job.id, true)">
          <i class="iconfont">&#xe618;</i>
          <p>修改</p>
        </span>
        <span v-touch="tap:del(job.id, true)">
          <i class="iconfont">&#xe619;</i>
          <p>删除</p>
        </span>
      </div>
    </li>
  </ul>

</div>
