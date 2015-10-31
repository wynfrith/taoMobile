styles = require './my.less'

module.exports =
  template: require './favs.tpl'
  data: ->
    scoped: styles.scoped
