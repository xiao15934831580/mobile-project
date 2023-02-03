<template>
  <div class = 'container'>
      <div class = 'header'>我是主页</div>
      <div class = 'main'><router-view /></div>
      <div class = 'footer'>
          <van-tabbar route>
              <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
              <van-tabbar-item replace to="/task" icon="search">任务</van-tabbar-item>
              <van-tabbar-item replace to="/my" icon="search">我的</van-tabbar-item>
          </van-tabbar>
      </div>
  </div>

</template>

<script setup>
import Footer from '../Footer/index.vue';
</script>

<style lang="less" scoped>
.container{
    display: flex;
    height: 100vh;
    flex-direction: column;
    .footer{
       height: 40px;
      width: 100%;
    }
    .main{
        width: 100%;
        flex: 1;
        overflow-y: scroll;
    }
}

</style>