$(function(){


    var domain = "http://120.24.218.56"
    var $wrapper = $('#wrapper');
    var $loading = $('.loading');
    var id = window.location.search.split('=')[1];
    $loading.show();
    $.get(domain + '/api/sh/' + id, function(d) {
      if (d.data == null) {
        // window.location.href = '/jobs/list.html';
      } else {
        var render = template.compile(source);
        var html = render({
          sh: d.data,
          pics: d.data.picturePath.split(';')
        });
        $wrapper.html(html);

        new Swiper('.pic-box', {
              pagination: '.swiper-pagination',
              paginationClickable: true,
              spaceBetween: 30,
          });
      };
      $loading.hide();
    })
});

var source = ['<div class="sh-first">',
'      <div class="pic-box">',
'        <div class="swiper-wrapper">',
'           {{each pics as pic i}}',
'            <div class="swiper-slide">',
'              <img src="http://120.24.218.56/static/images/users/{{pic}}" alt="{{sh.title}}">',
'            </div>',
'            {{/each}}',
'        </div>',
'        <!-- Add Pagination -->',
'        <div class="swiper-pagination"></div>',
'      </div>',
'      <h2>{{sh.title}}</h2>',
'      <div class="text">',
'        <p class="first-line">',
'          <span>{{sh.category.name}} <b class="oldNew">{{sh.depreciationRate}}</b></span>',
'          <span><i>￥{{sh.sellPrice}}</i></span>',
'        </p>',
'        <p class="second-line"><i class="iconfont">&#xe604;</i><span> {{sh.postTime | dateFormat:"yyyy-MM-dd hh:mm:ss"}}</span></p>',
'      </div>',
'      <div class="place"><i class="iconfont">&#xe600;</i> 交易地点 : {{sh.tradePlace}}</div>',
'      <a class="back" href="javascript:window.history.go(-1)"><i class="iconfont">&#xe603;</i></a>',
'    </div>',
'    <div class="second">',
'      <h3>详细介绍</h3>',
'      <p> {{sh.description}}</p>',
'    </div>',
'    <div class="third">',
'      <p class="job-des"><span class="title">联系人: </span>{{sh.contactName}}</p>',
'      <p class="job-des"><span class="title">QQ号: </span>{{sh.contactQq}}</p>',
'    </div>',
'    <div class="fouth">',
'      <p class="job-des"><span class="title">联系电话: </span>{{sh.contactPhone}}</p>',
'      <span class="tip">联系时请说明是在桃李街看到的哦,谢谢</span>',
'      <a href="tel:{{sh.contactPhone}}">',
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
