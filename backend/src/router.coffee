## routers

module.exports = ConfigureRouter = (router) ->

  router.beforeEach (trans) ->
    authPages = ['favs', 'posts', 'setting', 'postJob', 'postSh']
    if !tlj.cookie.read 'sid'
      for page in authPages
        if page == trans.to.name
          trans.abort()
          router.go { name: 'login' }
    else
      try JSON.parse tlj.cookie.read 'uinfo'
      catch
        tlj.cookie.erase 'uinfo'
    trans.next()

  router.map {
    '*':
      name: '404'
      component:
        template: '404 not found'

    '/':
      name: 'home'
      component: require './components/home/home'

    '/setting':
      name: 'setting'
      component: require './components/home/setting'

    '/setting/nickname':
      name: 'nickname'
      component: require './components/home/nickname'

    'setting/gender':
      name: 'gender'
      component: require './components/home/gender'

    '/login':
      name: 'login'
      component: require './components/auth/login'

    '/register':
      name: 'register'
      component: require './components/auth/register'

    '/favs':
      name: 'favs'
      component: require './components/my/favs'

    '/posts':
      name: 'posts'
      component: require './components/my/posts'

    '/post/job':
      name: 'postJob'
      component: require './components/post/job'

    '/edit/job/:id':
      name: 'editJob'
      component: require './components/post/job'

    '/post/sh':
      name: 'postSh'
      component: require './components/post/sh'

    '/edit/sh/:id':
      name: 'editSh'
      component: require './components/post/sh'

    '/components/datepicker':
      name: 'datepicker'
      component: require './components/commons/datepicker/picker'



  }
