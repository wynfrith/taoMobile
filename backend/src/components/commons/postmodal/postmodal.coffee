###
textmodal
@param show 是否显示

个人中心点击发布按钮弹出的模态框
###

styles = require './postmodal.less'

module.exports = postmodal = Vue.extend {
  template: require './postmodal.tpl'
  props:
    show:
      type: Boolean
      twoWay: true
      require: true
  data: ->
    scoped: styles.scoped
  methods:
    postJob: ->
      router.go {name: 'postJob'}
}
