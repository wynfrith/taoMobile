var list = [];
var count = 0;
var resultCount = 0;
var currPage = 0;
var queryObj = {
  pageSize: 16,
  pageNumber:0
};

function go(id){
  //记录History
  var state = History.getState();
  History.pushState({currId:id, list: list, scroll:document.body.scrollTop, resultCount: resultCount, currPage: currPage, queryObj:queryObj},'state',"?state="+id);
};

var getState= function(state){
  list = state.data.list || [];
  resultCount = state.data.resultCount || 0;
  currPage = state.data.currPage || 0;
  queryObj = state.data.queryObj || {pageSize:16};
  console.log(queryObj);
  document.body.scrollTop = state.data.scroll || 0;
}

$(function() {


  var ua = navigator.userAgent;
  var event = (ua.match(/iphone/i)) || (ua.match(/iPad/i)) ? 'click' : 'click';
  FastClick.attach(document.body);
  var jobs = {
    domain: 'http://120.24.218.56',
    errMsg: '网络错误',
    pageSize:8,
    lastUrl:'',
    init: function() {
      //请求兼职列表并渲染dom, 然后绑定事件
      this.getCate();
      this.getDom();
      this.bind();
      this.initData();
    },
    getDom: function() {
      this.$navbar = $(".nav-bar a");
      this.$dropUl = $('.drop-ul');
      this.$choose = this.$dropUl.find('li');
      this.$moreBtn = $('.load-more');
      this.$loading = $('.loading');
    },
    initData: function() {
      var $lists = $('#lists');
          var that = this;
        var state = History.getState();
        if(state.data.currId){
          var html = that.getHtml(state.data.list);
          $lists.append(html);
          getState(state);
          that.checkPage();
          return;
        }

      that.lastUrl = this.domain + '/api/job/filter?';
      var queryStr = window.location.search;
      if(queryStr){
        urlToObj(queryStr,queryObj);
      }
      this.lastUrl += urlEncode(queryObj);
      that.$loading.show();
      $.get(that.lastUrl,  function(data) {
        if (data.code == 0) {
          list = data.data.list; //存储到外部list中
          resultCount = data.data.resultCount;
          var html = that.getHtml(data.data.list);
          $lists.append(html);
          that.$loading.hide();
          that.checkPage();

        } else {
          alert('获取数据失败');
        }
      });
    },
    bind: function() {
      $(document).on(event, this.toggle);
      $("#drops").on(event, $('.drop-ul li'), this.choose.bind(this));
      $(".load-more").on(event, this.loadMore.bind(this));
      $('.prev-page').on(event, this.prevPage.bind(this));
      $('.next-page').on(event, this.nextPage.bind(this));
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
    choose: function(e) {
      var $lists = $('#lists');
      var e = e || event || window.event;
      var elem = e.target || e.srcElement;
      var $elem = $(elem);
      var that = this;
      var dataType = $(elem).parent().attr('id').split('-')[1];
      var $menu = $($('.nav-bar a[data-type=' + dataType + ']')[0]);
      var $allMenu = $('.nav-bar a');
      var $lis = $('#drops li');
      var $defaultLi = $('#drops li[data-title=全部]');

      //操作菜单
      $allMenu.each(function(i, currMenu) {
        if ($(currMenu)[0] != $menu[0]) {
          // $(currMenu).html($(currMenu).data('default')+' <i class="iconfont">&#xe606;</i>');
          // $(currMenu).css('color', '#898989');
        } else {
          var currDropDown = $('#drop-'+$(currMenu).data('type'));
          currDropDown.find('li').removeClass('active');
          $elem.addClass('active');
          delete queryObj['pageNumber'];
          if ($elem.data('title') == '全部') {
            $(currMenu).html($(currMenu).data('default')+' <i class="iconfont">&#xe606;</i>');
            $(currMenu).css('color', '#898989');
            delete queryObj[$elem.parent().data('filter')];

            that.lastUrl = that.domain+'/api/job/filter?' + urlEncode(queryObj);
            that.$loading.show();
            $.get(that.lastUrl , function(data){
              if(data.code == 0){
                currPage = 0;
                list = data.data.list; //存储到外部list中
                resultCount = data.data.resultCount;
                var html = that.getHtml(data.data.list);
                $lists.html(html);
                if(that.hasMore()){
                  that.$moreBtn.addClass('active');
                }else{
                  that.$moreBtn.removeClass('active');
                }
                that.checkPage();
                that.$loading.hide();
              }else{
                alert(that.errMsg);
              }
            })
          } else {
            $(currMenu).html($elem.text()+' <i class="iconfont">&#xe606;</i>');
            $(currMenu).css('color', '#f96a39');
            var value = $(elem).data('title') || $(elem).text();
            queryObj[$elem.parent().data('filter')] = value;
            console.log(urlEncode(queryObj));
            // var url ="/m/jobs/list.html?"+urlEncode(queryObj);
            // window.location.href=url;
            that.lastUrl = that.domain + "/api/job/filter?" + urlEncode(queryObj);
              that.$loading.show();
            $.get(that.lastUrl , function(data) {
                if (data.code == 0) {
                  list = data.data.list; //存储到外部list中
                  delete queryObj['pageNumber'];
                  resultCount = data.data.resultCount;
                  currPage = 0;
                  var html = that.getHtml(data.data.list);
                  $lists.html(html);
                  if(that.hasMore()){
                    // that.$moreBtn.addClass('active');
                  }else{
                    that.$moreBtn.removeClass('active');
                  }
                  that.checkPage();
                  that.$loading.hide();
                }else{
                  alert(that.errMsg)
                }
            });
          }
        }

      });


    },
    prevPage: function(){
      var that = this;
      $list = $('#lists');;
      queryObj['pageNumber'] = (queryObj['pageNumber'] ? parseInt(queryObj['pageNumber']):0) -1;
      var url ="/m/jobs/list.html?"+urlEncode(queryObj);
      window.location.href=url;
    },
    nextPage: function(){
      var that = this;
      $list = $('#lists');
      // that.$loading.show();
      queryObj['pageNumber'] = (queryObj['pageNumber'] ? parseInt(queryObj['pageNumber']):0)+1;
      var url ="/m/jobs/list.html?"+urlEncode(queryObj);
      window.location.href= url;
    },
    loadMore: function(){
      //如果总长 > 当前的长度 才会加载
      var that = this;
      if(that.hasMore()){
        //执行玩 currPage += 1;
        // var str ='?pageNumber=';
        // if(that.lastUrl.indexOf('?') > 0){
        //   str = '&pageNumber='
        // }
        // var url = that.lastUrl+str+(currPage+1);
        // console.log(url);
        $lists = $('#lists');
        that.$loading.show();
        $.get(that.domain+"/api/job/filter/?"+urlEncode(queryObj)+"&pageNumber="+(currPage+1), function(data){
          if(data.code == 0){
            var html = that.getHtml(data.data.list);
            $lists.append(html);
            list= list.concat(data.data.list);
            console.log(list);
            currPage +=1;
            if(!that.hasMore()){
              that.$moreBtn.removeClass('active');
            }
          }else{
            alert(that.errMsg);
          }
          that.$loading.hide();
        });
      }
    },
    checkPage: function(){

      var hasNext,hasPrev;
      if(this.hasMore()){
        $('.next-page').removeAttr("disabled");
        hasNext = true;
      }else{
        $(".next-page").attr("disabled","disabled");
        hasNext =  false;
      }
      if(queryObj.pageNumber>0){
        $('.prev-page').removeAttr("disabled");
        hasPrev= true;
      }else{
        $('.prev-page').attr("disabled","disabled");
        hasPrev= false;
      }
      if(hasNext || hasPrev){
        $('.page-number').text('第'+(parseInt(queryObj.pageNumber||0)+1)+'页');
        $('.pagination').show();
      }else{
        $('.pagination').hide();
      }
    },
    hasMore: function(){
      var that = this;
     var currCount = $('#lists dl').length;
     console.log(resultCount);
     return resultCount > (queryObj.pageNumber ||0)* queryObj.pageSize + currCount;
    },
    getCate: function() {
      // 获取目录
      $.get(this.domain + '/api/job/cate/list', function(data) {
        var $cate = $('#drop-cate');
        data.data.list.forEach(function(item, i) {
          var $li = $('<li data-title="' + item.id + '">' + item.name + '</li>');
          $cate.append($li);
        });
        var state = History.getState();
        if(true){
          // alert(state.data.currId);
          //设置筛选状态
          for(var key in queryObj){
            var value = queryObj[key];
            var $parent = $(".drop-ul[data-filter="+key+"]");
            if($parent.length >0){
              var $menu = $(".menu[data-type="+$parent.attr('id').split('-')[1]+"]");
              $parent.find('li').each(function(i, item) {
              if($(item).data('title')== value || $(item).text() == value){
                  $(item).addClass('active');//变色
                  $menu.html($(item).text()+' <i class="iconfont">&#xe606;</i>');
                  $menu.css('color', '#f96a39');
                }else{
                  $(item).removeClass('active');
                }
              });
            }

          }
          return;
        }

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
    },
    getHtml: function(list) {
      var source = '{{each list as job i}}' + '  <dl>' +
        '    <dt style="color:{{job.category.themeColor}}; border-color:{{job.category.themeColor}}">{{job.category.name | omit:3}}</dt>' +
        '    <dd class="content">' +
        '      <a href="/m/jobs/detail.html?id={{job.id}}" onclick="go({{job.id}})">' +
        '        <h2>{{job.title | omit:11}}</h2>' +
        '        <p class="des">' +
        '          <span><i title="坐标" class="iconfont">&#xe600;</i> {{job.region}}</span>' +
        '          <span><i title="时间" class="iconfont">&#xe604;</i> {{job.postTime |  dateFormat:"yyyy-MM-dd"}}</span>' +
        '          <span><i title="结算方式"></i>{{job.timeToPay}}</span>' +
        '        </p>' +
        '        <div title="价格" class="price">' +
        '          <b>{{job.wage}}</b>元/{{job.salaryUnit}}' +
        '        </div>' +
        '      </a>' +
        '    </dd>' +
        '    <dd title="line"></dd>' +
        '  </dl>' + '{{/each}}';
      var render = template.compile(source);
      return render({
        list: list
      });
    }


  }
  jobs.init();

});
