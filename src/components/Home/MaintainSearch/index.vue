<template>
  <div class="container">
    <van-nav-bar
      title="保养单查询"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
      <div class="searchBox">
          <van-field v-model="searchValue.billCode" label="单号" placeholder="单号" />
         <van-field v-model="searchValue.carNumber" label="车牌号" placeholder="车牌号" />
         <van-field v-model="searchValue.carCode" label="车辆编号" placeholder="车辆编号" />
         <div class="flexBetween">
            <p>审批状态</p>
              <van-dropdown-menu>
                <van-dropdown-item v-model="searchValue.apvStatus" :options="option1" />
              </van-dropdown-menu>
         </div>
        <div class='flexBox'>
          <van-button round type="success" size="small" @click="resetData">重置</van-button>
          <van-button round type="success" size="small" @click="queryBillFun(currentLength)">查询</van-button>
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
                    {{item.billCode}}
                </p>
                <p class="zhuangtai">
                    {{item.apvStatusLbl}}
                </p>
              </div>
              <div class="bottomBox">
                  <div class="leftBox">
                    <div class="rowMsg">
                      <p>车牌号:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                      <p>{{item.carNumber}}</p>
                    </div>
                    <div class="rowMsg">
                      <p>车辆编号:&nbsp;&nbsp;</p>
                      <p>{{item.carCode}}</p>
                    </div>
                     <div class="rowMsg">
                      <p>品牌型号:&nbsp;&nbsp;</p>
                      <p>{{item.carBrandType}}</p>
                    </div>
                    <div class="rowMsg">
                      <p>发起时间:&nbsp;&nbsp;</p>
                      <p>{{item.createdDate}}</p>
                    </div>
                  </div>
                  <div class="rightArrow">
                    <van-icon @click="goMaintain(item.id)" name="arrow" />
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
import { getBillDropDowns as getBillDropDowns,queryBill as queryBill } from '@/api/home'
import {getCurrentInstance} from 'vue'
const {proxy} = getCurrentInstance();
const router = useRouter()
const  option1 = ref([]);
const loading = ref(false);
const finished = ref(false);
const currentLength = ref('0')
const searchValue = ref({
  apvStatus:"", //审批状态
  billCode:'', //单号
  billType:'BYD', //单据类型
  carCode:'', //车辆编号
  carNumber:'' , //车牌号
  length:0,
  taskType:'',// 任务类型
  urgencyLevel:'' //紧急程度
})    
const repairArr = ref([]);
const onClickLeft = ()=>{
  router.go(-1)
}
onBeforeMount(() => {
  getBillDropDown();
  queryBillFun(currentLength.value)
});
const getBillDropDown = ()=>{
    getBillDropDowns().then((res)=>{
       if(res.code === 200){
          option1.value = res.data.apvType
          console.log(option1.value)
       }else{
               proxy.$toast({
                    message: res.msg,
              })
       }
    })
}
const goMaintain = (id)=>{
  router.push({
            //传递参数使用params的话，只能使用name指定(在route.js里面声明name)
            path:'/maintainapply',
            query:{
              numId:id
            }
            })
}
/**
 * 重置
 */
const resetData =()=>{
  let obj = {
    apvStatus:"", //审批状态
    billCode:'', //单号
    billType:'BYD', //单据类型
    carCode:'', //车辆编号
    carNumber:'' , //车牌号
    length:0,
    taskType:'',// 任务类型
    urgencyLevel:'' //紧急程度
  }
  searchValue.value = obj
}  
/**
 * 获取查询数据（初始化/查询）
 */
const queryBillFun = (length)=>{
   let obj = searchValue.value;
   obj.length = length
  queryBill(obj).then((res)=>{
    if(res.code === 200){
          repairArr.value = JSON.parse(JSON.stringify(repairArr.value)).concat(res.data.records)
          currentLength.value = repairArr.value.length>0?repairArr.value.length:0
          loading.value = false;
          if(repairArr.value.length>=res.data.total){
              finished.value = true;
           }
      }else{
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
     queryBillFun(currentLength.value)
   
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
:deep(.van-dropdown-menu__bar){
  background: #ffffff;
  box-shadow: none;
}
.flexBetween{
  // border-bottom: 0.02667rem solid #ebedf0;
  margin: 0.05rem 0.52667rem 0 0.42667rem;
  height: 1.1538rem;
  p{
    font-size: 0.37333rem;
    color: #646566;
    
  }
}
</style>