<template>
    <div class="assistant-projectDetail">
        <layoutCard>
            <div slot="caption">
                <h4>南京农业大学学生工作信息化建设综合服务</h4>
                <div class="project-xm font12" flex spacearound>
                    <div col="1">
                        <van-tag round color="#F0871E">在建</van-tag>
                    </div>
                    <div col="4" flex-col-center>
                        <span col="2">付款进度：</span>
                        <div col="4">
                            <progressBar></progressBar>
                        </div>
                    </div>
                    <div col="2" text-right>
                        <a href="javaScrip:;;">查看付款明细></a>
                    </div>
                </div>
            </div>
            <div slot="detail" class="project-detail font12">
                <p flex>
                    <span col="1">
                        <span class="color999">项目编号：</span>UK12354</span>
                    <span col="1">
                        <span class="color999">合同编号：</span>UK12354</span>
                </p>
                <p flex>
                    <span col="1">
                        <span class="color999">项目经理：</span>张三(01118888)</span>
                    <span col="1">
                        <span class="color999">甲方负责人：</span>李四</span>
                </p>
                <p flex>
                    <span col="1">
                        <span class="color999">服务开始日期：</span>2018-8-8</span>
                    <span col="1">
                        <span class="color999">服务期限：</span>2</span>
                </p>
                <p flex>
                    <span col="1">
                        <span class="color999">服务状态：</span>一起动</span>
                    <span col="1">
                        <span class="color999">项目状态：</span>一起动</span>
                </p>
            </div>
        </layoutCard>

        <layoutCard>
            <div slot="caption" flex-col-center spacebetween>
                <h4>里程碑</h4>
                <div class="font12">
                    <a href="javaScrip:;;">查看里程碑明细></a>
                </div>
            </div>
            <div slot="detail">
                <div flex-col-center class="font12">
                    <span col="2">进度：</span>
                    <div col="14">
                        <progressBar></progressBar>
                    </div>
                </div>
                <div flex class="project-lcb">
                    <section col="1">
                        <steps></steps>
                    </section>
                    <section col="1" class="font12 project-lcb-sort">
                        <div flex>
                            <p col="1">
                                <span>100</span><br>
                                <span class="color999">已完成数</span>
                            </p>
                            <p col="1">
                                <span>100</span><br>
                                <span class="color999">未完成数</span>
                            </p>
                        </div>
                        <div flex>
                            <p col="1">
                                <span>100</span><br>
                                <span class="color999">已完成数</span>
                            </p>
                            <p col="1">
                                <span>100</span><br>
                                <span class="color999">未完成数</span>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </layoutCard>

        <layoutCard>
            <div slot="caption">
                <h4>问题</h4>
            </div>
            <div slot="detail">
                <section flex>
                    <div col="1">
                        <van-circle v-model="currentRate" :rate="90" :speed="100" layer-color="#ebedf0" color="#F0871E" size="76px" :stroke-width="60" :text="yqlText" />
                    </div>
                    <div col="1">
                        <van-circle v-model="currentRate" :rate="90" :speed="100" layer-color="#ebedf0" color="#29BE1E" size="76px" :stroke-width="60" :text="mydText" />
                    </div>
                    <div col="1" flex-center>
                        <div class="project-wt-myd">
                            <p class="fontColorRreen">
                                <span>满意</span>&#x3000;32</p>
                            <p class="fontColorRed">
                                <span>不满意</span>&#x3000;32</p>
                        </div>
                    </div>
                </section>
                <section flex-center  class="font12 project-wt-sort">
                    <p col="1">
                        <span>123</span><br>
                        <span class="color999">未回复</span>
                    </p>
                    <p col="1">
                        <span>123</span><br>
                        <span class="color999">逾期未响应</span>
                    </p>
                    <p col="1">
                        <span>123</span><br>
                        <span class="color999">预期未完成</span>
                    </p>
                    <p col="1">
                        <span>123</span><br>
                        <span class="color999">无解决时间</span>
                    </p>
                </section>
            </div>
        </layoutCard>

        <layoutCard>
            <div slot="caption" flex-col-center spacebetween>
                <h4>实施任务</h4>
                <p class="font12 color999">
                   个人任务 0 条 &#x3000;未完成个人任务 0 条   
                </p>
            </div>
            <div slot="detail" flex class="font12 project-ssrw-sort">
                <p col="1">
                    <span>123</span><br>
                    <span class="color999">已完成数</span>
                </p>
                <p col="1">
                    <span>123</span><br>
                    <span class="color999">未完成数</span>
                </p>
                <p col="1">
                    <span>123</span><br>
                    <span class="color999">待关闭数</span>
                </p>
                <p col="1">
                    <span>123</span><br>
                    <span class="color999">已超期数</span>
                </p> 
            </div>
        </layoutCard>

        <layoutCard>
            <div slot="caption" flex-col-center spacebetween>
                <h4>甲方任务</h4>
                <p class="font12 color999">
                   个人任务 0 条 &#x3000;未完成个人任务 0 条   
                </p>
            </div>
            <div slot="detail" flex class="font12 project-ssrw-sort">
                 <p col="1">
                    <span>123</span><br>
                    <span class="color999">已完成数</span>
                </p>
                <p col="1">
                    <span>123</span><br>
                    <span class="color999">未完成数</span>
                </p>
                <p col="1">
                    <span>123</span><br>
                    <span class="color999">待关闭数</span>
                </p>
                <p col="1">
                    <span>123</span><br>
                    <span class="color999">已超期数</span>
                </p> 
            </div>
        </layoutCard>

        <layoutCard>
            <div slot="caption" >
                <h4>进度汇报</h4>
            </div>
            <div slot="detail" flex class="font12 project-ssrw-sort">
                 <p col="1">
                    <span>123</span><br>
                    <span class="color999">日报动态</span>
                </p>
                <p col="1">
                    <span>123</span><br>
                    <span class="color999">周报动态</span>
                </p>
                <p col="1">
                    <span>123</span><br>
                    <span class="color999">月报动态</span>
                </p>
            </div>
        </layoutCard>
    </div>
</template>

<script>
import layoutCard from "@/components/layout/card.vue";
import progressBar from "@/components/public/progress.vue";
import steps from "@/components/project/process.vue";
export default {
  data() {
    return {
      currentRate: 0
    };
  },
  computed: {
    yqlText() {
      return this.currentRate.toFixed(0) + "%";
    },
    mydText() {
      return this.currentRate.toFixed(0) + "%";
    }
  },
  components: { layoutCard, progressBar, steps }
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.assistant-projectDetail {
  h4 {
    &::before {
      content: "";
      border: 2px solid #007aff;
      margin-right: 4px;
      border-radius: 3px;
    }
  }
  .project-xm {
    margin: 0.5rem 0;
  }
  .project-detail {
    p {
      margin-bottom: 0.333rem;
    }
  }
  // 里程碑
  .project-lcb {
    padding: 0.85rem 0 0 0;
  }
  .project-lcb-sort,
  .project-wt-sort ,
  .project-ssrw-sort{
    p {
      text-align: center;
      margin-bottom: 0.75rem;
      span:nth-child(1) {
        font-size: 1.3rem;
      }
    }
  }

  // 问题
  .project-wt-myd {
    p {
      font-weight: 700;
      font-size: @fontSize14;
      span {
        display: inline-block;
        width: 50px;
      }
    }
  }
  .project-wt-sort{
      margin-top: 1rem;
  }

  .font12 {
    font-size: @fontSize12;
  }
  .fontColorRreen {
    color: #29be1e;
  }
  .fontColorRed {
    color: #e93546;
  }
}
</style>
