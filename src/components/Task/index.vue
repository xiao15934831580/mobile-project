<template>
  <div class="container">
    <van-nav-bar title="任务"  left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="search" size="18" @click="searchIcon"/>
      </template>
    </van-nav-bar>
    <van-tabs class="tabsBox" v-model:active="activeName"  @click-tab="onClickTab">
      <van-tab  name="DTJ" title="待提交">
        <SearchResult :arrData = 'searchData.tijiaoData'/>
      </van-tab>
      <van-tab name="DFP" title="待分配"><SearchResult :arrData = 'searchData.tijiaoData'/></van-tab>
      <van-tab name="DPX" title="待派修"><SearchResult :arrData = 'searchData.tijiaoData'/></van-tab>
      <van-tab name="DYS" title="待验收"><SearchResult :arrData = 'searchData.tijiaoData'/></van-tab>
      <van-tab name="DWB" title="待维保"><SearchResult :arrData = 'searchData.tijiaoData'/></van-tab>
      <van-tab name="WBZ" title="维保中"><SearchResult :arrData = 'searchData.tijiaoData'/></van-tab>
      <van-tab name="YCL" title="已处理"><SearchResult :arrData = 'searchData.tijiaoData'/></van-tab>
      <van-tab name="YYS" title="已验收"><SearchResult :arrData = 'searchData.tijiaoData'/></van-tab>
      <!-- <van-tab name="baoxiu" title="已报修">内容 3</van-tab> -->
    </van-tabs>
  </div>
  <van-popup  v-model:show="isShowSearchBOx" position="right" :style="{  height: '100%',width:'65%' }" closeable
      close-icon="close">
    <div class="searchBox">
         <van-field v-model="searchValue.billCode" label="单号" placeholder="单号" />
         <van-field v-model="searchValue.carNumber" label="车牌号" placeholder="车牌号" />
         <van-field v-model="searchValue.carCode" label="车辆编号" placeholder="车辆编号" />
         <van-field v-model="searchValue.apvStatusLbl" label="单据状态" placeholder="单据状态" />
         <van-field v-model="searchValue.approver" label="当前审批人" placeholder="当前审批人" />
        <div class='flexBox'>
          <van-button round type="success" size="small" @click="resetData">重置</van-button>
          <van-button round type="success" size="small" @click="queryVioRecordFun">查询</van-button>
        </div>
      </div>
  </van-popup>
</template>

<script setup>
import {ref,watch,onBeforeMount} from "vue";
import SearchResult from '../SearchResult/index.vue';
import { useRouter } from "vue-router";
import { getTaskDataByBillType as getTaskDataByBillType,queryTask  as queryTask} from '@/api/home'
import {getCurrentInstance} from 'vue'
const {proxy} = getCurrentInstance();
const router = useRouter();
const activeName = ref('DTJ')
const searchValue = ref({
  "apvStatus": "",
  "billCode": "",
  "billType": "",
  "carCode": "",
  "carNumber": "",
  length:0,
  "taskType": "",
  "urgencyLevel": ""
})
const resetData = ()=>{
  let obj = {
    "apvStatus": "",
  "billCode": "",
  "billType": "",
  "carCode": "",
  "carNumber": "",
  length:0,
  "taskType": "",
  "urgencyLevel": ""
  }
  searchValue.value = obj
}
const onClickLeft = ()=>{
  router.go(-1)
}
const queryVioRecordFun = ()=>{
  searchValue.value.taskType = activeName.value
  queryTask(searchValue.value).then((res)=>{
    isShowSearchBOx.value = false;
    resetData()
    if(res.code === 200){
       searchData.value.tijiaoData = res.data.records
    }else{
              proxy.$toast({
                    message: res.msg,
              })
    }
  })
}
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
onBeforeMount(() => {
  let obj={
    length:0,
    "taskType": activeName.value,
  }
  getTaskDataByBillType(obj).then((res)=>{
    if(res.code === 200){
      searchData.value.tijiaoData = res.data.records
    }else {
              proxy.$toast({
                    message: res.msg,
              })
    }
  })
})
const onClickTab = ({name}) => {
    let obj={
    length:0,
    "taskType": name,
  }
  getTaskDataByBillType(obj).then((res)=>{
    if(res.code === 200){
      searchData.value.tijiaoData = res.data.records
    }else {
              proxy.$toast({
                    message: res.msg,
              })
    }
  })
}
const isShowSearchBOx = ref(false)

const searchData = ref({
  tijiaoData: [
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