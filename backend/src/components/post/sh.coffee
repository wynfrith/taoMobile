# TODO: 删除图片后重新上传改图片失效

styles = require './post.less'

module.exports =
  template: require './sh.tpl'
  ready: ->
    this.$http.get tlj.domain + '/api/sh/cate/list'
      .then (res) =>
        this.cates = res.data.data.list
    tlj.showLoading = false
  data: ->
    msg:''
    isUpdate: false
    scoped: styles.scoped
    cates: []
    pics: {}
    posting: false
    showUploadTip: true
    showModal:
      description: false
    sh:
      picIds: '',
      title: '',
      secondHandPostCategoryId: '',
      depreciationRate:'全新'
      sellPrice: ''
      description: ''
      tradePlace: ''
      contactName: ''
      contactPhone: ''
      contactQq: ''
  computed:
    cateList: ->
      arr = []
      this.cates.forEach (item) ->
        arr.push {text: item.name, value: item.id}
      return arr
  methods:
    delPic: (id) -> ##删除
      arr = if this.sh.picIds == '' then [] else this.sh.picIds.split ';'
      arr = arr.filter (x)-> x!=id
      this.sh.picIds= arr.join ';'
      this.pics.$delete id
    convertBase64UrlToBlob: (urlData)->
      bytes = window.atob (urlData.base64.split ',')[1]
      ab = new ArrayBuffer(bytes.length)
      ia = new Uint8Array(ab)
      for i in [0..bytes.length-1]
        ia[i] = bytes.charCodeAt i
      return new Blob( [ab] , {type : 'image/jpeg'})
    sendRequest: (file, info)->
      console.log info
      xhr = new XMLHttpRequest()
      formData = new FormData()
      formData.append 'signature', info.sign
      formData.append 'policy', info.policy
      formData.append 'file', file
      xhr.open 'post', tlj.pic.uploadPath
      xhr.send formData

      xhr.onreadystatechange = =>
        if xhr.readyState == 4
          if xhr.status >= 200 and xhr.status < 300
            ##更新picId
            arr = if this.sh.picIds == '' then [] else this.sh.picIds.split ';'
            arr.push info.saveKey
            this.sh.picIds = arr.join ';'
            url = "#{tlj.pic.srcRoot}#{info.saveKey}!mavator2"
            this.pics.$set info.saveKey, url
          else
            this.msg = "图片上传失败!"
    upload: ->
      this.showUploadTip = false

      uploader = document.getElementById 'upload'
      return if !uploader.files[0]

      tlj.pic.upload(
        uploader.files[0]
        ,(info) => ##before
          this.pics.$add info.saveKey, tlj.pic.watingPic
        ,()=> ## error
          this.msg = '图片上传失败'
        ,(info)=> ## success
          arr = if this.sh.picIds == '' then [] else this.sh.picIds.split ';'
          arr.push info.saveKey
          this.sh.picIds = arr.join ';'
          url = "#{tlj.pic.srcRoot}#{info.saveKey}!mavator2"
          this.pics.$set info.saveKey, url
        , {width: 1000}
      )

      # time =  new Date().getTime() + 10 * 1000
      # url = "#{tlj.domain}/api/user/sign?picType=1&expiration=#{time}"
      #
      # this.$http.get url
      #   .then (res)=>
      #     watingPic = './src/vendors/rolling.svg'
      #     this.pics.$add res.data.data.saveKey, watingPic
      #     info = res.data.data
      #     lrz(uploader.files[0],  {width: 800})
      #       .then (rst)=>
      #         file = this.convertBase64UrlToBlob rst
      #         this.sendRequest file, info
      #       .catch (err)=>
      #         this.msg ="图片上传失败"
      #   .catch ()=>
      #     this.msg = tlj.error[-1]

    post:() ->
      method = if this.isUpdate then 'put' else 'post'
      src = if this.$route.params.id then "/#{this.$route.params.id}" else ''
      url = tlj.domain+"/api/u/sh#{src}"
      this.posting = true
      this.$http[method] url, this.sh
        .then (res)=>
          if res.data.code == 0
            this.msg = if this.isUpdate then '修改成功' else '发布成功'
            setTimeout ->
              router.go { name: 'posts', query:{isJob: false}}
            , 1000
          else
            this.msg = tlj.error[res.data.code]
            this.posting = false
        .catch (e) =>
          this.msg = tlj.error[-1]
          this.posting = false
  route:
    data: (trans) ->
      if trans.to.name == 'editSh' && params = trans.to.params
        this.$http.get tlj.domain + "/api/sh/#{params.id}"
          .then (res) ->
            j = res.data.data
            dateFormat = Vue.filter 'dateFormat'
            arr = j.picturePath.split ';'
            pics = {}
            for i in arr
              pics[i] = "#{tlj.pic.srcRoot}#{i}!mavator2"
            return {
            isUpdate: true
            pics: pics
            showUploadTip: false
            sh:
              picIds: j.picturePath,
              title: j.title,
              secondHandPostCategoryId: j.secondHandPostCategoryId,
              depreciationRate:j.depreciationRate
              sellPrice: j.sellPrice
              description: j.description
              tradePlace: j.tradePlace
              contactName: j.contactName
              contactPhone: j.contactPhone
              contactQq: j.contactPhone
          }
      else return {}
