Vue = require 'vue'

Vue.filter 'omit', (text, len) ->
  return text.substr(0, len)
