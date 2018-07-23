import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Signup from '../components/Signup'
import TodoList from '../components/TodoList'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/todolist',
      name: 'Todolist',
      component: TodoList
      // component: TodoList,
      // meta: {
      //   requireAuth: true // flag标识此路由需要登录
      // }
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})



router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
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


// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     const token = localStorage.getItem('token')
//     if (token != null && token !== 'null') {
//       // Bearer是JWT的认证头部信息
//       Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })

export default router
