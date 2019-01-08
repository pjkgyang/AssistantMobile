<template>
 <div class="questionDetail">
   <div class="questionDetail-top">
     <section class="questionDetail-desc">
          <div class="questionDetail-detail">
           <h4>消息中心配置前置代理时发现</h4>
            <div class="questionDetail-desc-info">
              <div class="questionDetail-desc-tag">
                  <van-tag round  color="#F0871E">已申请关闭</van-tag>
                  <van-tag round  color="#29BE1E">总部工程专家受理</van-tag>
                </div>
                <p>问题编号：<span>jz181100997</span></p>
                <p>提问时间：<span>2018.04.08 12:00:00</span></p>
                <p>发布人：<span>李俊</span></p>
                <p>所属单位：<span>江苏金智教育信息股份有限公司</span></p>
                <p>所属项目：<span>华东理工大学OA系统</span></p>
                <p>问题类型：<span>使用操作</span></p>
                <p>产品：<span>消息中心</span></p>
                <p>期望解决日期：<span>2018-11-14</span></p>
                <p>承诺结束日期：<span>无</span></p>
            </div> 
          </div>
          <div class="questionDetail-desc-nr">
             <h4>问题</h4>
             <div class="question-content">内容</div>
          </div>
      </section >
      <section class="questionDetail-reply">
        <replyList></replyList>
      </section>
    </div>

    <div class="questionDetail-bottom">
      <btnGroup></btnGroup>
    </div>
 </div>
</template>

<script>
import replyList from '@/components/question/replyList';
import btnGroup from '@/components/question/btnGroup';
 export default {
   data () {
     return {

     }
   },
   components: {replyList,btnGroup}
 }
</script>

<style lang="less" scoped>
@import '../../index.less';
.questionDetail-top{
  height: 94vh;
  .questionDetail-desc{
  background: #fff;
  .questionDetail-detail{
    padding:1rem  1.25rem ;
    border-bottom:1px solid #E8E8E8;
    .questionDetail-desc-info{
      font-size: @fontSize12;
      .questionDetail-desc-tag{
        margin: 0.5rem 0;
      }
    }
    p{
      color: #999999;
      span{
        color: #333;
      }
    }
  }

  // 问题内容
    .questionDetail-desc-nr{
      padding:1rem  1.25rem ;
      h4{
        color: #E93546;
      }
      .question-content{
        font-size:@fontSize14;
      }
    }
  }
}

.questionDetail-bottom{
  position: absolute;
  bottom:0;
}
.questionDetail-reply{
  background: #fff; 
  padding:0.5rem  1.25rem ;
  margin: 0.5rem 0;
}
</style>
