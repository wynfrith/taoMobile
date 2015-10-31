<div class="{{scoped}}">

<notify msg={{@msg}}></notify>

<datepicker show="{{@showModal.datepicker}}" time={{@job.expiredTime}}></datepicker>

<!-- 工作时间弹窗 -->
<textmodal show="{{@showModal.workTime}}"
           text="{{@job.workTime}}"
           title="工作时间"
           length="100">
</textmodal>
<!-- 工作地点弹窗 -->
<textmodal show="{{@showModal.workPlace}}"
           text="{{@job.workPlace}}"
           title="工作地点"
           length="100">
</textmodal>
<!-- 工作内容弹窗 -->
<textmodal show="{{@showModal.jobDetail}}"
           text="{{@job.jobDetail}}"
           title="工作内容"
           length="500">
</textmodal>
<!-- 工作要求弹窗 -->
<textmodal show="{{@showModal.jobDescription}}"
           text="{{@job.jobDescription}}"
           title="工作要求"
           length="500">
</textmodal>


  <header>
    <h1>发布兼职</h1>
    <a href="javascript:window.history.go(-1)"><span><i class="iconfont">&#xe607;</i></span></a>
  </header>

  <div class="blank"></div>

  <form action="">
    <div class="swiper-container swiper-job">
      <div class="swiper-wrapper ">

          <!-- 第一页 -->
          <div class="swiper-slide slide">

            <div class="group">
              <label class="group-title blue" for="title">标题</label>
              <button type="button" class="group-clear" v-on="click:job.title = ''" v-if="job.title">✕</button>
              <div class="group-input">
                <input id="title" type="text" placeholder="请输入标题" v-model="job.title"
                v-validate="required, maxLength:20">
              </div>
              <div class="group-error">
                <span v-if="validation.job.title.maxLength">您输入的标题过长</span>
              </div>
            </div>

            <div class="group">
              <label class="group-title dark-green">兼职类型</label>
              <div class="group-input">
                <select v-model="job.jobPostCategoryId" options="cateList" v-class="no-selected: !job.jobPostCategoryId" v-validate="required">
                  <option value="">选择分类</option>
                </select>
              <span class="arrow"><i class="iconfont">&#xe610;</i></span>
              </div>
              <div class="group-error">
                <span v-if="validation.job.jobPostCategoryId.required && validation.job.jobPostCategoryId.dirty">请选择分类</span>
              </div>
            </div>

            <div class="group">
              <label class="group-title light-green">区域选择</label>
              <div class="group-input">
                <select v-model="job.region">
                  <option>张店区</option>
                  <option>周村区</option>
                  <option>淄川区</option>
                  <option>临淄区</option>
                  <option>博山区</option>
                  <option>桓台县</option>
                  <option>高青县</option>
                  <option>沂源县</option>
                </select>
              <span class="arrow"><i class="iconfont">&#xe610;</i></span>
              </div>
            </div>

            <div class="group">
              <label class="group-title dark-green">截止报名</label>
              <div class="group-input">
                <input type="text" placeholder="截止时间(选填)" v-model="job.expiredTime"
                readonly v-on="click: showModal.datepicker= true" >
              </div>
            </div>

            <div class="group">
              <label class="group-title light-green">工资待遇</label>
              <div class="group-input" style="display:inline-block">
                <input type="text" v-model="job.wage" style="width:.9rem;" placeholder="输入工资金额"
                v-validate="required, pattern:'/^[0-9]*$/', max:9999" >
              </div>
              <div class="group-input" style="display:inline-block;margin-left:.1rem;float:right">
                <select v-model="job.salaryUnit" style="width:1rem;padding-left:.2rem;border-left: 1px solid #ddd;"  v-class="no-selected:!job.salaryUnit" v-validate="required" >
                  <option value="时" selected>元/时</option>
                  <option value="天">元/天</option>
                  <option value="周">元/周</option>
                  <option value="月">元/月</option>
                </select>
              <span class="arrow"><i class="iconfont">&#xe610;</i></span>
              </div>
              <div class="group-error">
                <span v-if="validation.job.wage.pattern">工资必须为数字</span>
                <span v-if="validation.job.wage.max">超过最大限额</span>
              </div>
            </div>

            <div class="group">
              <label class="group-title orange">结算方式</label>
              <div class="group-input">
                <select v-model="job.timeToPay">
                  <option>日结</option>
                  <option>周结</option>
                  <option>月结</option>
                  <option>完工结算</option>
                </select>
              </div>
            </div>

            <div class="step">
              <button class="next-btn"
               v-attr="disabled: validation.job.wage.invalid || validation.job.title.invalid || validation.job.jobPostCategoryId.invalid || validation.job.salaryUnit.invalid" >下一步</button>
            </div>
          </div>

          <!-- 第二页 -->
          <div class="swiper-slide slide">
            <div class="group" v-class="disabled: !toggle">
              <label class="group-title blue" v-on="click: toggle = !toggle">工作详情</label>
              <div class="group-description blue" v-on="click: toggle = !toggle">请填写更详细的介绍吧</div>
              <div class="group-toggle blue"><i class="iconfont">&#xe610;</i></div>
              <div class="group-box">
                <div class="group-box-item">
                  <label for="" class="blue">时&nbsp;&nbsp;&nbsp;&nbsp;间</label>
                  <div class="group-box-input">
                  <input type="text" placeholder="请填写具体工作时间" v-model="job.workTime"
                  readonly v-on="click: showModal.workTime= true" >

                  </div>
                </div>
                <div class="group-box-item">
                  <label for="" class="blue">地&nbsp;&nbsp;&nbsp;&nbsp;点</label>
                  <div class="group-box-input">
                    <input type="text" placeholder="请填写具体的工作地点" v-model="job.workPlace"
                    readonly v-on="click: showModal.workPlace= true"/>
                  </div>
                </div>
                <div class="group-box-item">
                  <label for="" class="blue">内&nbsp;&nbsp;&nbsp;&nbsp;容</label>
                  <div class="group-box-input">
                    <input type="text" placeholder="工作内容, 5字以上" v-model="job.jobDetail"
                   readonly v-on="click: showModal.jobDetail= true" />
                  </div>
                </div>
                <div class="group-box-item">
                  <label for="" class="blue">要&nbsp;&nbsp;&nbsp;&nbsp;求</label>
                  <div class="group-box-input">
                    <input type="text" placeholder="工作要求, 5字以上" v-model="job.jobDescription"
                    readonly v-on="click: showModal.jobDescription= true" />
                  </div>
                </div>
              </div>
            </div>

            <div class="group" v-class="disabled: toggle">
              <label class="group-title orange" v-on="click: toggle = !toggle">联系方式</label>
              <div class="group-description orange" v-on="click: toggle = !toggle">请留下联系方式哦</div>
              <div class="group-toggle orange"><i class="iconfont">&#xe610;</i></div>
              <div class="group-box">
                <div class="group-box-item">
                  <label for="" class="orange">联系人</label>
                  <div class="group-box-input">
                    <input type="text" placeholder="请输入您的姓名" v-model="job.contact"
                    v-validate="required, maxLength:10"/>
                  </div>
                  <div class="group-box-error">
                    <span v-if="validation.job.contact.maxLength">联系人需在10字以内</span>
                  </div>
                </div>
                <div class="group-box-item">
                  <label for="" class="orange">手机号</label>
                  <div class="group-box-input">
                    <input type="text" placeholder="请输入您的手机号" v-model="job.contactPhone"
                    v-validate="required, pattern:'/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/'" debounce="500"/>
                  </div>
                  <div class="group-box-error">
                    <span v-if="validation.job.contactPhone.pattern && validation.job.contactPhone.dirty">手机号码不合法</span>
                  </div>
                </div>
                <div class="group-box-item">
                  <label for="" class="orange">QQ号</label>
                  <div class="group-box-input">
                    <input type="text" placeholder="您的QQ号(选填)" v-model="job.contactQq"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="error-all">
              <span v-if="invalid">*您还没有填写完整, 请详细检查</span>
            </div>
            <div class="step">
              <button type="button" class="prev-btn">上一步</button>
              <button type="button" class="post-btn" v-attr="disabled: invalid || posting" v-on="click:post()">发布</button>
            </div>
          </div>

      </div>
      <!-- <div class="swiper-pagination"></div> -->
    </div>

  </form>
</div>
