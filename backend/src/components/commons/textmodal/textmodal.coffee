###
textmodal
@param show 是否显示
@param text 输入框里model绑定
@param title modal标题
@param length 输入框说允许输入的最大长度

可以输入文字的弹出框
###

styles = require './textmodal.less'

module.exports = textmodal = Vue.extend {
  template: require './textmodal.tpl'
  props:
    show:
      type: Boolean
      required: true
      twoWay: true
    text:
      type: String
      twoWay: true
    title:
      type: String
    length:
      type: Number
  data: ->
    scoped: styles.scoped
  methods:
    cancel: ->
      this.text = this.content
      this.show = false
  watch:
    'show': ->
      if this.show
        this.content = this.text
        console.log this.content
}
