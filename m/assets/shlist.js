$(function() {
  var ua = navigator.userAgent;
  var event = (ua.match(/iphone/i)) || (ua.match(/iPad/i)) ? 'click' : 'click';
  var domain = "http://120.24.218.56";
  var errMsg = "网络错误";
  var $loading = $('.loading');
  var resultCount = 0; //总数
  var lastUrl = '';
  var currPage = 0;
  $loading.show();


  //筛选, more
  var util = {
    $loading: $('.loading'),
    bind: function() {
      $(".load-more").on(event, this.loadMore);
      $("#drops").on(event, $('.drop-ul li'), this.choose);
      $(document).on(event, this.toggle);
    },
    choose: function(e){
        var $lists = $('#lists');
        var e = e || event || window.event;
        var elem = e.target || e.srcElement;
        var $elem = $(elem);
        var that = util;
        var $allMenu = $('.nav-bar a');
        var dataType = $(elem).parent().attr('id').split('-')[1];
        var $menu = $($('.nav-bar a[data-type=' + dataType + ']')[0]);
        $allMenu.each(function(i, currMenu) {
          if($(currMenu)[0] == $menu[0]){
            var title = $(elem).data('title') || $(elem).text();
            $(currMenu).html(title + ' <i class="iconfont">&#xe606;</i>');
            var value = $(elem).data('id') || title;
            console.log(currMenu);
            if($elem.text() == '全部') {
              lastUrl = domain + '/api/sh/filter';
            }else if($(currMenu).data('type') == 'price'){
              var min = '&minPrice='+$(elem).data('min');
              var max= $(elem).data('max')? '&maxPrice='+$(elem).data('max'): '';
              lastUrl = domain + '/api/sh/filter?rangeQuery=1'+min+max;
            }
            else{
              lastUrl = domain + '/api/sh/filter?'+ $elem.parent().data('filter') + "=" + value;
            }

            that.$loading.show();
            $.get(lastUrl , function(data) {
              if (data.code == 0) {
                resultCount = data.data.resultCount;
                currPage = 0;
                var render = template.compile(source);
                var html = render({
                  shs: data.data.list
                });
                $lists.html(html);
                if(that.hasMore()){
                  $('.load-more').addClass('active');
                }else{
                  $('.load-more').removeClass('active');
                }
                that.$loading.hide();
              }else{
                alert(errMsg)
              }
          });

        }else{
          $(currMenu).html($(currMenu).data('default')+' <i class="iconfont">&#xe606;</i>');
          $(currMenu).css('color', '#898989');
        }

          // that.$loading.show();
        });
    },
    hasMore: function() {
      var currCount = $('#lists > a').length;
      return resultCount > currCount;
    },
    loadMore: function() {
      //如果总长 > 当前的长度 才会加载
      var that = util;
      console.log(that);
      that.$moreBtn = $('.load-more');
      if (that.hasMore()) {
        //执行玩 that.currPage += 1;
        var str = '?pageNumber=';
        if (lastUrl.indexOf('?') > 0) {
          str = '&pageNumber='
        }
        var url = lastUrl + str + (currPage + 1);
        console.log(url);
        $lists = $('#lists');
        that.$loading.show();
        $.get(url, function(d) {
          if (d.code == 0) {
            var render = template.compile(source);
            var html = render({
              shs: d.data.list
            });
            $lists.append(html);
            currPage += 1;
            if (!that.hasMore()) {
              that.$moreBtn.removeClass('active');
            }
          } else {
            alert(errMsg);
          }
          that.$loading.hide();
        });
      }
    },
    toggle: function(event) {
      var e = event || window.event;
      var elem = e.target || e.srcElement;
      if ($('.nav-bar').find(elem).length > 0) {
        var $toggleEle = $('#drop-' + ($(elem).data('type')||$(elem).parent().data('type')));
        if ($toggleEle.hasClass('active')) {
          $(".drop-ul").removeClass('active');
        } else {
          $(".drop-ul").removeClass('active');
          $toggleEle.addClass('active');
        }
      } else {
        $(".drop-ul").removeClass('active');
      }
    },
    getCate: function() {
      // 获取目录
      $.get(domain + '/api/sh/cate/list', function(data) {
        var $cate = $('#drop-cate');
        data.data.list.forEach(function(item, i) {
          var $li = $('<li data-id="' + item.id + '" data-title="' + item.name + '">' + item.name + '</li>');
          $cate.append($li);
        });
        var query  = window.location.search;
        if(query){
          var filterName = query.split('=')[0].substr(1);
          var value = query.split('=')[1];
          var $currMenu = $('.drop-ul[data-filter='+filterName+']');
          $currMenu.find('li').each(function(i, item) {
            if($(item).data('title') == value){
              var type = $currMenu.attr('id').split('-')[1];
              var $menu = $('.menu[data-type='+type+']');
              $menu.html($(item).html()+' <i class="iconfont">&#xe606;</i>');
              $menu.css('color','#f96a39');
              $(item).addClass('active');
            }else{
              $(item).removeClass('active');
            }
          });
        }
      });
    }
  };

  //预加载
  (function init() {
    lastUrl = domain + '/api/sh/filter';
    $.get(lastUrl, function(d) {
      if (d.data == null) {
        alert(errMsg);
      } else {
        var render = template.compile(source);
        var html = render({
          shs: d.data.list
        });
        $('#lists').html(html);
        resultCount = d.data.resultCount;
      }
      $loading.hide();
      if (util.hasMore()) {
        $('.load-more').addClass('active');
      } else {
        $('.load-more').removeClass('active');
      }
    });

    util.getCate();
    util.bind();
  })();



});


var source = ['{{each shs as sh}}',
  '<a class="list" href="/m/shs/detail.html?id={{sh.id}}">',
  '        <img src="http://120.24.218.56/static/images/users/{{sh.picturePath.split(";")[0]}}" alt="{{sh.title}}">',
  '        <div class="content">',
  '          <h2>{{sh.title | omit:"9"}}</h2>',
  '          <p class="content-middle">',
  '            <span>{{sh.category.name}}</span>',
  '            <span class="oldNew">{{sh.depreciationRate}}</span>',
  '            <span class="right price">￥<b>{{sh.sellPrice}}</b></span>',
  '          </p>',
  '          <p class="content-bottom">',
  '            <span><i class="iconfont">&#xe600;</i>{{sh.tradePlace | omit:"6"}}</span>',
  '            <span class="right"> <i class="iconfont">&#xe604;</i>12-26</span>',
  '          </p>',
  '        </div>',
  '      </a>', '{{/each}}'
].join("");
