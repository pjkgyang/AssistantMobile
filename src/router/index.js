import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import taskLog from "@/views/task-log.vue"

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tabbar',
      redirect: '/more',
      component: resolve => require(['@/components/public/tabbar.vue'], resolve),
      children: [
        {
          path: '/more',
          name: 'More',
          meta:{
            title:'工作台'
          },
          component: resolve => require(['@/views/More/more.vue'], resolve),
        }
      ]
    },
    {
      path: '/tasklog',
      name: 'TaskLog',
      meta:{
        title:'日报'
      },
      component: resolve => require(['@/views/TaskLog/task-log.vue'], resolve),
    }, {
      path: '/tasklogdetail',
      name: 'TaskLogDetail',
      meta:{
        title:'日报详情'
      },
      component: resolve => require(['@/views/TaskLog/taskLog-detail.vue'], resolve),
    }, {
      path: '/addtaskLog',
      name: 'AddTaskLog',
      meta:{
        title:'添加日报'
      },
      component: resolve => require(['@/views/TaskLog/addTaskLog.vue'], resolve),
    },
    {
      path: '/weekreport',
      name: 'weekReport',
      meta:{
        title:'周报'
      },
      component: resolve => require(['@/views/weekReport/homePannel.vue'], resolve),
    },{
      path: '/weekadd',
      name: 'weekAdd',
      meta:{
        title:'添加周报'
      },
      component: resolve => require(['@/views/weekReport/addPannel.vue'], resolve),
    },{
      path: '/addweekprocess',
      name: 'Addweekprocess',
      meta:{
        title:'添加任务进度'
      },
      component: resolve => require(['@/views/weekReport/addjdPannel.vue'], resolve),
    },{
      path: '/addweekquestion',
      name: 'Addweekquestion',
      meta:{
        title:'添加问题'
      },
      component: resolve => require(['@/views/weekReport/addwtPannel.vue'], resolve),
    },{
      path: '/addweekmilestone',
      name: 'Addweekmilestone',
      meta:{
        title:'添加里程碑'
      },
      component: resolve => require(['@/views/weekReport/addlcbPannel.vue'], resolve),
    },{
      path: '/weekdetail',
      name: 'weekDetail',
      meta:{
        title:'周报详情'
      },
      component: resolve => require(['@/views/weekReport/detailPannel.vue'], resolve),
    }, {
      path: '/weekreview',
      name: 'weekRview',
      meta:{
        title:'周报详情'
      },
      component: resolve => require(['@/views/weekReport/pyPannel.vue'], resolve),
    },  {
      path: '/login',
      name: 'Login',
      meta:{
        title:'登录'
      },
      component: resolve => require(['@/views/Login/login.vue'], resolve),
    }
  ]
})
