<template>
    <div class="assistant-projectDetail" :style="{'height':$store.state.clienHeight+'px'}">
        <layoutCard>
            <div slot="caption">
                <h4>{{projectData.xmmc}}</h4>
                <div class="project-xm font12" flex spacearound>
                    <div col="2">
                        <van-tag round color="#F0871E">{{projectData.xmzt}}</van-tag>
                    </div>
                    <div col="7" flex-col-center>
                        <span col="3">付款进度：</span>
                        <div col="6">
                            <progressBar :percentage="projectData.dkl"></progressBar>
                        </div>
                    </div>&nbsp;&nbsp;
                    <div col="3" text-right>
                        <a  href="javascript:void(0)" @click="handleCheckDetail('dk')">查看付款明细</a>
                    </div>
                </div>
            </div>
            <div slot="detail" class="project-detail font12">
                <p flex>
                    <span col="1">
                        <span class="color999">项目编号：</span>{{projectData.xmbh}}</span>
                    <span col="1">
                        <span class="color999">合同编号：</span>{{projectData.htbh}}</span>
                </p>
                <p flex>
                    <span col="1">
                        <span class="color999">项目经理：</span>{{projectData.xmjl}}</span>
                    <span col="1">
                        <span class="color999">甲方负责人：</span>{{!projectData.jfxm?'无':projectData.jfxm}}</span>
                </p>
                <p flex>
                    <span col="1">
                        <span class="color999">服务开始日期：</span>{{!projectData.fwksrq?'无':projectData.fwksrq}}</span>
                    <span col="1">
                        <span class="color999">服务期限：</span>{{projectData.fwqx}}月</span>
                </p>
                <p flex>
                    <span col="1">
                        <span class="color999">服务状态：</span>{{projectData.gcfwzt=='0'?'已停止':'已启动'}}</span>
                    <span col="1">
                        <span class="color999">项目状态：</span>{{projectData.ztztmc}}</span>
                </p>
            </div>
        </layoutCard>

        <layoutCard>
            <div slot="caption" flex-col-center spacebetween>
                <h4>里程碑</h4>
                <div class="font12">
                    <a href="javascript:void(0)" @click="handleCheckDetail('lcb')">查看里程碑明细</a>
                </div>
            </div>
            <div slot="detail" flex>
                <div col="1" flex-column flex-col-center class="font12 project-lcb">
                    <section>
                        <div flex>
                            <span col="4">进度：</span>
                            <div col="12">
                                <progressBar :percentage="projectData.p_xmjd"></progressBar>
                            </div>
                        </div>
                    </section>
                    <section col="1" style="padding-top:10px">
                        <steps :list="projectData.jdList"></steps>
                    </section>
                </div>
                <div col="1">
                    <section class="font12 project-lcb-sort" flex-column spacearound>
                        <div flex-center>
                            <van-circle v-model="projectData.p_lcbqrl" :rate="100" :speed="100" layer-color="#ebedf0" color="#F0871E" size="76px" :stroke-width="60">
                                <div class="detail-circle" flex-column flex-row-center>
                                    <span class="fontColorOrange">{{projectData.p_lcbqrl}}%</span>
                                    <span>确认率</span>
                                </div>
                            </van-circle>
                        </div>
                        <div flex>
                            <p col="1" @click="handleCheckLcbdetial('0')">
                                <span class="colorBlue">{{projectData.dqrlcbzs}}</span><br><br>
                                <span class="color999">待确认数</span>
                            </p>
                            <p col="1" @click="handleCheckLcbdetial('1')">
                                <span class="colorBlue">{{projectData.yqrlcbzs}}</span><br><br>
                                <span class="color999">已确认数</span>
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
                    <div col="1" flex-center>
                        <van-circle v-model="projectData.p_wtyql" :rate="100" :speed="100" layer-color="#ebedf0" color="#F0871E" size="76px" :stroke-width="60">
                            <div class="detail-circle" flex-column flex-row-center>
                                <span class="fontColorOrange">{{projectData.p_wtyql}}%</span>
                                <span>延期率</span>
                            </div>
                        </van-circle>
                    </div>
                    <div col="1" flex-center>
                        <van-circle v-model="projectData.p_wtmyd" :rate="100" :speed="100" layer-color="#ebedf0" color="#29BE1E" size="76px" :stroke-width="60">
                            <div class="detail-circle" flex-column flex-row-center>
                                <span class="fontColorRreen">{{projectData.p_wtmyd}}%</span>
                                <span>满意度</span>
                            </div>
                        </van-circle>
                    </div>
                    <div col="1" flex-center>
                        <div class="project-wt-myd">
                            <p class="fontColorRreen" @click="handleClickmyl(true)">
                                <span>满意</span>&#x3000;{{projectData.wtmyzs}}</p>
                            <p class="fontColorRed" @click="handleClickmyl(false)">
                                <span>不满意</span>&#x3000;{{projectData.wtbmyzs}}</p>
                        </div>
                    </div>
                </section>
                <section flex-center class="font12 project-wt-sort">
                    <p col="1">
                        <span>{{projectData.wtwhfzs}}</span><br><br>
                        <span class="color999">未回复</span>
                    </p>
                    <p col="1">
                        <span>{{projectData.wtyqwhfzs}}</span><br><br>
                        <span class="color999">逾期未响应</span>
                    </p>
                    <p col="1">
                        <span>{{projectData.wtyqwwczs}}</span><br><br>
                        <span class="color999">逾期未完成</span>
                    </p>
                    <p col="1">
                        <span>{{projectData.wtwjjsjzs}}</span><br><br>
                        <span class="color999">无解决时间</span>
                    </p>
                </section>
            </div>
        </layoutCard>

        <layoutCard>
            <div slot="caption" flex-col-center spacebetween>
                <h4>实施任务</h4>
                <p class="font12 color999">
                    个人任务
                    <span @click="handleCheckdetial('1','5')">{{projectData.ssgrrwzs}}</span> 条 &#x3000; 未完成个人任务
                    <span @click="handleCheckdetial('1','6')">{{projectData.ssgrwwcrwzs}}</span> 条
                </p>
            </div>
            <div slot="detail" flex class="font12 project-ssrw-sort">
                <p col="1" @click="handleCheckdetial('1','2')">
                    <span class="colorBlue">{{projectData.ssrwcqs}}</span><br><br>
                    <span class="color999">已超期</span>
                </p>
                <p col="1" @click="handleCheckdetial('1','7')">
                    <span class="colorBlue">{{projectData.ssdqrrws}}</span><br><br>
                    <span class="color999">待确认任务数</span>
                </p>
                <p col="1" @click="handleCheckdetial('1','8')">
                    <span class="colorBlue">{{projectData.ssyqrrws}}</span><br><br>
                    <span class="color999">已确认任务数</span>
                </p>
                <p col="1" @click="handleCheckdetial('1','0')">
                    <span class="colorBlue">{{projectData.ssrwzs}}</span><br><br>
                    <span class="color999">总数</span>
                </p>
            </div>
        </layoutCard>

        <layoutCard>
            <div slot="caption" flex-col-center spacebetween>
                <h4>用户任务</h4>
                <p class="font12 color999">
                    个人任务
                    <span @click="handleCheckdetial('2','5')" class="colorBlue">{{projectData.yhgrrwzs}}</span> 条 &#x3000; 未完成个人任务
                    <span @click="handleCheckdetial('2','6')" class="colorBlue">{{projectData.yhgrwwcrwzs}}</span> 条
                </p>
            </div>
            <div slot="detail" flex class="font12 project-ssrw-sort">
                <p col="1">
                    <span class="colorBlue" @click="handleCheckdetial('2','2')">{{projectData.yhrwcqs}}</span><br><br>
                    <span class="color999">已超期</span>
                </p>
                <p col="1">
                    <span class="colorBlue" @click="handleCheckdetial('2','7')">{{projectData.yhdqrrws}}</span><br><br>
                    <span class="color999">待确认任务数</span>
                </p>
                <p col="1">
                    <span class="colorBlue" @click="handleCheckdetial('2','8')">{{projectData.yhyqrrws}}</span><br><br>
                    <span class="color999">已确认任务数</span>
                </p>
                <p col="1" class="colorBlue" @click="handleCheckdetial('2','0')">
                    <span>{{projectData.yhrwzs}}</span><br><br>
                    <span class="color999">总数</span>
                </p>
            </div>
        </layoutCard>

        <layoutCard>
            <div slot="caption">
                <h4>进度汇报</h4>
            </div>
            <div slot="detail" flex class="font12 project-ssrw-sort">
                <p col="1">
                    <span>{{!projectData.rbdt?0:projectData.rbdt}}</span><br><br>
                    <span class="color999">日报动态</span>
                </p>
                <p col="1">
                    <span>{{!projectData.zbdt?0:projectData.zbdt}}</span><br><br>
                    <span class="color999">周报动态</span>
                </p>
                <p col="1">
                    <span>{{!projectData.ybdt?0:projectData.ybdt}}</span><br><br>
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
      currentRate: 0,
      projectData: {},
      xmbh: ""
    };
  },
  methods: {
    handleClickmyl(params){
      this.$router.push({path:'/project/questionSatisfy',query:{xmbh:this.$route.query.xmbh,sfmy:params}})
    },
    //  查看任务详情
    handleCheckdetial(personType, filterType) {
      this.$router.push({
        name: "projectTask",
        query: {
          xmbh: this.$route.query.xmbh,
          type: personType,
          lx: filterType
        },
        params: { xmmc: this.projectData.xmmc }
      });
    },
    // 里程碑确认
    handleCheckLcbdetial(params) {
      this.$router.push({
        name: "projectTask",
        query: { xmbh: this.$route.query.xmbh, sfqr: params },
        params: { xmmc: this.projectData.xmmc }
      });
    },

    //   查看到款率
    handleCheckDetail(params) {
      
      if(params == 'dk'){
        this.$router.push({
            name: "projectDkl",
            query: { xmbh: this.$route.query.xmbh },
            params: { data: this.projectData }
        }); 
      }else{
        this.$router.push({
            name: "projectProduct",
            query: { xmbh: this.$route.query.xmbh },
            params: { data: ''}
        });   
      }
    },
    getProjectDetail() {
      this.$toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      this.$get(this.API.getXmTjRT, {
        xmbh: this.$route.query.xmbh,
        isAll: false
      }).then(res => {
        if (res.state == "success") {
          if (!res.data) {
            this.projectData = {};
          } else {
            this.projectData = res.data;
            this.projectData.dkl = res.data.dkl.split("%")[0];
          }
          this.$toast.clear();
        } else {
          this.$toast.clear();
          this.$toast(!res.msg ? "请求超时，请稍后再试~" : res.msg);
        }
      });
    }
  },
  activated() {
    if (this.xmbh != this.$route.query.xmbh) {
      this.getProjectDetail();
    }
    this.xmbh = this.$route.query.xmbh;
  },
  computed: {},
  components: { layoutCard, progressBar, steps }
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.assistant-projectDetail {
  overflow-y: auto;
  h4 {
    position: relative;
    // &::before {
    //   content: "";
    //   display:table;
    //   margin-right: 4px;
    //   border-radius: 4px;
    //   background: #007aff;
    //   height: 18px;
    //   width: 3px;
    //   position: absolute;
    //   left: -6px;
    //   top: 2px;
    // }
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
    section:nth-child(1) {
      width: 100%;
    }
  }
  .project-lcb-sort,
  .project-wt-sort,
  .project-ssrw-sort {
    p {
      text-align: center;
      margin-bottom: 0.75rem;
      span:nth-child(1) {
        font-size: 1.3rem;
        font-weight: 700;
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
  .project-wt-sort {
    margin-top: 1rem;
  }


  .fontColorRreen {
    color: #29be1e;
  }
  .fontColorRed {
    color: #e93546;
  }
  .fontColorOrange {
    color: #f0871e;
  }

  .detail-circle {
    height: 100%;
    font-size: 1rem;
    span:nth-child(2) {
      font-size: @fontSize14;
    }
  }
}
</style>
