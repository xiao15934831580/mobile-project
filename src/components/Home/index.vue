<template>
  <div  class="outBox">
    <van-nav-bar title="流动机械维修综合管理系统" />
    <img src='../../assets/images/true.jpg' alt="背景图片" class="bgImg"/>
    <div>
          <van-grid :column-num="3">
            <van-grid-item @click="turnTask('DPX')" icon="home-o" text="待派修" :badge= 'taskData.dpx' />
            <van-grid-item @click="turnTask('DYS')" icon="search" text="待验收" :badge= 'taskData.dys' />
            <van-grid-item @click="turnTask('YCL')" icon="search" text="已处理" :badge="taskData.ycl" />
            <van-grid-item @click="turnTask('YBX')" icon="search" text="已报修" :badge="taskData.ybx" />
            <van-grid-item @click="turnTask('DFP')" icon="search" text="待分配" :badge="taskData.dfp" />
            <van-grid-item @click="turnTask('DWB')" icon="search" text="待维保" :badge="taskData.dwb" />
            <van-grid-item @click="turnTask('WBZ')" icon="search" text="维保中" :badge="taskData.wbz" />
            <van-grid-item @click="turnTask('YYS')" icon="search" text="已验收" :badge="taskData.yys" />
            <van-grid-item @click="turnTask('DTJ')" icon="search" text="待提交" :badge="taskData.dtj" />
          </van-grid>
    </div>

    <div class="moduleBox">
        <router-link active-class="active" class="singleBox first" to="/repairapply">报修申请</router-link>
        <router-link active-class="active" class="singleBox second" to="/repairsearch">报修单查询</router-link>
        <router-link active-class="active" class="singleBox third" to="/maintainapply">保养申请</router-link>
        <router-link active-class="active" class="singleBox forth" to="/maintainsearch">保养单查询</router-link>
        <router-link active-class="active" class="singleBox fivth" to="/outperson">外来人登记</router-link>
        <router-link active-class="active" class="singleBox sixth" to="/outpersonsearch">外来人员登记记录</router-link>
        <router-link active-class="active" class="singleBox seventh" to="/violation">违规登记</router-link>
        <router-link active-class="active" class="singleBox eightth" to="/violationsearch">违规历史记录</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getTaskCount as getTaskCount } from '@/api/home'
import { onBeforeMount } from "vue";
const router = useRouter();
const columns = ref([
      { text: '杭州', value: 'Hangzhou' },
      { text: '宁波', value: 'Ningbo' },
      { text: '温州', value: 'Wenzhou' },
      { text: '绍兴', value: 'Shaoxing' },
      { text: '湖州', value: 'Huzhou' },
    ]);
const fieldValue = ref('');
const showPicker = ref(false);
const taskData=ref({
    "dfp": 0,
    "dpx": 0,
    "dtj": 0,
    "dwb": 0,
    "dys": 0,
    "wbz": 0,
    "ybx": 0,
    "ycl": 0,
    "yys": 0
})
onBeforeMount(() => {
  getTask();
});
const getTask = ()=>{
  getTaskCount().then((res)=>{
      if(res.code === 200){
        taskData.value = res.data
        console.log(taskData.value)
      }else{

      }
  })
}
const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false;
  fieldValue.value = selectedOptions[0].text;
};
const turnTask = (name)=>{
    router.push({
            //传递参数使用params的话，只能使用name指定(在route.js里面声明name)
            path:'/task',
            query:{
              activeName:name
            }
            })
}
</script>

<style lang="less" scoped>
:deep(.van-space--horizontal .van-space-item){
  width:4rem
}
:deep(.van-col--8){
  text-align: center;
  border-right: 1px solid #d5d6da;
  font-size: .36rem;
  padding: 16px 0;
  color: #1989fa;
  font-weight: 600;
}
:deep(.van-nav-bar__title){
  font-size: .48rem;
  font-weight: 600;
}
.active{
  color: green;
}
.bgImg{
  width: 100%;
  height: 5rem;
  background-size:100% 100%;
  overflow: hidden;
  margin: .32rem 0;
}
:deep(.van-row){
  background-color: #ffffff;
  margin-bottom: .16rem;
}
.moduleBox{
  .first{
     background-color: #ecd2aa;
  }
  .second{
     background-color: #95ced8;
  }
  .third{
     background-color: #f1a45c;
  }
  .forth{
    background-color: #5cc7f1;
  }
  .fivth{
    background-color: #e48181;
  }
  .sixth{
    background-color: #e997de;
  }
  .seventh{
    background-color: #b3dde2;
  }
  .eightth{
    background-color: #6176b1;
  }
.singleBox{
    width: 40%;
    height: 2.5rem;
    // background-color: #4c9cec;
    font-size: .42rem;
    text-align: center;
    line-height: 2.5rem;
    border-radius: .5rem;
    color: #646566;
  }
  :nth-of-type(2n+1){
    margin: .32rem;
    float: left;
  }
  :nth-of-type(2n){
    margin: .32rem;
    float: right;
  }
}
.outBox{
  height: calc(100vh - 1.3rem);
  overflow-y: auto;
}
</style>