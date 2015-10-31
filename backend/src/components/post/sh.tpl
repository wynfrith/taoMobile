<div class="{{scoped}} sh">

<notify msg={{@msg}}></notify>

<textmodal show="{{@showModal.description}}"
           text="{{@sh.description}}"
           title="商品描述"
           length="500">
</textmodal>


  <header>
    <h1>发布二手</h1>
    <a href="javascript:window.history.go(-1)"><span><i class="iconfont">&#xe607;</i></span></a>
  </header>

  <!-- <div class="blank"></div> -->

  <form action="">
          <!-- 第一页 -->
    <div class="pic-box">
      <input type="hidden" v-model="sh.picIds" v-validate="required">
      <div class="pics" id="pics">
        <div class="pic pic-btn">
          <i class="iconfont">&#xe617;</i>
          <input type="file" accept="image/*" id="upload"  v-on="change: upload()">
          <label for="upload"></label>
        </div>
        <div class="pic" v-repeat="pics">
          <img v-attr="src:$value" alt="" id="{{$key}}" >
          <span class="close" ><i class="iconfont" v-on="click:delPic($key)">&#xe60c;</i></span>
        </div>
      </div>
      <span v-show="showUploadTip">上传宝贝图片, 最多7张</span>
    </div>
    <div class="sh-box">
      <div class="group">  <!--标题-->
        <label class="group-title" for="shTitle">标&nbsp;&nbsp;&nbsp;&nbsp;题</label>
        <button type="button" class="group-clear" v-on="click:sh.title = ''" v-if="sh.title">✕</button>
        <div class="group-input">
          <input id="shTitle" type="text" placeholder="一句话概括一下宝贝吧" v-model="sh.title"
          v-validate="required, maxLength:20">
        </div>
        <div class="group-error">
          <span v-if="validation.sh.title.maxLength">您输入的标题过长</span>
        </div>
      </div>
      <div class="group"> <!--商品描述-->
        <label class="group-title" for="shDesciption">商品描述</label>
        <div class="group-input group-text">
          <textarea id="shDesciption" type="text" placeholder="建议填写商品用途,原价等信息" v-model="sh.description"
          v-validate="required, maxLength:200"></textarea>
        </div>
        <div class="group-error">
          <span v-if="validation.sh.description.maxLength">你输入的描述过长</span>
        </div>
      </div>
    </div>

    <div class="sh-box">
      <div class="group"> <!--商品分类-->
        <label class="group-title" for="shCate">商品分类</label>
        <div class="group-input">
          <select v-model="sh.secondHandPostCategoryId" options="cateList" v-class="no-selected: !sh.secondHandPostCategoryId" v-validate="required" id="shCate">
            <option value="">选择分类</option>
          </select>
          <span class="arrow"><i class="iconfont">&#xe610;</i></span>
        </div>

        <div class="group-error">
          <span v-if="validation.sh.secondHandPostCategoryId.required && validation.sh.secondHandPostCategoryId.dirty">请选择分类</span>
        </div>
      </div>
      <div class="group"> <!--新旧程度-->
        <label class="group-title" for="shDepreciationRate">新旧程度</label>
        <div class="group-input" id="shDepreciationRate">
          <select v-model="sh.depreciationRate">
            <option>全新</option>
            <option>九成新</option>
            <option>八成新</option>
            <option>七成新</option>
            <option>六成新</option>
          </select>
        <span class="arrow"><i class="iconfont">&#xe610;</i></span>
        </div>
      </div>
      <div class="group">  <!--价格-->
        <label class="group-title" for="shPrice">价&nbsp;&nbsp;&nbsp;&nbsp;格</label>
        <div class="group-input" style="display:inline-block">
          <input type="text" v-model="sh.sellPrice" style="width:1rem;" placeholder="请输入有效数字"
          v-validate="required, pattern:'/^[0-9]*$/', max:9999" id="shPrice" >
        </div>
        <div class="group-input" style="display:inline-block;margin-left:.1rem;float:right;padding-right: .3rem;line-height:.29rem;">元</div>
        <div class="group-error">
          <span v-if="validation.sh.sellPrice.pattern">工资必须为数字</span>
          <span v-if="validation.sh.sellPrice.max">超过最大限额</span>
        </div>
      </div>
      <div class="group">  <!--交易地点-->
          <label class="group-title" for="shPlace">交易地点</label>
        <div class="group-input">
          <input type="text" placeholder="请填写具体的工作地点" v-model="sh.tradePlace" id="shPlace"
           v-validate="required,maxLength:50"/>
        </div>
        <div class="group-error">
          <span v-if="validation.sh.tradePlace.maxLength">交易地点不多于50字</span>
        </div>
      </div>
    </div>


    <div class="sh-box">
      <div class="group">
        <label for="" class="group-title" for="shContactName">联系人</label>
        <div class="group-input">
          <input type="text" placeholder="请输入您的姓名" v-model="sh.contactName"
          v-validate="required, maxLength:10" id="shContactName"/>
        </div>
        <div class="group-error">
          <span v-if="validation.sh.contactName.maxLength">联系人需在10字以内</span>
        </div>
      </div>

      <div class="group">
        <label for="" class="group-title" for="shContactPhone">手机号</label>
        <div class="group-input">
          <input type="text" placeholder="请输入您的手机号" v-model="sh.contactPhone"
          v-validate="required, pattern:'/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/'" debounce="500" id="shContactPhone"/>
        </div>
        <div class="group-error">
          <span v-if="validation.sh.contactPhone.pattern && validation.sh.contactPhone.dirty">手机号码不合法</span>
        </div>
      </div>
      <div class="group">
        <label for="" class="group-title" for="shContactQq">QQ号</label>
        <div class="group-input">
          <input type="text" placeholder="您的QQ号(选填)" v-model="sh.contactQq" id="shContactQq"/>
        </div>
      </div>
    </div>

    <div class="error-all">
      <span v-if="invalid">*您还没有填写完整, 请详细检查</span>
    </div>
    <div class="step">
      <button type="button" class="post-btn" v-attr="disabled: invalid || posting" v-on="click:post()">发布</button>
    </div>
  </div>

  </form>
</div>
