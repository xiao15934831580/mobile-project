<template>
  <div class="container">
    <van-nav-bar
      title="发起报修"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
      <van-form @failed="onFailed">
        <div class="tableHeader">主表区</div>
        <van-cell-group inset>
          <van-field
            v-model="formData.addNumber"
            disabled
            name="pattern"
            label="报修单号"
            placeholder="报修单号"
          />
          <van-field name="switch" label="紧急报修">
            <template #input>
              <van-switch v-model="formData.checked" />
            </template>
          </van-field>
          <van-field
            v-model="addNumber"
            name="pattern"
            label="车辆编号"
            placeholder="车辆编号"
          />
          <van-field
            v-model="addNumber"
            name="pattern"
            label="车牌号"
            placeholder="车牌号"
          />
          <van-field
            v-model="addNumber"
            name="pattern"
            label="品牌型号"
            placeholder="品牌型号"
          />
        </van-cell-group>

        <div class="tableHeader">故障明细区</div>
        <div class="cardBox" v-for="(item,index) in formData.faultDetails" :key = 'item.index'>
          <p class="tableIndex">序号：{{index+1}}</p>
          <van-icon class="closeFault" @click="closeFault(index)" name="cross" />
          <van-cell-group inset>
            <van-field
              v-model="item.faultTypeResult"
              is-link
              readonly
              name="picker"
              label="故障分类"
              placeholder="选择故障分类"
              @click="showfaultPartButton(index)"
            />
            <van-popup v-model:show="showPicker" position="bottom">
              <van-picker
                :columns="item.faultType"
                @confirm="faultTypeConfirm"
                @cancel="showPicker"
              />
            </van-popup>
            <van-field
              v-model="item.faultPartResult"
              is-link
              readonly
              name="picker"
              label="故障部件"
              placeholder="选择故障部件"
              @click="showfaultPart(index)"
            />
            <van-popup v-model:show="showfaultPart" position="bottom">
              <van-picker
                :columns="item.faultPart"
                @confirm="faultPartConfirm"
                @cancel="showfaultPart = false"
              />
            </van-popup>
            <van-field
              v-model="formData.faultDetails.faultPhenomenonResult"
              is-link
              readonly
              name="picker"
              label="故障现象"
              placeholder="选择故障现象"
              @click="showfaultPhenomenon = true"
            />
            <van-popup v-model:show="showfaultPhenomenon" position="bottom">
              <van-picker
                :columns="formData.faultDetails.faultPhenomenon"
                @confirm="faultPhenomenonConfirm"
                @cancel="showffaultPhenomenon = false"
              />
            </van-popup>
            <van-field
              v-model="formData.faultDetails.message"
              rows="1"
              autosize
              label="其他说明"
              type="textarea"
              placeholder="请输入其他说明"
            />
          </van-cell-group>

        </div>
        <van-icon @click.prevent="addFault" class="addFault" name="add-o" />
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
  addNumber: "111",
  checked: false,
  faultDetails:[
    {
      faultType: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华"],
      faultTypeResult: "",
      faultPart: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华"],
      faultPartResult: "",
      faultPhenomenon: ["损坏", "异响", "故障"],
      faultPhenomenonResult: "",
      message: "1",
    }
  ]

});
const onClickLeft = ()=>{
  router.push({ path:'home'})
}
const showPicker = ref(false);
const faultTypeIndex = ref('')
const showfaultType = (index) => {
    showPicker.value = true;
    faultTypeIndex.value = index;
}
const faultTypeConfirm = (value) => {
  formData.value.faultDetails[faultTypeIndex.value].faultTypeResult = value;
  showPicker.value = false;
};
const showfaultPart = ref(false);
const faultPartIndex = ref('')
const showfaultPartButton = (index) => {
    showfaultPart.value = true;
    faultPartIndex.value = index;
}
const faultPartConfirm = (value) => {
  formData.value.faultDetails[faultPartIndex.value].faultPartResult = value;
  showfaultPart.value = false;
};
const showfaultPhenomenon = ref(false);
const faultPhenomenonConfirm = (value) => {
  formData.value.faultDetails.faultPhenomenonResult = value;
  showfaultPhenomenon.value = false;
};
const closeFault = (index)=>{
  formData.value.faultDetails.splice(index,1)
}
const addFault = () =>{
  let obj = {
      faultType: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华"],
      faultTypeResult: "",
      faultPart: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华"],
      faultPartResult: "",
      faultPhenomenon: ["损坏", "异响", "故障"],
      faultPhenomenonResult: "",
      message: "",
    }
   formData.value.faultDetails.push(obj)
}
</script>

<style lang="less" scoped>
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