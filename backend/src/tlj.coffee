module.exports = tlj  =
  domain: window.tljServer
  pic:
    watingPic: 'http://cdn.taolijie.cn/resources/rolling.svg'
    uploadPath: 'http://v0.api.upyun.com/taolijie-pic/'
    srcRoot: 'http://taolijie-pic.b0.upaiyun.com'
    convertBase64UrlToBlob: (urlData)->
      bytes = window.atob (urlData.base64.split ',')[1]
      ab = new ArrayBuffer(bytes.length)
      ia = new Uint8Array(ab)
      for i in [0..bytes.length-1]
        ia[i] = bytes.charCodeAt i
      return new Blob( [ab] , {type : 'image/jpeg'})

    #[options]可选 设置文件的限制大小级压缩率等
    upload: (file, before, error, success, options)->
      time =  new Date().getTime() + 10 * 1000
      url = "#{tlj.domain}/api/user/sign?picType=1&expiration=#{time}"
      try
        Vue.http.get url
          .then (res) ->
            info = res.data.data
            before(info) ## 在压缩图片之前调用
            lrz(file, options)
              .then (rst) ->
                blob = tlj.pic.convertBase64UrlToBlob rst
                tlj.pic._sendRequest blob, info, error, success
              .catch (err) ->
                console.log err
                throw new Error '图片上传失败'
          .catch (e) ->
            console.log e
            throw new Error '图片上传失败!'
      catch e
        console.log e
        console.log 'upload方法出错'
        error()

    _sendRequest: (blob, info , error, success)->
      console.log info
      console.log blob
      try
        xhr = new XMLHttpRequest()
        formData = new FormData()
        formData.append 'signature', info.sign
        formData.append 'policy', info.policy
        formData.append 'file', blob
        xhr.open 'post', tlj.pic.uploadPath
        xhr.send formData

        xhr.onreadystatechange = ->
          if xhr.readyState == 4
            if xhr.status >= 200 and xhr.status < 300
              info.file = blob
              success(info)
            else
              throw Error '图片上传失败'
      catch e
        console.log '_sendRequest方法出错'
        error()

  error:
    '-1':'系统错误,请重试'
    '0':'操作成功'
    '1':'操作过于频繁'
    '2':'用户名不合法'
    '3':'密码错误,请重新输入'
    '4':'用户名不存在'
    '5':'该用户名已被注册'
    '6':'用户被封号'
    '7':'未登陆'
    '8':'两次密码不一致'
    '9':'分类不能为空'
    '10':'必填字段为空'
    '11':'非法参数'
    '12':'不存在'
    '13':'您没有足够的权限'
    '14':'不能删除当前用户'
    '15':'已经存在'
    '16':'您已经喜欢过了'
    '17':'非法数字'
    '25':'验证码不匹配'
  isLogged: () ->
    return !!tlj.cookie.read('sid') && !!tlj.cookie.read('id')
  setUInfo: (obj) ->
    uinfo = JSON.parse tlj.cookie.read 'uinfo' || {}
    for k, v of obj
      uinfo[k] = v
    tlj.cookie.create 'uinfo', uinfo
  cookie: ##操作cookie方法
    exp: 30
    create: (name, value, days)->
      value =JSON.stringify value if typeof value == 'object'
      value = encodeURIComponent value
      expires = ""
      if days
        date = new Date()
        date.setTime date.getTime() + days*24*60*60*1000
        expires = "; expires=#{date.toGMTString()}"
      document.cookie = "#{name}=#{value}#{expires}; path=/"
    read: (name) ->
      nameEq = name + "="
      ca = document.cookie.split ';'
      for c in ca
        c = c.substr 1, c.length while c.charAt(0) == ' '
        if c.indexOf(nameEq) == 0
          return decodeURIComponent c.substr nameEq.length, c.length
      return null

    erase: (name) ->
      if Object.prototype.toString.call(name) == '[object Array]'
        tlj.cookie.create(n, '', -1) for n in name
      else tlj.cookie.create name, '', -1
