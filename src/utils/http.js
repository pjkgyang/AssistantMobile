import axios from 'axios';
import Qs from 'qs';
// let _this = this;

// axios.defaults.timeout = 5000;
// axios.defaults.baseURL ='';

//http request 拦截器
// axios.interceptors.request.use(config => {   // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie                
//     config.data = JSON.stringify(config.data);
//     config.headers = {
//       'Content-Type':'application/x-www-form-urlencoded'
//     }
//     // if(token){
//     //   config.params = {'token':token}
//     // }
//     return config;
//   },
//   error => {
//     return Promise.reject(err);
//   }
// );

//http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     if(response.data.errCode == 2){
//       router.push({
//         path:"/login",
//         querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
//       })
//     }
//     return response;
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

/**
 * get  定义
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    }).then(response => {
      resolve(response.data);
    }).catch(err => {
      reject(err)
      this.$toast('请求超时，请稍后再试~');
      this.$store.dispatch("chnageLoing", false);
    })
  })
}

/**
 * @param url
 * @param data
 * @returns {Promise}
 */
 export function post(url,data = {}){
   if(url.includes('canSubmitQuestion')){
      this.$toast.loading({mask: false,message: '请求中...',duration:0});
   }else{
      this.$toast.loading({mask: true,message: '提交中...',duration:0});
   }
   return new Promise((resolve,reject) => {
     axios.post(url,data,{
      transformRequest: [function (data) {
  　　data = Qs.stringify(data);
      return data;
    }]
  }).then(response => {
            resolve(response.data);
            this.$toast.clear();
            // if(!url.includes('canSubmitQuestion')){
            //    this.$toast('提交成功~');
            // }
          },err => {
            reject(err);
            this.$toast.clear();
            this.$toast('请求超时，请稍后再试~');
       })
    })
 }
