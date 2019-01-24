<template>
    <div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <mu-container class="tabbar">
            <mu-bottom-nav :value.sync="active" @change="handleChangePannel">
                <mu-bottom-nav-item value="project" title="项目" icon="layers"></mu-bottom-nav-item>
                <mu-bottom-nav-item value="more" title="工作台" icon="menu"></mu-bottom-nav-item>
                <mu-bottom-nav-item value="question" title="问题" icon="help"></mu-bottom-nav-item>
                <!-- <mu-bottom-nav-item value="message" title="通知" icon="textsms"></mu-bottom-nav-item> -->
                <mu-bottom-nav-item v-if="lx == 3 || $store.state.userInfo.userGroupTag.includes('JYGL') "  value="contact" title="我的" icon="person"></mu-bottom-nav-item>
                <!--  || $store.state.userInfo.userGroupTag.includes('JYGL') -->
            </mu-bottom-nav>
        </mu-container>
    </div>
</template>

<script>

export default {
  data() {
    return {
      active:'more',
      lx:''
    };
  },
  methods:{
    handleChangePannel(value){
        this.$router.push({
            path:value=='project'?'/project':
            value=='question'?'/question':
            value=='more'?'/more':
            value=='message'?'/message':'/mine'
        })
    }
  },
  watch:{
      '$route':function(from,to){
         switch(from.name){
             case 'Project':
                this.active = 'project';
             break;
             case 'Question':
                this.active = 'question';
             break;
             case 'More':
                this.active = 'more';
             break;
             case 'Message':
                this.active = 'message';
             break;
             case 'Mine':
                this.active = 'contact';
             break;
         }
      }
  },
  mounted(){
      switch(this.$route.name){
             case 'Project':
                this.active = 'project';
             break;
             case 'Question':
                this.active = 'question';
             break;
             case 'More':
                this.active = 'more';
             break;
             case 'Message':
                this.active = 'message';
             break;
             case 'Mine':
                this.active = 'contact';
             break;
         }
  },
  activated(){
      this.lx = sessionStorage.getItem('lx');
  },
  components: {}
};
</script>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
}
</style>
