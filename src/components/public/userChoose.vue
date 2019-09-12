<template>
  <div>
    <van-popup v-model="show" :style="{ height: '100%',width:'90%' }" :position="position" @close="handleClosePop" class="userPop">
      <div>
        <van-search
          v-model="keyword"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
          @cancel="onCancel"
        />
        <div class="userPop-list">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
          >
            <van-checkbox-group v-model="result" @change="handleCheck">
              <van-checkbox
                v-for="(item, index) in userList"
                :key="index"
                :name="item.userid+','+item.username"
              >
              <div flex spacearound class="list-flex">
                 <span>{{item.username}}</span>
                 <span>{{item.unitname}}</span>
              </div>
              </van-checkbox>
            </van-checkbox-group>
            </van-list>
        </div><br>
        <!-- <van-pagination v-model="currentPage" :page-count="total" mode="simple" /> -->
        <div flex spacearound>
          <van-button type="default" size="small" style="width:45%" @click="handleClosePop">取消</van-button>
          <van-button type="info" size="small" style="width:45%" @click="handleCommitUser">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
       currentPage:1,
       total:0,
       keyword:'',
       result:[],
       userList:[],
       userName:[],
       loading:false,
       finished:false
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "right"
    },
    unitType:{
      type: String,
      default: "1"
    },
    xmbh:{
      type: String,
      default: ""
    }
  },
  methods:{
    onLoad(){
      this.getUsers();
    },
    onSearch(){
      this.currentPage = 1;
      this.getUsers();
    },
    onCancel(){
      this.keyword = '';
    },
    getUsers() {
      this.$get(this.API.getUsers, {
        curPage: this.currentPage,
        pageSize: 15,
        xmbh:this.xmbh,
        unitType:this.unitType,
        keyword:this.keyword
      }).then(res => {
        if (res.state == "success") {
            this.total = res.data.total;
            if (!this.loading || this.currentPage == 1) {
              this.userList = res.data.rows;
            } else {
              this.userList = this.userList.concat(res.data.rows);
            }
            if (!res.data.rows) {
              this.userList = [];
            }
            if (this.currentPage >= this.total) {
              this.finished = true;
            } else {
              this.finished = false;
            }
            this.loading = false;
            this.currentPage += 1;
        } else {

        }
      });
    },
    handleClosePop(){
      this.$emit('handleClosePop','');
    },
    handleCommitUser(){
      this.$emit('handleCheckUser',this.userName,this.result);
    },
    handleCheck(val){
      this.userName = [];
      val.forEach(ele=>{
        this.userName.push(ele.split(',')[1]);
      })
    }
  },
  watch:{
    show:function(n,o){
      if(!!n){
        if(!this.userList.length){
          this.getUsers();
        }
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.userPop{
  background: #f5f5f5;
}
.userPop-list{
  padding:0.5rem;
  background: #fff;
  margin: 1rem 0 0 0;
  height: 80vh;
  overflow-y: auto;
  .van-checkbox{
    border-bottom: 1px solid #ebedf0;
    padding: 0.5rem 0;
  }
  .list-flex{
    width: 70vw;
    font-size: 0.85rem;
     span{
        display: inline-block;
        width: 50%;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
     }
  }
}
</style>
