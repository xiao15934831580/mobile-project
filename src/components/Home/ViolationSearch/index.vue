<template>
  <div class="container">
    <van-nav-bar
      title="违规历史记录"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
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
      <div class="contantBox">
          <div class="singBox"  v-for=" (item,index) in repairData.repairArr" :key  = 'index'>
              <div class="topBox">
                <p class="danhao">
                    {{item.addNumber}}
                </p>
                <p class="zhuangtai">
                    {{item.state}}
                </p>
              </div>
              <div class="bottomBox">
                  <div class="leftBox">
                    <div class="rowMsg">
                      <p>车牌号:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                      <p>{{item.licensePlateNumber}}</p>
                    </div>
                    <div class="rowMsg">
                      <p>车辆编号:&nbsp;&nbsp;</p>
                      <p>{{item.vehicleNumber}}</p>
                    </div>
                     <div class="rowMsg">
                      <p>品牌型号:&nbsp;&nbsp;</p>
                      <p>{{item.modelNumber}}</p>
                    </div>
                    <div class="rowMsg">
                      <p>发起时间:&nbsp;&nbsp;</p>
                      <p>{{item.startTime}}</p>
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
const router = useRouter()
const repairData = ref({
    repairArr:[
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
            id:'3'
          },{
            addNumber: "111", //报修单号
            vehicleNumber:'56465454', //车辆编号
            licensePlateNumber:'45454', //车牌号
            modelNumber:'fsdf87', //品牌型号
            startTime:'2023-03-02 14:02:46', //发起时间
            state:'待提交', //状态
          },{
            addNumber: "111", //报修单号
            vehicleNumber:'56465454', //车辆编号
            licensePlateNumber:'45454', //车牌号
            modelNumber:'fsdf87', //品牌型号
            startTime:'2023-03-02 14:02:46', //发起时间
            state:'待提交', //状态
          }
    ]
}
);
const onClickLeft = ()=>{
  router.push({ path:'home'})
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