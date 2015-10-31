Vue = require 'vue'

Vue.filter 'phoneScreen', (number) ->
  if !number || number.length != 11
    return number
  return number.substr(0,3) + '****' + number.substr(7)
