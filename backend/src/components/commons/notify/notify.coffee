###
Notify组件
@param msg [options]
@param delay [options] default = 1500

<notify msg='' delay=''><notify>

当msg发生变化时,显示notify, 并且在delay毫秒后自动消失, 默认1500ms
###


styles = require './notify.less'


module.exports = Notify = Vue.extend {
  template: '<div class="{{scoped}} notify" v-show="show" v-transition="notify">
              <p>{{message}}</p>
              <span><span>
            </div>'
  props:
    msg:
      type: String
    delay:
      type: Number
      default: 1500
  data: ()->
    message: 'hello'
    scoped: styles.scoped
    show: false
  watch:
    'msg': ->
      if this.msg
        this.message = this.msg
        this.show = true
        setTimeout =>
          this.msg = ''
        , 1500
      else
        this.show = false
}
