import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import userInfo from "@/components/mine/infoList.vue";
import addQuestion from "@/views/Question/addQuestion.vue";
import questionDetail from "@/views/Question/questionDetail.vue";
import reply from "@/views/Question/reply.vue";
import closeQuestion from "@/views/Question/questionClose.vue";
import applyClose from "@/views/Question/applyClose.vue";
import questionProcess from "@/views/Question/questionProcess.vue";
import questionForward from "@/views/Question/transpond.vue";
import sqgbList from "@/views/Question/closingPannel.vue";
import crowd from "@/views/Question/crowdDetail.vue";
import projectDkl from "@/views/project/projectdkl.vue";
import projectTaskDetial from "@/views/project/projectTaskDetial.vue";
// project
import projectDetail from "@/views/project/projectDetail.vue";
import projectProduct from "@/views/project/projectProduct.vue";
import projectMilestone from "@/views/project/mileStone.vue";
import questionSatisfy from "@/views/project/projectWtmy.vue";

// demand
import demandIndex from "@/views/demand/index.vue";
import demandDetail from "@/views/demand/detail.vue";




export default new Router({
  // mode: 'history',
  // base:'/emap/sys/etender/wx/beta/',
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
        },{
          path: '/project',
          name: 'Project',
          meta:{
            title:'项目'
          },
          component: resolve => require(['@/views/Project/project.vue'], resolve),
         },{
          path: '/question',
          name: 'Question',
          meta:{
            title:'问题'
          },
          component: resolve => require(['@/views/Question/question.vue'], resolve),
         },{
          path: '/message',
          name: 'Message',
          meta:{
            title:'通知'
          },
          component: resolve => require(['@/views/Message/message.vue'], resolve),
         },{
          path: '/mine',
          name: 'Mine',
          meta:{
            title:'个人信息'
          },
          component: resolve => require(['@/views/Mine/mine.vue'], resolve),
         }
      ]
    },
    {
      path: '/taskLog',
      name: 'TaskLog',
      meta:{
        title:'日报'
      },
      component: resolve => require(['@/views/TaskLog/task-log.vue'], resolve),
    },{
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
    },{
      path: '/userinfolist',
      name: 'Userinfolist',
      meta:{
        title:'用户详情'
      },
      component: userInfo
    },
    // 问题
    {
      path: '/addquestion',
      name: 'addQuestion',
      meta:{
        title:'提问'
      },
      component: addQuestion
    },
    {
      path: '/questiondetail',
      name: 'questionDetail',
      meta:{
        title:'问题详情'
      },
      component: questionDetail
    },
    {
      path: '/reply',
      name: 'Reply',
      meta:{title:'问题回复'},
      component: reply
    },
    {
      path: '/closequestion',
      name: 'closeQuestion',
      meta:{title:'关闭问题'},
      component: closeQuestion
    },
    {
      path: '/applyclose',
      name: 'applyClose',
      meta:{title:'申请关闭问题'},
      component: applyClose
    },
    {
      path: '/questionProcess',
      name: 'QuestionProcess',
      meta:{title:'问题进度'},
      component: questionProcess
    },
    {
      path: '/questionForward',
      name: 'QuestionForward',
      meta:{title:'问题转发'},
      component: questionForward
    },
    {
      path: '/sqgbList',
      name: 'sqgbList',
      meta:{title:'申请关闭列表'},
      component: sqgbList
    },
    {
      path: '/crowd',
      name: 'Crowd',
      meta:{title:'开发进度跟踪'},
      component:crowd
    },
    {
      path: '/project/projectDetail',
      name: 'projectDetail',
      meta:{title:'项目详情'},
      component:projectDetail
    },{
      path: '/project/projectdkl',
      name: 'projectDkl',
      meta:{title:'到款详情'},
      component:projectDkl
    },{
      path: '/project/projectTask',
      name: 'projectTask',
      meta:{title:'任务详情'},
      component:projectTaskDetial
    },{
      path: '/project/projectProduct',
      name: 'projectProduct',
      meta:{title:'产品列表'},
      component:projectProduct
    },{
      path: '/project/milestone',
      name: 'projectMilestone',
      meta:{title:'产品列表'},
      component:projectMilestone
    },{
      path: '/project/questionSatisfy',
      name: 'questionSatisfy',
      meta:{title:'产品列表'},
      component:questionSatisfy
    },
    {
      path: '/demand/index',
      name: 'demandIndex',
      meta:{title:'需求交付'},
      component:demandIndex
    },
    {
      path: '/demand/detail',
      name: 'demandDetail',
      meta:{title:'需求交付详情'},
      component:demandDetail
    },
    {
      path: '/sign',
      name: 'signTure',
      meta:{title:'确认签名'},
      component: resolve => require(['@/views/sign/index.vue'], resolve),
    }
  ]
})
