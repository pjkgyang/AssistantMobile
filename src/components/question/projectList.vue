<template>
    <div>
            <div class="question-projectlist">
                <div>
                    <searchInput :place="'请输入项目编号/项目名称/合同编号'"></searchInput>
                </div>
                <div class="question-projectlist_content">
                    <section v-for="item in listArr" @click="handleChooseItem(item)">
                        <div class="question-projectlist_detail">
                            <h5>{{item.xmmc}}</h5>  
                            <div>
                                <p>学校：{{item.dwmc}}</p>
                                <p>项目状态：<van-tag round type="success">{{item.zt}}</van-tag></p>
                                <p>合同编号：{{item.htbh}}</p>
                                <p>项目编号：{{item.xmbh}}</p>
                            </div>
                          </div>
                          <div class="question-projectlist_link">
                              <van-icon name="arrow" />
                          </div>
                    </section>
                </div>
                <footer>
                   <van-button size="normal" type="default" @click="handleClose">取消</van-button>
                </footer>
            </div>
    </div>
</template>

<script>
import searchInput from "@/components/public/SearchInput.vue";
 export default {
   data () {
     return {
         listArr:[
             {
                 xmmc:'河北科技大学智慧校园建设河北科技大学智慧校园建设',
                 dwmc:'河北科技大学',
                 zt:'在建',
                 htbh:'UK123132132',
                 xmbh:'UK123132132'
              },
               {
                 xmmc:'河北科技大学智慧校园建设',
                 dwmc:'河北科技大学aaa',
                 zt:'在建',
                 htbh:'UK123132132',
                 xmbh:'UK123132132'
              }
         ]
     }
   },
   props:{
     
   },
   methods:{
       handleClose(){
           this.$emit('handleClose','');
       },
       handleChooseItem(data){
        this.$emit('handleChooseItem',data);
       },
   },
   mounted(){
      console.log('====')
   },
   components: {searchInput}
 }
</script>

<style lang="less" scoped>
@import '../../index.less';
    .question-projectlist{
        height: 100vh;
        width: 100vw;
        background: #F2F3F5;
    }
    .question-projectlist_content{
        height: calc(100vh - 100px);
        padding: 0.5rem 0;
        section{
            background:#fff;
            padding: 0.633333rem ;
            border-bottom:1.5px solid rgb(228, 225, 225);
            .flex(space-between,center);
            .question-projectlist_detail{
                width: 90%;
               h5{
                  margin-bottom: 0.3333rem ;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                p{
                    color: #999999;
                    font-size: @fontSize12;
                }
            }
            .question-projectlist_link{
                width: 10%;
            }
           
        }
    }
    footer{
      text-align: center;
      button{
          width:95%;
          border: none;
          margin:0.5rem 0;
      }
  }
</style>

