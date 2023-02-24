<template>
  <div class="container">
    <van-nav-bar
      title="外来人员登记记录"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
      <div class="searchBox">
         <van-field v-model="searchValue.company" label="违规人所属公司" placeholder="违规人所属公司" />
         <van-field v-model="searchValue.receiver" label="接待人" placeholder="接待人" />
          <div class='flexBox'>
            <van-button round type="success" size="small" @click="resetData">重置</van-button>
            <van-button round type="success" size="small" @click="searchData(currentLength)">查询</van-button>
          </div>
      </div>
      <div class="contantBox">
        <van-list
            v-model:loading="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
          <div class="singBox"  v-for=" (item,index) in repairArr" :key  = 'index'>
              <div class="topBox">
                <p class="danhao">
                    {{item.company}}
                </p>
                <p class="zhuangtai">
                    {{item.leader}}
                </p>
              </div>
              <div class="bottomBox">
                  <div class="leftBox">
                    <!-- <div class="rowMsg">
                      <p>所属公司:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                      <p>{{item.licensePlateNumber}}</p>
                    </div>
                    <div class="rowMsg">
                      <p>负责人:&nbsp;&nbsp;</p>
                      <p>{{item.vehicleNumber}}</p>
                    </div> -->
                     <div class="rowMsg">
                      <p>接待人:&nbsp;&nbsp;</p>
                      <p>{{item.receiver}}</p>
                    </div>
                    <div class="rowMsg">
                      <p>接待人电话:&nbsp;&nbsp;</p>
                      <p>{{item.receiverPhoneNum}}</p>
                    </div>
                    <div class="rowMsg">
                      <p>入场时间:&nbsp;&nbsp;</p>
                      <p>{{item.visitTime}}</p>
                    </div>
                  </div>
                  <div class="rightArrow">
                    <van-icon @click="goOutperson(item.id)" name="arrow" />
                  </div>
              </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from "vue";
import {useRouter} from 'vue-router';
import { onBeforeMount } from "vue";
import { queryVisRecord as queryVisRecord} from '@/api/home'
import {getCurrentInstance} from 'vue'
const {proxy} = getCurrentInstance();
const router = useRouter()
const loading = ref(false);
const finished = ref(false);
const currentLength = ref('0')
const repairArr = ref([]);
const searchValue = ref({
  "company": "",
  length:0,
  "receiver": ""
})

const onClickLeft = ()=>{
  router.go(-1)
}
onBeforeMount(() => {
  searchData(currentLength.value)
});
const goOutperson = (id)=>{
  router.push({
            //传递参数使用params的话，只能使用name指定(在route.js里面声明name)
            path:'/outperson',
            query:{
              numId:id
            }
            })
}
const resetData = ()=>{
  let obj ={
  "company": "",
  length:0,
  "receiver": ""
  }
  searchValue.value = obj
}
const searchData =(length)=>{
    let obj = searchValue.value;
   obj.length = length
  queryVisRecord(obj).then((res)=>{
    if(res.code === 200){
          repairArr.value = JSON.parse(JSON.stringify(repairArr.value)).concat(res.data.records)
          currentLength.value = repairArr.value.length>0?repairArr.value.length:0
          loading.value = false;
          if(repairArr.value.length>=res.data.total){
              finished.value = true;
           }
    }else {
      proxy.$toast({
                    message: res.msg,
              })
    }
  })
}
/**
 * 加载更多
 */
 const onLoad = () => {
     loading.value = true;
     searchData(currentLength.value)
 }
</script>

<style lang="less" scoped>
:deep(.van-search){
    padding: 0;
}
.tableHeader {
  color: #666;
  font-size: 32px;
  margin: 16px;
}
.container{
    display: flex;
    height: 100vh;
    flex-direction: column;
    .main{
        width: 100%;
        flex: 1;
        overflow-y: scroll;
        .contantBox{
          margin-top: 32px;
          .singBox{
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            padding: 16px;
            border-bottom: 0.02667rem solid #ebedf0;
            .topBox{
              display: flex;
              justify-content: space-between;
              // border-bottom: 0.02667rem solid #ebedf0;
              padding-bottom: 16px;
              p{
                font-size: 0.37333rem;
                color: #646566;
              }
            }
            .bottomBox{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .leftBox{
                  width: 80%;
                  .rowMsg{
                    width: 100%;
                    display: flex;
                    margin: 16px 0;
                     p{
                      font-size: 0.2rem;
                      color: #646566;
                      float: left;
                      }
                  }

                }
                .rightArrow{
                  width: 10%;
                  font-size: 0.37333rem;
                  color: #646566;
                }
            }
          }
        }
    }
}
:deep(.van-icon) {
  color: #666;
}
:deep(.van-switch--on) {
  height: 48px;
  width: 108px;
}
:deep(.van-switch--on .van-switch__node) {
  height: 44px;
  width: 44px;
}
:deep(.van-cell-group--inset) {
  margin: 0;
}
.cardBox {
  padding-top: 90px;
  background-color: #ffffff;
  margin: 32px;
  border-radius: 0.21333rem;
  position: relative;
  .closeFault{
    font-size: 28px;
    position: absolute;
    top: 32px;
    right: 32px;
  }
  .tableIndex{
    font-size: 28px;
    position: absolute;
    top: 32px;
    left: 32px;
    font-weight: 600;
  }
}
:deep(.van-button--round){
  width: 35%;
}
.addFault{
  font-size: 32px;
  margin: 0 32px;
  display: block;
}
.searchBox{
  background-color: #ffffff;
  padding-bottom: 24px;
  padding-top: 16px;
}
.flexBox{
  margin-top: 24px;
}
</style>