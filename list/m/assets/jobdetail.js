$(function() {
  var domain = "http://120.24.218.56"
  var $wrapper = $('#wrapper');
  var $loading = $('.loading');
  // var id = window.location.search.split('=');
  var id  = mobileUtil.getSearch().id;
  $loading.show();
  $.get(domain + '/api/job/' + id, function(d) {
    if (d.data == null) {
      window.location.href = 'list.html';
    } else {
      var render = template.compile(source);
      var html = render({
        job: d.data
      });
      $wrapper.html(html)
    };
    $loading.hide();
  })
});

var source = [
  '  <div class="first">',
  '      <h2>{{job.title}}</h2>',
  '      <p class="job-type">',
  '        <span>兼职类型: <b>{{job.category.name}}</b></span>',
  '        <span><i class="iconfont">&#xe604;</i> {{job.postTime | dateFormat:"yyyy-MM-dd hh:mm:ss"}}</span>',
  '        <span><i class="iconfont">&#xe607;</i> {{job.pv || 0}}</span>',
  '      </p>',
  '      <p class="job-money">',
  '        <b>{{job.wage}}元/{{job.salaryUnit}}</b> {{job.timeToPay}}',
  '      </p>',
  '      <p class="job-des"><span class="title">截止时间: </span>{{job.expiredTime | dateFormat:"yyyy-MM-dd" }}</p>',
  '      <p class="job-des"><span class="title">工作时间: </span>{{job.workTime}}</p>',
  '      <p class="job-des"><span class="title">工作区域: </span>{{job.region}} </p>',
  '      <p class="job-des"><span class="title">工作地点: </span>{{job.workPlace}}</p>',
  '    </div>',
  '    <div class="second">',
  '      <h3>工作内容</h3>',
  '      <p>{{job.jobDetail}}</p>',
  '      <h3>工作要求</h3>',
  '      <p>{{job.jobDescription}}</p>',
  '    </div>',
  '    <div class="third">',
  '      <p class="job-des"><span class="title">联系人: </span>{{job.contact}}</p>',
  '      <p class="job-des"><span class="title">QQ号: </span>{{job.contactQq}}</p>',
  '    </div>',
  '    <div class="fouth">',
  '      <p class="job-des"><span class="title">联系电话: </span>{{job.contactPhone}}</p>',
  '      <span class="tip">联系时请说明是在桃李街看到的哦,谢谢</span>',
  '      <a href="tel:{{job.contactPhone}}">',
  '        <div class="right-btn">',
  '          <p><i class="iconfont">&#xe605;</i></p>',
  '          <p>拨打电话</p>',
  '        </div>',
  '      </a>',
  '    </div>',
  '  <div class="fifth">',
  '    <div class="fifth-content">',
  '      <p>如遇收取费用的兼职，请谨慎！注意安全</p>',
  '      <span>客服电话: <i>18369905893</i></span>',
  '      <span>客服QQ: <i>981833831</i></span>',
  '    </div>',
  '    <div class="title"><p>桃李街提醒你</p></div>',
  '  </div>',
].join("");
