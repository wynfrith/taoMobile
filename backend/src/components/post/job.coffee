styles = require './post.less'

module.exports =
  template: require './job.tpl'
  ready: ->
    mySwiper = new Swiper '.swiper-job', {
      nextButton: '.next-btn'
      prevButton: '.prev-btn'
      onlyExternal : true
    }
    this.$http.get tlj.domain + '/api/job/cate/list'
      .then (res) =>
        this.cates = res.data.data.list
  methods:
    post:() ->
      method = if this.isUpdate then 'put' else 'post'
      url = tlj.domain+"/api/u/job/#{this.$route.params.id || ''}"
      this.posting = true
      this.$http[method] url, this.job
        .then (res)=>
          if res.data.code == 0
            this.msg = if this.isUpdate then '修改成功' else '发布成功'
            setTimeout ->
              router.go { name: 'posts', query:{isJob: true}}
            , 1000
          else
            this.msg = tlj.error[res.data.code]
            this.posting = false
        .catch (e) =>
          this.msg = tlj.error[-1]
          this.posting = false

  data: ->
    msg:''
    toggle: true ##页面切换
    isUpdate: false  ##是否为修改
    scoped: styles.scoped
    cates: []
    posting: false
    showModal:
      workTime: false
      workPlace: false
      jobDetail: false
      jobDescription: false
      datepicker: false
    job:
      title: '',
      jobPostCategoryId: '',
      wage: '',
      salaryUnit:'元'
      timeToPay: '日结'
      expiredTime: ''
      workTime: ''
      province: '山东省'
      city: '淄博市'
      region: '张店区'
      workPlace: ''
      jobDescription: ''
      jobDetail: ''
      contact: ''
      contactPhone: ''
      contactQq: ''
  route:
    data: (trans) ->
      if trans.to.name == 'editJob' && params = trans.to.params
        this.$http.get tlj.domain + "/api/job/#{params.id}"
          .then (res) ->
            j = res.data.data
            dateFormat = Vue.filter 'dateFormat'
            return {
            isUpdate: true
            job:
              title: j.title,
              jobPostCategoryId: j.jobPostCategoryId,
              wage: +j.wage,
              salaryUnit: j.salaryUnit
              timeToPay: j.timeToPay
              expiredTime: dateFormat j.expiredTime, 'yyyy-MM-dd'
              workTime: j.workTime
              province: j.province
              city: j.city
              region: j.region
              workPlace: j.workPlace
              jobDescription: j.jobDescription
              jobDetail: j.jobDetail
              contact: j.contact
              contactPhone: j.contactPhone
              contactQq: j.contactQq
          }
      else return {}
  computed:
    cateList: ->
      arr = []
      this.cates.forEach (item) ->
        arr.push {text: item.name, value: item.id}
      return arr
  components:
    'textmodal': require '../commons/textmodal/textmodal'
    'datepicker': require '../commons/datepicker/picker'
