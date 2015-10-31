###
日期选择器

# TODO:
1. 封装成指令
如: <input type="text" readonly v-datepicker/>

当msg发生变化时,显示notify, 并且在delay毫秒后自动消失, 默认1500ms
###

styles = require './picker.less'
module.exports =
  template: require './picker.tpl'
  ready: ->
    today = new Date()
    if this.time
      arr = this.time.split('-')
      today = new Date arr[0], +(arr[1])-1, arr[2]
    this.date = {
      year: today.getFullYear()
      month: today.getMonth()+1
      day: today.getDate()
    }
    ## year
    yearSwiper = new Swiper '.swiper-year', {
      direction : 'vertical'
      slidesPerView: 3
      spaceBetween: 0
      nextButton: '.next-y'
      prevButton: '.prev-y'
      onSlideChangeStart: (s)=>
        this.date.year= +s.slides[s.activeIndex+1].innerHTML
    }
    yearContent = ''
    for i in [-1..10]
      str = '<div class="swiper-slide">'+(today.getFullYear()+i)+'</div>'
      yearContent += str
    yearSwiper.appendSlide yearContent

    ## month
    monthSwiper = new Swiper '.swiper-month', {
      direction : 'vertical'
      slidesPerView: 3
      spaceBetween: 0
      nextButton: '.next-m'
      prevButton: '.prev-m'
      loop:true
      onSlideChangeStart: (s)=>
        this.date.month= +s.slides[s.activeIndex+1].innerHTML
    }
    monthContent = ''
    for i in [1..12]
      str = '<div class="swiper-slide">'+i+'</div>'
      monthContent += str
    monthSwiper.appendSlide monthContent
    monthSwiper.slideTo today.getMonth()+2, 0


    ## day
    DaySwiper = new Swiper '.swiper-day', {
      direction : 'vertical'
      slidesPerView: 3
      spaceBetween: 0
      nextButton: '.next-d'
      prevButton: '.prev-d'
      loop:true
      onSlideChangeStart: (s)=>
        this.date.day= +s.slides[s.activeIndex+1].innerHTML
    }
    DayContent = ''
    for i in [1..this.getMaxDays(2015,10)]
      str = '<div class="swiper-slide">'+i+'</div>'
      DayContent += str
    DaySwiper.appendSlide DayContent
    DaySwiper.slideTo today.getDate()+1, 0

  props:
    time:
      type: String
      twoWay: true
    show:
      type: Boolean
      twoWay: true
  data: ->
    scoped: styles.scoped
    msg: 'datepicker'
    date:
      year:''
      month:''
      day:''
  computed:
    'dateObj':->
      year = this.date.year
      month = this.date.month-1
      day = this.date.day
      return  new Date year, month, day
    'week': ->
      week = this.dateObj.getDay()
      return ['日','一','二','三','四','五','六'][week]
  methods:
    getMaxDays: (year, month) ->
      d = new Date year, month, 0
      return d.getDate()
    cancel: ->
      console.log 'cancel'
      this.show =false
    clear: ->
      console.log 'clear'
      this.time = ''
      this.show = false
    ok: ->
      formator = Vue.filter 'dateFormat'
      this.time = formator this.dateObj, 'yyyy-MM-dd'
      this.show = false
