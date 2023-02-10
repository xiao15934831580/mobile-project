<template>
  <div class="container">
    <van-nav-bar title="任务"  left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="search" size="18" @click="searchIcon"/>
      </template>
    </van-nav-bar>
    <van-tabs class="tabsBox" v-model:active="activeName">
      <van-tab  name="tijiao" title="待提交">
        <SearchResult :arrData = 'searchData.tijiaoData'/>
      </van-tab>
      <van-tab name="fenpei" title="待分配"><SearchResult :arrData = 'searchData.tijiaoData'/></van-tab>
      <van-tab name="paixiu" title="待派修"><SearchResult :arrData = 'searchData.tijiaoData'/></van-tab>
      <van-tab name="yanshou" title="待验收"><SearchResult :arrData = 'searchData.tijiaoData'/></van-tab>
      <van-tab name="weibao" title="待维保">内容 2</van-tab>
      <van-tab name="weixiu" title="维修中">内容 3</van-tab>
      <van-tab name="chuli" title="已处理">内容 2</van-tab>
      <van-tab name="yiyanshou" title="已验收">内容 3</van-tab>
    </van-tabs>
  </div>
  <van-popup  v-model:show="isShowSearchBOx" position="right" :style="{  height: '100%',width:'65%' }" closeable
      close-icon="close">
    <div class="searchBox">
         <van-field v-model="value" label="单号" placeholder="单号" />
         <van-field v-model="value" label="车牌号" placeholder="车牌号" />
         <van-field v-model="value" label="车辆编号" placeholder="车辆编号" />
         <van-field v-model="value" label="单据状态" placeholder="单据状态" />
         <van-field v-model="value" label="当前审批人" placeholder="当前审批人" />
        <div class='flexBox'>
          <van-button round type="success" size="small">重置</van-button>
          <van-button round type="success" size="small">查询</van-button>
        </div>
      </div>
  </van-popup>
</template>

<script setup>
import {ref,watch} from "vue";
import SearchResult from '../SearchResult/index.vue';
import { useRouter } from "vue-router";
const router = useRouter();
const activeName = ref('tijiao')
watch(
  () => router.currentRoute.value.query,
  (newValue) => {
    console.log("newValue", newValue);
    if (newValue.activeName) {
      // 数据详情
       activeName.value = newValue.activeName
    }
  },
  { immediate: true }
);
const isShowSearchBOx = ref(false)

const searchData = ref({
  tijiaoData: [
          {
            addNumber: "111", //报修单号
            vehicleNumber:'56465454', //车辆编号
            licensePlateNumber:'45454', //车牌号
            modelNumber:'fsdf87', //品牌型号
            startTime:'2023-03-02 14:02:46', //发起时间
            state:'待提交', //状态
            id:'1'
          },{
            addNumber: "111", //报修单号
            vehicleNumber:'56465454', //车辆编号
            licensePlateNumber:'45454', //车牌号
            modelNumber:'fsdf87', //品牌型号
            startTime:'2023-03-02 14:02:46', //发起时间
            state:'待提交', //状态
            id:'2'
          },{
            addNumber: "111", //报修单号
            vehicleNumber:'56465454', //车辆编号
            licensePlateNumber:'45454', //车牌号
            modelNumber:'fsdf87', //品牌型号
            startTime:'2023-03-02 14:02:46', //发起时间
            state:'待提交', //状态
            id:'2'
          },{
            addNumber: "111", //报修单号
            vehicleNumber:'56465454', //车辆编号
            licensePlateNumber:'45454', //车牌号
            modelNumber:'fsdf87', //品牌型号
            startTime:'2023-03-02 14:02:46', //发起时间
            state:'待提交', //状态
            id:'2'
          },{
            addNumber: "111", //报修单号
            vehicleNumber:'56465454', //车辆编号
            licensePlateNumber:'45454', //车牌号
            modelNumber:'fsdf87', //品牌型号
            startTime:'2023-03-02 14:02:46', //发起时间
            state:'待提交', //状态
            id:'2'
          }
    ]
})
const searchIcon = () => {
  isShowSearchBOx.value = true
}
</script>

<style lang="less" scoped>
.searchBox{
  background-color: #ffffff;
  padding-bottom: 24px;
  padding-top: 16px;
  margin-top: 64px;
}
.flexBox{
  margin-top: 24px;
  button{
    width: 30%;
  }
}
.container{
    display: flex;
    flex-direction: column;
    height: calc(100vh - 1.3rem);
    .tabsBox{
      width: 100%;
      flex: 1;
      overflow-y: scroll;
//       height: calc(100% - 47.828px);
      display: flex;
      flex-direction: column;
    }
}
:deep(.van-tabs__content){
  flex: 1;
  overflow-y: auto;
}
:deep(.contantBox){
  margin-top: 0;
}
:deep(.van-tabs--line .van-tabs__wrap){
  margin: .16rem 0;
}
</style>