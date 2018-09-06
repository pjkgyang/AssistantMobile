import axios from 'axios';
import Qs from 'qs'
let _this = this
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
  //  this.$vux.loading.show({text: 'Loading'})
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    }).then(response => {
      resolve(response.data);
    }).catch(err => {
      // this.$vux.loading.hide();
      reject(err)
    })
  })
}

/**
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data,{
      transformRequest: [function (data) {
  　　data = Qs.stringify(data);
      return data;
    }]
  }).then(response => {
            resolve(response.data);
          },err => {
            reject(err)
       })
    })
 }
