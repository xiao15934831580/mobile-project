<template>
  <router-view />

  <van-tabbar route>
    <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/task" icon="search">任务</van-tabbar-item>
    <van-tabbar-item replace to="/my" icon="search">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>

</script>

<style>
</style>
