// import Vue from 'vue'
// import VueRouter from 'vue-router'
import Login from '../components/Login'
import TodoList from '../components/TodoList'

// Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history', 
  base: __dirname,
  routes: [
    { path: '/', component: Login },
    { path: '/todolist', component: TodoList },
    { path: '/*', redirect: '/' }
  ]
})


router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('demo-token')
  if (to.path == '/') {
    if (token != 'null' && token != null) {
      next('/todolist')
    }
    next()
  } else {
    if (token != 'null' && token != null) {
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;   
      next()
    } else {
      next('/')
    }
  }
})

export default router