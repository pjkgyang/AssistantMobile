import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './base.css'

import {post,get} from './utils/http'
import api from './utils/API'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.API = api
Vue.config.productionTip = false


import { XInput,Popup ,Swipeout, SwipeoutItem, SwipeoutButton,Datetime,Group,XButton, 
  ConfirmPlugin ,XTextarea,LoadingPlugin,ToastPlugin ,CellBox,Cell,Scroller,LoadMore,Tab, TabItem,AlertPlugin } from 'vux'
Vue.component('x-input', XInput)
Vue.component('swipeout', Swipeout)
Vue.component('swipeout-item', SwipeoutItem)
Vue.component('swipeout-button', SwipeoutButton)
Vue.component('popup', Popup)
Vue.component('datetime', Datetime)
Vue.component('group', Group)
Vue.component('x-button', XButton)
Vue.use(ConfirmPlugin)
Vue.component('x-textarea', XTextarea)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.component('cell-box', CellBox)
Vue.component('cell', Cell)
Vue.component('scroller', Scroller)
Vue.component('load-more', LoadMore)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.use(AlertPlugin)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
