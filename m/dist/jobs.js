$(function(){var t=navigator.userAgent,a=(t.match(/iphone/i)||t.match(/iPad/i),"click");FastClick.attach(document.body);var e={domain:"http://120.24.218.56",errMsg:"网络错误",resultCount:0,pageSize:8,currPage:0,lastUrl:"",init:function(){this.getCate(),this.getDom(),this.bind(),this.initData()},getDom:function(){this.$navbar=$(".nav-bar a"),this.$dropUl=$(".drop-ul"),this.$choose=this.$dropUl.find("li"),this.$moreBtn=$(".load-more"),this.$loading=$(".loading")},initData:function(){var t=this;$lists=$("#lists");var a=window.location.search;t.lastUrl=this.domain+"/api/job/filter",a&&(this.lastUrl+=a),t.$loading.show(),$.get(t.lastUrl,function(a){if(0==a.code){var e=t.getHtml(a.data.list);t.resultCount=a.data.resultCount,$lists.append(e),t.$loading.hide(),t.hasMore()?t.$moreBtn.addClass("active"):t.$moreBtn.removeClass("active")}else alert("获取数据失败")})},bind:function(){$(document).on(a,this.toggle),$("#drops").on(a,$(".drop-ul li"),this.choose.bind(this)),$(".load-more").on(a,this.loadMore.bind(this))},toggle:function(t){var a=t||window.event,e=a.target||a.srcElement;if($(".nav-bar").find(e).length>0){console.log($(e).data("type"));var i=$("#drop-"+($(e).data("type")||$(e).parent().data("type")));i.hasClass("active")?$(".drop-ul").removeClass("active"):($(".drop-ul").removeClass("active"),i.addClass("active"))}else $(".drop-ul").removeClass("active")},choose:function(t){var e=$("#lists"),t=t||a||window.event,i=t.target||t.srcElement,o=$(i),l=this,s=$(i).parent().attr("id").split("-")[1],r=$($(".nav-bar a[data-type="+s+"]")[0]),n=$(".nav-bar a"),d=$("#drops li"),c=$("#drops li[data-title=全部]");n.each(function(t,a){if($(a)[0]!=r[0])console.log("ok"),$(a).html($(a).data("default")+' <i class="iconfont">&#xe606;</i>'),$(a).css("color","#898989");else if("全部"==o.data("title"))$(a).html($(a).data("default")+' <i class="iconfont">&#xe606;</i>'),$(a).css("color","#898989"),l.lastUrl=l.domain+"/api/job/filter",l.$loading.show(),$.get(l.lastUrl,function(t){if(0==t.code){l.resultCount=t.data.resultCount,l.currPage=0;var a=l.getHtml(t.data.list);e.html(a),l.hasMore()?l.$moreBtn.addClass("active"):l.$moreBtn.removeClass("active"),l.$loading.hide()}else alert(l.errMsg)});else{$(a).html(o.text()+' <i class="iconfont">&#xe606;</i>'),$(a).css("color","#f96a39");var s=$(i).data("title")||$(i).text();l.lastUrl=l.domain+"/api/job/filter?"+o.parent().data("filter")+"="+s,l.$loading.show(),$.get(l.lastUrl,function(t){if(0==t.code){l.resultCount=t.data.resultCount,l.currPage=0;var a=l.getHtml(t.data.list);e.html(a),l.hasMore()?l.$moreBtn.addClass("active"):l.$moreBtn.removeClass("active"),l.$loading.hide()}else alert(l.errMsg)})}}),d.removeClass("active"),c.each(function(t,a){$(a).parent()[0]!=$("#drop-"+s)[0]&&$(a).addClass("active")}),o.addClass("active")},loadMore:function(){var t=this;if(t.hasMore()){var a="?pageNumber=";t.lastUrl.indexOf("?")>0&&(a="&pageNumber=");var e=t.lastUrl+a+(t.currPage+1);console.log(e),$lists=$("#lists"),t.$loading.show(),$.get(e,function(a){if(0==a.code){var e=t.getHtml(a.data.list);$lists.append(e),t.currPage+=1,t.hasMore()||t.$moreBtn.removeClass("active")}else alert(t.errMsg);t.$loading.hide()})}},hasMore:function(){var t=this,a=$("#lists dl").length;return console.log(t.resultCount),console.log(a),t.resultCount>a},getCate:function(){$.get(this.domain+"/api/job/cate/list",function(t){var a=$("#drop-cate");t.data.list.forEach(function(t,e){var i=$('<li data-title="'+t.id+'">'+t.name+"</li>");a.append(i)});var e=window.location.search;if(e){var i=e.split("=")[0].substr(1),o=e.split("=")[1],l=$(".drop-ul[data-filter="+i+"]");l.find("li").each(function(t,a){if($(a).data("title")==o){var e=l.attr("id").split("-")[1],i=$(".menu[data-type="+e+"]");i.html($(a).html()+' <i class="iconfont">&#xe606;</i>'),i.css("color","#f96a39"),$(a).addClass("active")}else $(a).removeClass("active")})}})},getHtml:function(t){var a='{{each list as job i}}  <dl>    <dt style="color:{{job.category.themeColor}}; border-color:{{job.category.themeColor}}">{{job.category.name | omit:3}}</dt>    <dd class="content">      <a href="/m/jobs/detail.html?id={{job.id}}">        <h2>{{job.title | omit:11}}</h2>        <p class="des">          <span><i title="坐标" class="iconfont">&#xe600;</i> {{job.region}}</span>          <span><i title="时间" class="iconfont">&#xe604;</i> {{job.postTime |  dateFormat:"yyyy-MM-dd"}}</span>          <span><i title="结算方式"></i>{{job.timeToPay}}</span>        </p>        <div title="价格" class="price">          <b>{{job.wage}}</b>元/{{job.salaryUnit}}        </div>      </a>    </dd>    <dd title="line"></dd>  </dl>{{/each}}',e=template.compile(a);return e({list:t})}};e.init()});