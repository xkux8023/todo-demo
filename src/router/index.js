import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import TodoList from '../components/TodoList'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history', 
  base: __dirname,
  routes: [
    { path: '/', component: Login },
    { path: '/todolist', component: TodoList },
    { path: '/*', redirect: '/' }
  ]
})


export default router;