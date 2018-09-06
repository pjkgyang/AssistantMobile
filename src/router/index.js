import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import taskLog from "@/views/task-log.vue"

export default new Router({
  routes: [
    {
        path: '/',
        name: 'TaskLog',
        component: resolve => require(['@/views/TaskLog/task-log.vue'], resolve), 
    },{
      path: '/taskLogDetail',
      name: 'TaskLogDetail',
      component: resolve => require(['@/views/TaskLog/taskLog-detail.vue'], resolve), 
    },{
      path: '/addTaskLog',
      name: 'AddTaskLog',
      component: resolve => require(['@/views/TaskLog/addTaskLog.vue'], resolve), 
    },{
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/views/Login/login.vue'], resolve), 
    }
  ]
})
