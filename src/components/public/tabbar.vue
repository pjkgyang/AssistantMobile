<template>
    <div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <!-- <van-tabbar v-model="active">
            <van-tabbar-item icon="wap-home">项目</van-tabbar-item>
            <van-tabbar-item icon="question2">问题</van-tabbar-item>
            <van-tabbar-item icon="more">工作台</van-tabbar-item>
            <van-tabbar-item icon="chat">通知</van-tabbar-item>
            <van-tabbar-item icon="contact">我的</van-tabbar-item>
        </van-tabbar> -->
        <mu-container class="tabbar">
            <mu-bottom-nav :value.sync="active">
                <mu-bottom-nav-item value="item" title="项目" icon="layers"></mu-bottom-nav-item>
                <mu-bottom-nav-item value="question" title="问题" icon="help"></mu-bottom-nav-item>
                <mu-bottom-nav-item value="chat" title="通知" icon="textsms"></mu-bottom-nav-item>
                <mu-bottom-nav-item value="contact" title="我的" icon="person"></mu-bottom-nav-item>
                <mu-bottom-nav-item value="more" title="更多" icon="menu"></mu-bottom-nav-item>
            </mu-bottom-nav>
        </mu-container>
    </div>
</template>

<script>

export default {
  data() {
    return {
      active:'more'
    };
  },
  components: {}
};
</script>

<style scoped>
.tabbar{
    position: fixed;
    bottom: 0;
}
</style>
