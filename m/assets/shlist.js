var queryObj = {
  pageSize: 10,
  pageNumber: 0
};
var currPage = 0;
var list = [];
var resultCount = 0; //总数
function go(id) {
  //记录History
  var state = History.getState();
  console.log(list);
  History.pushState({
    currId: id,
    list: list,
    scroll: document.body.scrollTop,
    resultCount: resultCount,
    currPage: currPage,
    queryObj: queryObj
  }, 'state', "?state=" + id);
}
$(function() {
  var ua = navigator.userAgent;
  var event = (ua.match(/iphone/i)) || (ua.match(/iPad/i)) ? 'click' : 'click';
  FastClick.attach(document.body);
  var domain = "http://120.24.218.56";
  var errMsg = "网络错误";
  var $loading = $('.loading');
  var lastUrl = '';


  var getState = function(state) {
    list = state.data.list || [];
    resultCount = state.data.resultCount || 0;
    currPage = state.data.currPage || 0;
    queryObj = state.data.queryObj || {};
    document.body.scrollTop = state.data.scroll || 0;
  }

  //筛选, more
  var util = {
    $loading: $('.loading'),
    bind: function() {
      $(".load-more").on(event, this.loadMore);
      $("#drops").on(event, $('.drop-ul li'), this.choose);
      $(document).on(event, this.toggle);
      $('.prev-page').on(event, this.prevPage.bind(this));
      $('.next-page').on(event, this.nextPage.bind(this));
    },
    choose: function(e) {
      var $lists = $('#lists');
      var $lis = $('#drops li');
      var e = e || event || window.event;
      var elem = e.target || e.srcElement;
      var $elem = $(elem);
      var that = util;
      var $allMenu = $('.nav-bar a');
      var dataType = $(elem).parent().attr('id').split('-')[1];
      var $menu = $($('.nav-bar a[data-type=' + dataType + ']')[0]);
      var $defaultLi = $('#drops li[data-all=true]');
      $allMenu.each(function(i, currMenu) {
        if ($(currMenu)[0] == $menu[0]) {
          var currDropDown = $('#drop-' + $(currMenu).data('type'));
          currDropDown.find('li').removeClass('active');
          $elem.addClass('active');
          var title = $(elem).data('title') || $(elem).text();
          $(currMenu).html(title + ' <i class="iconfont">&#xe606;</i>');

          if ($(currMenu).data('type') == 'price') {
            if ($elem.text() == '全部') {
              delete queryObj['rangeQuery'];
              delete queryObj['minPrice'];
              delete queryObj['maxPrice'];
              $(currMenu).css('color', '#898989');
            } else {
              $(currMenu).css('color', '#f96a39');
              var min = '&minPrice=' + $(elem).data('min');
              var max = $(elem).data('max') ? '&maxPrice=' + $(elem).data('max') : '';
              queryObj['rangeQuery'] = 1;
              queryObj['minPrice'] = $(elem).data('min');
              if ($(elem).data('max'))
                queryObj['maxPrice'] = $(elem).data('max')
            }
          } else {
            if ($elem.text() == '全部') {
              $(currMenu).css('color', '#898989');
              delete queryObj[$elem.parent().data('filter')];
            } else {
              $(currMenu).css('color', '#f96a39');
              var value = $(elem).data('id') || title;
              queryObj[$elem.parent().data('filter')] = value;
            }
          }
          queryObj['pageNumber'] = 0;
          lastUrl = domain + '/api/sh/filter?' + urlEncode(queryObj);
          that.$loading.show();
          $.get(lastUrl, function(data) {
            if (data.code == 0) {
              resultCount = data.data.resultCount;
              list = data.data.list; //存储到外部list中
              currPage = 0;
              var render = template.compile(source);
              var html = render({
                shs: data.data.list
              });
              $lists.html(html);
              util.checkPage();
              that.$loading.hide();
            } else {
              alert(errMsg)
            }
          });



        } else {
          // $(currMenu).html($(currMenu).data('default')+' <i class="iconfont">&#xe606;</i>');
          // $(currMenu).css('color', '#898989');
        }

        // that.$loading.show();
      });
    },
    hasMore: function() {
      var currCount = $('#lists > a').length;
      return resultCount > (queryObj.pageNumber || 0) * queryObj.pageSize + currCount;
    },
    prevPage: function() {
      var that = this;
      queryObj['pageNumber'] = (queryObj['pageNumber'] ? parseInt(queryObj['pageNumber']) : 0) - 1;
      var url = "/m/shs/list.html?" + urlEncode(queryObj);
      window.location.href = url;
    },
    nextPage: function() {
      $list = $('#lists');
      // that.$loading.show();
      queryObj['pageNumber'] = (queryObj['pageNumber'] ? parseInt(queryObj['pageNumber']) : 0) + 1;
      var url = "/m/shs/list.html?" + urlEncode(queryObj);
      window.location.href = url;
    },
    checkPage: function() {

      var hasNext, hasPrev;
      if (util.hasMore()) {
        $('.next-page').removeAttr("disabled");
        hasNext = true;
      } else {
        $(".next-page").attr("disabled", "disabled");
        hasNext = false;
      }
      if (queryObj.pageNumber > 0) {
        $('.prev-page').removeAttr("disabled");
        hasPrev = true;
      } else {
        $('.prev-page').attr("disabled", "disabled");
        hasPrev = false;
      }
      if (hasNext || hasPrev) {
        $('.page-number').text('第' + (parseInt(queryObj.pageNumber || 0) + 1) + '页');
        $('.pagination').show();
      } else {
        $('.pagination').hide();
      }
    },
    loadMore: function() {
      //如果总长 > 当前的长度 才会加载
      var that = util;
      that.$moreBtn = $('.load-more');
      if (that.hasMore()) {
        // //执行玩 that.currPage += 1;
        // var str = '?pageNumber=';
        // if (lastUrl.indexOf('?') > 0) {
        //   str = '&pageNumber='
        // }
        // var url = lastUrl + str + (currPage + 1);
        $lists = $('#lists');
        that.$loading.show();
        $.get(domain + '/api/sh/filter?' + urlEncode(queryObj) + '&pageNumber=' + (currPage + 1), function(d) {
          if (d.code == 0) {
            var render = template.compile(source);
            var html = render({
              shs: d.data.list
            });
            list = list.concat(d.data.list);
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
        var $toggleEle = $('#drop-' + ($(elem).data('type') || $(elem).parent().data('type')));
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
        for (var key in queryObj) {
          var value = queryObj[key];
          if (key == "minPrice") {
            var $parent = $('.drop-ul[data-filter=price]');
          } else {
            var $parent = $(".drop-ul[data-filter=" + key + "]");
          }
          if ($parent.length > 0) {
            var $menu = $(".menu[data-type=" + $parent.attr('id').split('-')[1] + "]");
            $parent.find('li').each(function(i, item) {
              if ($(item).data('id') == value || $(item).text() == value || $(item).data('min') == value) {
                $(item).addClass('active'); //变色
                $menu.html($(item).text() + ' <i class="iconfont">&#xe606;</i>');
                $menu.css('color', '#f96a39');
              } else {
                $(item).removeClass('active');
              }
            });
          }
        }
      });
    }
  };

  //预加载
  (function init() {
    util.getCate();
    util.bind();
    var state = History.getState();
    if (state.data.currId) {
      var render = template.compile(source);
      var html = render({
        shs: state.data.list
      });
      $('#lists').html(html);
      getState(state);
      util.checkPage();
      return;
    }

    var queryStr = window.location.search;
    lastUrl = domain + '/api/sh/filter?';
    if (queryStr) {
      urlToObj(queryStr, queryObj);
    }
    $loading.show();
    $.get(lastUrl + urlEncode(queryObj), function(d) {
      if (d.data == null) {
        alert(errMsg);
      } else {
        var render = template.compile(source);
        var html = render({
          shs: d.data.list
        });
        $('#lists').html(html);
        list = d.data.list;
        resultCount = d.data.resultCount;
        currPage = 0;
        util.checkPage();
      }
      $loading.hide();
    });


  })();



});


var source = ['{{each shs as sh}}',
  '<a class="list" href="/m/shs/detail.html?id={{sh.id}}" onclick="go({{sh.id}})">',
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
  '            <span class="right"> <i class="iconfont">&#xe604;</i>{{sh.postTime | dateFormat:"MM-dd"}}</span>',
  '          </p>',
  '        </div>',
  '      </a>', '{{/each}}'
].join("");
