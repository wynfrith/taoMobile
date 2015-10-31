path = require 'path'

module.exports  =

  entry: './src/entry'

  output:
    path: path.resolve './build'
    filename: 'script.js'
    publicPath: './build/'

  module:
    loaders: [
      { test: /\.coffee$/,loader: 'coffee' }
      { test: /\.css$/, loader: 'style!css!autoprefixer' }
      { test: /\.less/, loader: 'style!css!autoprefixer!less' }
      { test: /\.(png|jpg|gif|svg)$/, loader: 'url-loader?limit=8192' }
      { test: /\.(html|tpl)$/, loader: 'html-loader' }
    ]

  resolve:
    extensions: ['', '.coffee', '.js']
    alias:
      filters: path.join __dirname, './src/filters'
      components: path.join __dirname, './src/components'
      vendors: path.join __dirname, './src/vendors/'

  externals:
    vue: 'Vue'
    router: 'VueRouter'
    resource: 'VueResource'

  devtool: '#source-map'
