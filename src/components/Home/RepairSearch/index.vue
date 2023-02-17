<template>
  <div class="container">
    <van-nav-bar
      title="报修单查询"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
      <div class="searchBox">
         <van-field v-model="searchValue.billCode" label="单号" placeholder="单号" />
         <van-field v-model="searchValue.carNumber" label="车牌号" placeholder="车牌号" />
         <van-field v-model="searchValue.carCode" label="车辆编号" placeholder="车辆编号" />
         <!-- <van-field v-model="value" label="单据状态" placeholder="单据状态" >
            
         </van-field> -->
         <div class="flexBetween">
            <p>审批状态</p>
              <van-dropdown-menu>
                <van-dropdown-item v-model="searchValue.apvStatus" :options="option1" />
              </van-dropdown-menu>
         </div>

         <!-- <van-field v-model="value" label="当前审批人" placeholder="当前审批人" /> -->
        <div class='flexBox'>
          <van-button round type="success" size="small" @click="resetData">重置</van-button>
          <van-button round type="success" size="small" @click="queryBillFun">查询</van-button>
        </div>
      </div>
      <div class="contantBox">
          <div class="singBox"  v-for=" (item,index) in repairData.repairArr" :key  = 'index'>
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
                    <van-icon @click="goRepair(item.id)" name="arrow" />
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from "vue";
import {useRouter} from 'vue-router';
import { onBeforeMount } from "vue";
import { getBillDropDowns as getBillDropDowns,queryBill as queryBill } from '@/api/home'
const router = useRouter()
const value1 = ref(0);
const  option1 = ref([]);
const searchValue = ref({
  apvStatus:"", //审批状态
  billCode:'', //单号
  billType:'BXD', //单据类型
  carCode:'', //车辆编号
  carNumber:'' , //车牌号
  limit:'10',// 显示条数
  pageNum:'1', //页码
  taskType:'',// 任务类型
  urgencyLevel:'' //紧急程度
})    
const repairData = ref({
    repairArr:[
    ]
}
);
const onClickLeft = ()=>{
  router.push({ path:'home'})
}
onBeforeMount(() => {
  getBillDropDown();
  queryBillFun()
});
const getBillDropDown = ()=>{
    getBillDropDowns().then((res)=>{
       if(res.code === 200){
          option1.value = res.data.apvType
          console.log(option1.value)
       }else{

       }
    })
}
/**
 * 获取查询数据（初始化/查询）
 */
const queryBillFun = ()=>{
  let obj = searchValue.value;
  queryBill(obj).then((res)=>{
    if(res.code === 200){
          repairData.value.repairArr = res.data.records
          console.log(res.data)
       }else{

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
    billType:'BXD', //单据类型
    carCode:'', //车辆编号
    carNumber:'' , //车牌号
    limit:'10',// 显示条数
    pageNum:'1', //页码
    taskType:'',// 任务类型
    urgencyLevel:'' //紧急程度
  }
  searchValue.value = obj
}  
const goRepair = (id)=>{
  router.push({
            //传递参数使用params的话，只能使用name指定(在route.js里面声明name)
            path:'/repairapply',
            query:{
              numId:id
            }
            })
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
:deep(.van-dropdown-menu__title){
  font-size: 0.37333rem;
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