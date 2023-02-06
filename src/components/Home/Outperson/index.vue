<template>
  <div class="container">
    <van-nav-bar
      title="外来人员登记"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
      <van-form @failed="onFailed">
        <div class="tableHeader">主表区</div>
        <van-cell-group inset>
          <van-field
            v-model="formData.company"
            label="所属公司"
            placeholder="所属公司"
          />
          <van-field
            v-model="formData.visitorCount"
            label="入场人数"
            placeholder="入场人数"
          />
          <van-field
            v-model="formData.leader"
            label="负责人"
            placeholder="负责人"
          />
           <van-field
            v-model="formData.leaderPhoneNum"
            label="负责人电话"
            placeholder="负责人电话"
          />
           <van-field
            v-model="formData.receiver"
            label="接待人"
            placeholder="接待人"
          />
           <van-field
            v-model="formData.receiverPhoneNum"
            label="接待人电话"
            placeholder="接待人电话"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <!-- <van-action-bar> -->
            <van-action-bar-button color="#be99ff" type="warning" text="保存" />
            <van-action-bar-button color="#7232dd" type="danger" text="提交" />
          <!-- </van-action-bar> -->
        </div>
      </van-form>
    </div>
  </div>

</template>

<script setup>
import { ref } from "vue";
import {useRouter} from 'vue-router';
const router = useRouter()
const formData = ref({
  violatorCompany:'',
    company:'',
    visitorCount:'',
    leader:'',
    leaderPhoneNum:'',
    receiver:'',
    receiverPhoneNum:''
});
const onClickLeft = ()=>{
  router.push({ path:'home'})
}


</script>

<style lang="less" scoped>
.tableHeader {
  color: #666;
  font-size: .4rem;
  margin: .2rem;
}
.container{
    display: flex;
    height: 100vh;
    flex-direction: column;
    .main{
        width: 100%;
        flex: 1;
        overflow-y: scroll;
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
.addFault{
  font-size: 32px;
  margin: 0 32px;
  display: block;
}
</style>