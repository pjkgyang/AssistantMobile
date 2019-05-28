import Es6Promise from 'es6-promise'
Es6Promise.polyfill();
import 'babel-polyfill';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import './base.css';
import {post,get} from './utils/http';
import api from './utils/API';
import store from './store/index.js';
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.API = api;
Vue.config.productionTip = false;
import '../src/style.scss';
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);



import Helpers from 'muse-ui/lib/Helpers';
Vue.use(Helpers);
import { Button, Select,Picker,Icon,BottomNav,TextField,LoadMore} from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';
Vue.use(Button);
Vue.use(Select);
Vue.use(Picker);
Vue.use(Icon);
Vue.use(BottomNav);
Vue.use(TextField);
Vue.use(LoadMore);


import { Swipeout, SwipeoutItem, SwipeoutButton,Previewer } from 'vux'
Vue.component('swipeout', Swipeout);
Vue.component('swipeout-item', SwipeoutItem);
Vue.component('swipeout-button', SwipeoutButton);
Vue.component('previewer', Previewer);


router.beforeEach((to, from, next) => {
  if(to.name == 'More'){
    store.dispatch("chnageLoing", false);
  }
  if(JSON.stringify(to.meta) != '{}'){
    document.title = to.meta.title
  }else{
    document.title = '工程小助手'  
  }
  next();
});


new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
