function go(t){History.pushState({currId:t,list:list,scroll:document.body.scrollTop,resultCount:resultCount,currPage:currPage,queryObj:queryObj},"state","?state="+t)}var list=[],count=0,resultCount=0,currPage=0,queryObj={pageSize:16,pageNumber:0},getState=function(t){list=t.data.list||[],resultCount=t.data.resultCount||0,currPage=t.data.currPage||0,queryObj=t.data.queryObj||{pageSize:16},document.body.scrollTop=t.data.scroll||0};$(function(){var t=navigator.userAgent,e=(t.match(/iphone/i)||t.match(/iPad/i),"click");FastClick.attach(document.body);var a={domain:"http://120.24.218.56",errMsg:"网络错误",pageSize:8,lastUrl:"",init:function(){this.getCate(),this.getDom(),this.bind(),this.initData()},getDom:function(){this.$navbar=$(".nav-bar a"),this.$dropUl=$(".drop-ul"),this.$choose=this.$dropUl.find("li"),this.$moreBtn=$(".load-more"),this.$loading=$(".loading")},initData:function(){var t=$("#lists"),e=this,a=History.getState();if(a.data.currId){var i=e.getHtml(a.data.list);return t.append(i),getState(a),void e.checkPage()}e.lastUrl=this.domain+"/api/job/filter?";var r=window.location.search;r&&urlToObj(r,queryObj),this.lastUrl+=urlEncode(queryObj),e.$loading.show(),$.get(e.lastUrl,function(a){if(0==a.code){list=a.data.list,resultCount=a.data.resultCount;var i=e.getHtml(a.data.list);t.append(i),e.$loading.hide(),e.checkPage()}else alert("获取数据失败")})},bind:function(){$(document).on(e,this.toggle),$("#drops").on(e,$(".drop-ul li"),this.choose.bind(this)),$(".prev-page").on(e,this.prevPage.bind(this)),$(".next-page").on(e,this.nextPage.bind(this))},toggle:function(t){var e=t||window.event,a=e.target||e.srcElement;if($(".nav-bar").find(a).length>0){var i=$("#drop-"+($(a).data("type")||$(a).parent().data("type")));i.hasClass("active")?$(".drop-ul").removeClass("active"):($(".drop-ul").removeClass("active"),i.addClass("active"))}else $(".drop-ul").removeClass("active")},choose:function(t){var a=$("#lists"),t=t||e||window.event,i=t.target||t.srcElement,r=$(i),o=this,l=$(i).parent().attr("id").split("-")[1],s=$($(".nav-bar a[data-type="+l+"]")[0]),n=$(".nav-bar a");n.each(function(t,e){if($(e)[0]==s[0]){var l=$("#drop-"+$(e).data("type"));if(l.find("li").removeClass("active"),r.addClass("active"),delete queryObj.pageNumber,"全部"==r.data("title"))$(e).html($(e).data("default")+' <i class="iconfont">&#xe606;</i>'),$(e).css("color","#898989"),delete queryObj[r.parent().data("filter")],o.lastUrl=o.domain+"/api/job/filter?"+urlEncode(queryObj),o.$loading.show(),$.get(o.lastUrl,function(t){if(0==t.code){currPage=0,list=t.data.list,resultCount=t.data.resultCount;var e=o.getHtml(t.data.list);a.html(e),o.hasMore()?o.$moreBtn.addClass("active"):o.$moreBtn.removeClass("active"),o.checkPage(),o.$loading.hide()}else alert(o.errMsg)});else{$(e).html(r.text()+' <i class="iconfont">&#xe606;</i>'),$(e).css("color","#f96a39");var n=$(i).data("title")||$(i).text();queryObj[r.parent().data("filter")]=n,o.lastUrl=o.domain+"/api/job/filter?"+urlEncode(queryObj),o.$loading.show(),$.get(o.lastUrl,function(t){if(0==t.code){list=t.data.list,delete queryObj.pageNumber,resultCount=t.data.resultCount,currPage=0;var e=o.getHtml(t.data.list);a.html(e),o.hasMore()||o.$moreBtn.removeClass("active"),o.checkPage(),o.$loading.hide()}else alert(o.errMsg)})}}})},prevPage:function(){$list=$("#lists"),queryObj.pageNumber=(queryObj.pageNumber?parseInt(queryObj.pageNumber):0)-1;var t="/m/jobs/list.html?"+urlEncode(queryObj);window.location.href=t},nextPage:function(){$list=$("#lists"),queryObj.pageNumber=(queryObj.pageNumber?parseInt(queryObj.pageNumber):0)+1;var t="/m/jobs/list.html?"+urlEncode(queryObj);window.location.href=t},checkPage:function(){var t,e;this.hasMore()?($(".next-page").removeAttr("disabled"),t=!0):($(".next-page").attr("disabled","disabled"),t=!1),queryObj.pageNumber>0?($(".prev-page").removeAttr("disabled"),e=!0):($(".prev-page").attr("disabled","disabled"),e=!1),t||e?($(".page-number").text("第"+(parseInt(queryObj.pageNumber||0)+1)+"页"),$(".pagination").show()):$(".pagination").hide()},hasMore:function(){var t=$("#lists dl").length;return resultCount>(queryObj.pageNumber||0)*queryObj.pageSize+t},getCate:function(){$.get(this.domain+"/api/job/cate/list",function(t){var e=$("#drop-cate");t.data.list.forEach(function(t,a){var i=$('<li data-title="'+t.id+'">'+t.name+"</li>");e.append(i)});for(var a in queryObj){var i=queryObj[a],r=$(".drop-ul[data-filter="+a+"]");if(r.length>0){var o=$(".menu[data-type="+r.attr("id").split("-")[1]+"]");r.find("li").each(function(t,e){$(e).data("title")==i||$(e).text()==i?($(e).addClass("active"),o.html($(e).text()+' <i class="iconfont">&#xe606;</i>'),o.css("color","#f96a39")):$(e).removeClass("active")})}}})},getHtml:function(t){var e='{{each list as job i}}  <dl>    <dt style="color:{{job.category.themeColor}}; border-color:{{job.category.themeColor}}">{{job.category.name | omit:3}}</dt>    <dd class="content">      <a href="/m/jobs/detail.html?id={{job.id}}" onclick="go({{job.id}})">        <h2>{{job.title | omit:11}}</h2>        <p class="des">          <span><i title="坐标" class="iconfont">&#xe600;</i> {{job.region}}</span>          <span><i title="时间" class="iconfont">&#xe604;</i> {{job.postTime |  dateFormat:"yyyy-MM-dd"}}</span>          <span><i title="结算方式"></i>{{job.timeToPay}}</span>        </p>        <div title="价格" class="price">          <b>{{job.wage}}</b>元/{{job.salaryUnit}}        </div>      </a>    </dd>    <dd title="line"></dd>  </dl>{{/each}}',a=template.compile(e);return a({list:t})}};a.init()});