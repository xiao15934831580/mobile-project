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
            <van-button round type="success" size="small" @click="searchData">查询</van-button>
          </div>
      </div>
      <div class="contantBox">
          <div class="singBox"  v-for=" (item,index) in repairData.repairArr" :key  = 'index'>
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
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from "vue";
import {useRouter} from 'vue-router';
import { onBeforeMount } from "vue";
import { queryVisRecord as queryVisRecord} from '@/api/home'
const router = useRouter()
const searchValue = ref({
  "company": "",
  "limit": 10,
  "pageNum": 1,
  "receiver": ""
})
const repairData = ref({
    repairArr:[
          {
            company: "", //所属公司
            leader:'', //负责人
            leaderPhoneNum:'', //负责人电话
            receiver:'', //接待人
            receiverPhoneNum:'', //接待人电话
            visitTime:'',//入场时间
          }
    ]
}
);
const onClickLeft = ()=>{
  router.push({ path:'home'})
}
onBeforeMount(() => {
  searchData()
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
  "limit": 10,
  "pageNum": 1,
  "receiver": ""
  }
  searchValue.value = obj
}
const searchData =()=>{
  let obj = searchValue.value
  queryVisRecord(obj).then((res)=>{
    console.log(res.data)
    repairData.value.repairArr = res.data.records;
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