<template>
  <div class="container">
    <van-nav-bar title="任务"  left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="search" size="18" @click="searchIcon"/>
      </template>
    </van-nav-bar>
    <van-tabs class="tabsBox" v-model:active="activeName"  @click-tab="onClickTab">
      <van-tab  name="DTJ" title="待提交">
        <van-list
                v-model:loading="loading"
                :finished="finished"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="onLoad"
              >
              <SearchResult :arrData = 'tijiaoData'/>
        </van-list>
      </van-tab>
      <van-tab name="DFP" title="待分配">
          <van-list
                v-model:loading="loading"
                :finished="finished"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="onLoad"
              >
              <SearchResult :arrData = 'tijiaoData'/>
          </van-list>
        </van-tab>
      <van-tab name="DPX" title="待派修">
          <van-list
                  v-model:loading="loading"
                  :finished="finished"
                  :immediate-check="false"
                  finished-text="没有更多了"
                  @load="onLoad"
                >
            <SearchResult :arrData = 'tijiaoData'/>
          </van-list>
         </van-tab>
      <van-tab name="DYS" title="待验收">
        <van-list
                  v-model:loading="loading"
                  :finished="finished"
                  :immediate-check="false"
                  finished-text="没有更多了"
                  @load="onLoad"
                >
                <SearchResult :arrData = 'tijiaoData'/>
        </van-list>
      </van-tab>
      <van-tab name="DWB" title="待维保">
        <van-list
                  v-model:loading="loading"
                  :finished="finished"
                  :immediate-check="false"
                  finished-text="没有更多了"
                  @load="onLoad"
                >
                <SearchResult :arrData = 'tijiaoData'/>
        </van-list>
      </van-tab>
      <van-tab name="WBZ" title="维保中"><van-list
                  v-model:loading="loading"
                  :finished="finished"
                  :immediate-check="false"
                  finished-text="没有更多了"
                  @load="onLoad"
                >
                <SearchResult :arrData = 'tijiaoData'/>
        </van-list></van-tab>
      <van-tab name="YCL" title="已处理">
        <van-list
                  v-model:loading="loading"
                  :finished="finished"
                  :immediate-check="false"
                  finished-text="没有更多了"
                  @load="onLoad"
                >
                <SearchResult :arrData = 'tijiaoData'/>
        </van-list>
      </van-tab>
      <van-tab name="YYS" title="已验收">
        <van-list
                  v-model:loading="loading"
                  :finished="finished"
                  :immediate-check="false"
                  finished-text="没有更多了"
                  @load="onLoad"
                >
                <SearchResult :arrData = 'tijiaoData'/>
        </van-list>
      </van-tab>
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
          <van-button round type="success" size="small" @click="queryVioRecordFun('0')">查询</van-button>
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
const loading = ref(false);
const finished = ref(false);
const currentLength = ref('0')
const searchValue = ref({
  "apvStatus": "",
  "billCode": "",
  "billType": "",
  "carCode": "",
  "carNumber": "",
  length:'0',
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
  length:'0',
  "taskType": "",
  "urgencyLevel": ""
  }
  searchValue.value = obj
}
const onClickLeft = ()=>{
  router.go(-1)
}
const queryVioRecordFun = (length)=>{ 
  searchValue.value.taskType = activeName.value
  if(length === '0'){
     tijiaoData.value = []
   }
  queryTask(searchValue.value).then((res)=>{
    isShowSearchBOx.value = false;
    resetData()
    if(res.code === 200){
        tijiaoData.value = JSON.parse(JSON.stringify(tijiaoData.value)).concat(res.data.records)
       currentLength.value = tijiaoData.value.length>0?tijiaoData.value.length:0;
       loading.value = false;
       if(tijiaoData.value.length>=res.data.total){
              finished.value = true;
           }
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
  currentLength.value='0'
  getData()
})
const getData = ()=>{
    let obj={
        length:currentLength.value,
        "taskType": activeName.value,
      }
      if(obj.length === '0'){
        tijiaoData.value = []
      }
      getTaskDataByBillType(obj).then((res)=>{
        if(res.code === 200){
              tijiaoData.value = JSON.parse(JSON.stringify(tijiaoData.value)).concat(res.data.records)
              currentLength.value = tijiaoData.value.length>0?tijiaoData.value.length:0;
              loading.value = false;
              if(tijiaoData.value.length>=res.data.total){
                      finished.value = true;
              }
        }else {
                  proxy.$toast({
                        message: res.msg,
                  })
        }
      })
}
const onClickTab = ({name}) => {
    activeName.value = name;
    currentLength.value = '0';
    loading.value = false;
    finished.value = true;
    getData()
}
const isShowSearchBOx = ref(false)

const tijiaoData = ref([])


const searchIcon = () => {
  isShowSearchBOx.value = true
}

/**
 * 加载更多
 */
 const onLoad = () => {
    getData()
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