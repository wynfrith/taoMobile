var queryObj = {};
function go(id){
  window.location.href = "/m/jobs/detail.html?id="+id+urlEncode(queryObj);
}
$(function() {
  var ua = navigator.userAgent;
  var event = (ua.match(/iphone/i)) || (ua.match(/iPad/i)) ? 'click' : 'click';


  queryObj['pageNumber'] = 0;


  var jobs = {
    domain: 'http://120.24.218.56',
    errMsg: '网络错误',
    resultCount: 0,
    pageSize:12, //每页页数
    currPage: queryObj.pageNumber || 0,  //当前页
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
      var that = this;
      $lists = $('#lists');
      var queryStr = window.location.search;
      that.lastUrl = this.domain + '/api/job/filter?';
      urlToObj(queryStr, queryObj);
      queryObj['pageSize'] = that.pageSize;
      that.lastUrl += urlEncode(queryObj);
      //初始化queryObj对象
      urlToObj(queryStr, queryObj);
      //初始化currPage
      that.currPage = parseInt(queryObj.pageNumber) || 0;
      that.$loading.show();
      $.get(that.lastUrl,  function(data) {
        if (data.code == 0) {
          var html = that.getHtml(data.data.list);
          that.resultCount = data.data.resultCount;
          $lists.html(html);
          that.$loading.hide();
          //分页逻辑显示
          that.showPage();
          // if(that.hasMore()){
          //   var currCount = $('#lists dl').length;
          //   that.$moreBtn.addClass('active');
          // }else{
          //   that.$moreBtn.removeClass('active');
          // }
        } else {
          alert('获取数据失败');
        }
      });
    },
    bind: function() {
      $(document).on(event, this.toggle);
      $("#drops").on(event, $('.drop-ul li'), this.choose.bind(this));
      // $(".load-more").on(event, this.loadMore.bind(this));
      $('.prev-page').on(event, this.prevPage.bind(this));
      $('.next-page').on(event, this.nextPage.bind(this));
    },
    toggle: function(event) {
      var e = event || window.event;
      var elem = e.target || e.srcElement;
      if ($('.nav-bar').find(elem).length > 0) {
        console.log($(elem) .data('type'));
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
      var $defaultLi = $('#drops li[data-title=全部]')

      //修改url参数

      //操作菜单
      $allMenu.each(function(i, currMenu) {
        if ($(currMenu)[0] != $menu[0]) {
          $(currMenu).html($(currMenu).data('default')+' <i class="iconfont">&#xe606;</i>');
          $(currMenu).css('color', '#898989');
        } else {
          //筛选时首先清空queryObj
          queryObj = {};
          queryObj['pageSize'] = that.pageSize;
          if ($elem.data('title') == '全部') {
            $(currMenu).html($(currMenu).data('default')+' <i class="iconfont">&#xe606;</i>');
            $(currMenu).css('color', '#898989');
            that.lastUrl = that.domain+'/api/job/filter?'+urlEncode(queryObj);
          } else {
            $(currMenu).html($elem.text()+' <i class="iconfont">&#xe606;</i>');
            $(currMenu).css('color', '#f96a39');
            var value = $(elem).data('title') || $(elem).text();
            var queryString = $elem.parent().data('filter') + "=" + value;
            urlToObj(queryString, queryObj);
            that.lastUrl = that.domain + "/api/job/filter?" + urlEncode(queryObj);
            //添加筛选内容到queryObj
          }

          console.log(queryObj);
          //发送请求
          that.$loading.show();
          $.get(that.lastUrl , function(data) {
            if (data.code == 0) {
              that.resultCount = data.data.resultCount;
              that.currPage = 0;
              var html = that.getHtml(data.data.list);
              $lists.html(html);
              that.showPage();
              that.$loading.hide();
            }else{
              alert(that.errMsg)
            }
          });
        }
      });

      //操作元素
      $lis.removeClass('active');
      $defaultLi.each(function(i, currLi) {
        if ($(currLi).parent()[0] != $('#drop-' + dataType)[0]) {
          $(currLi).addClass('active');
        }
      });

      $elem.addClass('active');
    },
    loadMore: function(){
      //如果总长 > 当前的长度 才会加载
      var that = this;
      if(that.hasMore()){
        //执行玩 that.currPage += 1;
        var str ='?pageNumber=';
        if(that.lastUrl.indexOf('?') > 0){
          str = '&pageNumber='
        }
        var url = that.lastUrl+str+(that.currPage+1);
        console.log(url);
        $lists = $('#lists');
        that.$loading.show();
        $.get(url, function(data){
          if(data.code == 0){
            var html = that.getHtml(data.data.list);
            $lists.append(html);
            that.currPage +=1;
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
    prevPage: function(){
      //绑定事件 , 更新queryObj
      var that = this;
      console.log('上一页');
      var $lists = $('#lists');
      queryObj.pageNumber = (queryObj.pageNumber>0)?queryObj.pageNumber-1:0;
      var url = that.domain+'/api/job/filter?'+urlEncode(queryObj);
      $(document.body).prop('scrollTop',0);
      that.$loading.show();
      $.get(url, function(data){
        if(data.code == 0){
          var html = that.getHtml(data.data.list);
          // $lists.append(html);
          $lists.html(html);
          that.currPage -=1;
          that.showPage();
        }else{
          alert(that.errMsg);
        }
        that.$loading.hide();
      });
    },
    nextPage: function(){
      var that = this;
      //绑定事件 , 更新queryObj
      console.log('下一页');
      queryObj.pageNumber = parseInt(queryObj.pageNumber)+1;
      var url = that.domain+'/api/job/filter?'+urlEncode(queryObj);
      $(document.body).prop('scrollTop',0);
      that.$loading.show();
      $.get(url, function(data){
        if(data.code == 0){
          var html = that.getHtml(data.data.list);
          // $lists.append(html);
          $lists.html(html);
          that.currPage +=1;
          that.showPage();
          // if(!that.hasMore()){
          //   that.$moreBtn.removeClass('active');
          // }
        }else{
          alert(that.errMsg);
        }
        that.$loading.hide();
      });
    },
    showPage: function(){ //显示当前页的逻辑
      var that = this;
      var $prev = $('.prev-page');
      var $next= $('.next-page');
      var $number = $('.page-number');
      console.log(that.currPage);
      if(that.currPage ==0){ //判断有没有上一页j
        $prev.hide();
      }else{
        $prev.show();
      }
      if(!that.hasPage()){ //判断有没有下一页
        $next.hide();
      }else{
        $next.show();
      }
      //显示当前第几页
      $number.text('第'+(that.currPage+1)+'页');
    },
    hasPage: function(){//标准分页判断
      var currCount = $('#lists dl').length;
      //总数 > (当前页数-1)*页面的条数 + 当前页的数目
      return this.resultCount > this.currPage * this.pageSize + currCount;
    },
    hasMore: function(){//滚动分页判断
      var that = this;
      var currCount = $('#lists dl').length;
      console.log(that.resultCount);
      console.log(currCount);
      return that.resultCount > currCount;
    },
    getCate: function() {
      // 获取目录
      $.get(this.domain + '/api/job/cate/list', function(data) {
        var $cate = $('#drop-cate');
        data.data.list.forEach(function(item, i) {
          var $li = $('<li data-title="' + item.id + '">' + item.name + '</li>');
          $cate.append($li);
        });
        var query  = window.location.search;
        if(query){
          var filterName;
          var value;
          var obj = urlToObj(query);
          if(obj['jobPostCategoryId']){
            filterName = 'jobPostCategoryId';
            value = obj['jobPostCategoryId'];
          }else if(obj['timeToPay']){
            filterName = 'timeToPay';
            value = obj['timeToPay'];
          }else if(obj['region']){
            filterName = obj['region'];
            value = obj['region'];
          }
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
        '      <a href="javascript:" onclick="go({{job.id}})">' +
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
