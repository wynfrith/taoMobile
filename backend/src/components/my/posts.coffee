styles = require './my.less'

module.exports =
  template: require './posts.tpl'
  components:
    'postmodal': require '../commons/postmodal/postmodal'
  ready: ->
    isJob = this.$route.query.isJob
    this.isJob = (isJob == 'true') || !isJob
    id = tlj.cookie.read 'id'
    this.$http.get tlj.domain + "/api/job/user/#{id}"
      .then (res) =>
        if res.data.code == 0
          this.jobList = res.data.data.list
          this.job.counts = res.data.data.resultCount
        else
          this.msg = tlj.error[code]
      .catch (e) ->
        this.msg = tlj.error[-1]
    this.$http.get tlj.domain + "/api/sh/user/#{id}"
      .then (res) =>
        if res.data.code == 0
          this.shList = res.data.data.list
          this.sh.counts = res.data.data.resultCount
        else
          this.msg = tlj.error[code]
      .catch (e) =>
        this.msg = tlj.error[-1]
  data: ->
    showModal: false
    msg: ''
    srcRoot: tlj.pic.srcRoot
    scoped: styles.scoped
    jobList: ''
    job:
      counts: 0
      currPage:0
    shList: ''
    sh:
      counts: 0
      currPage: 0
    isJob: false
    toggled:
      job: ''
      sh: ''
  methods:
    loadMore: ->
      type = if this.isJob then 'job' else 'sh'
      list = type + 'List'
      id = tlj.cookie.read 'id'
      url = tlj.domain + "/api/#{type}/user/#{id}"
      if this.hasMore
        this.$http.get url, {pageNumber : this[type].currPage + 1}
          .then (res) =>
            if res.data.code == 0
              res.data.data.list.forEach (item) =>
                this[list].push item
              this[type].currPage += 1
            else
              this.msg = tlj.error[code]
          .catch (e) =>
            this.msg = tlj.error[-1]
    hasMore: ->
      if this.isJob
        return this.job.counts > this.jobList.length
      else
        return this.sh.counts > this.shList.length
    showEdit: (id, isJob) ->
      key =  if isJob then 'job' else 'sh'
      if id == this.toggled[key]
        this.toggled[key] = ''
      else this.toggled[key] = id
    down: (id, item , isJob) ->
      console.log item.expired
      type =  if isJob then 'job' else 'sh'
      url = tlj.domain+"/api/u/#{type}/#{id}"
      this.$http.put url, {expired: !item.expired}
        .then (res)=>
          if res.data.code == 0
            this.msg = if item.expired then '上架成功' else '下架成功'
            item.expired = !item.expired
          else
            this.msg = tlj.error[res.data.code]
        .catch (e) =>
          this.msg = tlj.error[-1]
      #TODO: 商品下架, 变#ccc,二次点击商家
    edit: (id, isJob) ->
      name =  if isJob then 'editJob' else 'editSh'
      router.go { name: name, params:{id: id}}
    del: (id, isJob) ->
      type =  if isJob then 'job' else 'sh'
      list = if isJob then 'jobList' else 'shList'

      console.log this[list]
      if confirm '删除后不可恢复,请谨慎操作'
        this.$http.delete tlj.domain + "/api/u/#{type}/#{id}"
          .then (res) =>
            code =  res.data.code
            if code == 0
              this.msg = "删除成功"
              this[type].counts -= 1
              this[list] = this[list].filter (x) -> x.id != id
            else this.msg = tlj.error[code]
          .catch (e) =>
            this.msg = tlj.error[-1]
