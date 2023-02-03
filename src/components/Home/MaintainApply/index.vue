<template>
  <div class="container">
    <van-nav-bar
      title="保养申请"
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

        <div class="tableHeader">保养明细区</div>
        <div class="cardBox" v-for="(item,index) in formData.maintainDetails" :key = 'item.index'>
          <p class="tableIndex">序号：{{index+1}}</p>
          <van-icon class="closemaintain" @click="closemaintain(index)" name="cross" />
          <van-cell-group inset>
            <van-field
              v-model="item.maintainTypeResult"
              is-link
              readonly
              name="picker"
              label="保养项目/内容"
              placeholder="选择保养项目/内容"
              @click="showPickerButton(index)"
            />
            <van-popup v-model:show="showPicker" position="bottom">
              <van-picker
                :columns="item.maintainType"
                @confirm="maintainTypeConfirm"
                @cancel="showPicker = false"
              />
            </van-popup>
            <van-field
              v-model="formData.maintainDetails.maintainPartResult"
              is-link
              readonly
              name="picker"
              label="故障部件"
              placeholder="选择故障部件"
              @click="showmaintainPart = true"
            />
            <van-popup v-model:show="showmaintainPart" position="bottom">
              <van-picker
                :columns="formData.maintainDetails.maintainPart"
                @confirm="maintainPartConfirm"
                @cancel="showmaintainPart = false"
              />
            </van-popup>
            <van-field
              v-model="formData.maintainDetails.maintainPhenomenonResult"
              is-link
              readonly
              name="picker"
              label="故障现象"
              placeholder="选择故障现象"
              @click="showmaintainPhenomenon = true"
            />
            <van-popup v-model:show="showmaintainPhenomenon" position="bottom">
              <van-picker
                :columns="formData.maintainDetails.maintainPhenomenon"
                @confirm="maintainPhenomenonConfirm"
                @cancel="showfmaintainPhenomenon = false"
              />
            </van-popup>
            <van-field
              v-model="formData.maintainDetails.message"
              rows="1"
              autosize
              label="其他说明"
              type="textarea"
              placeholder="请输入其他说明"
            />
          </van-cell-group>

        </div>
        <van-icon @click.prevent="addmaintain" class="addmaintain" name="add-o" />
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
  maintainDetails:[
    {
      maintainType: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华"],
      maintainTypeResult: "",
      maintainPart: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华"],
      maintainPartResult: "",
      maintainPhenomenon: ["损坏", "异响", "故障"],
      maintainPhenomenonResult: "",
      message: "1",
    }
  ]

});
const onClickLeft = ()=>{
  router.push({ path:'home'})
}
const maintainIndex = ref('')
const showPickerButton = (index) => {
    showPicker.value = true;
    maintainIndex.value = index;
}
const showPicker = ref(false);
const maintainTypeConfirm = (value) => {
  formData.value.maintainDetails[maintainIndex.value].maintainTypeResult = value;
  showPicker.value = false;
};

const showmaintainPart = ref(false);
const maintainPartConfirm = (value) => {
  formData.value.maintainDetails[maintainIndex].maintainPartResult = value;
  showmaintainPart.value = false;
};
const showmaintainPhenomenon = ref(false);
const maintainPhenomenonConfirm = (value) => {
  formData.value.maintainDetails.maintainPhenomenonResult = value;
  showmaintainPhenomenon.value = false;
};
const closemaintain = (index)=>{
  formData.value.maintainDetails.splice(index,1)
}
const addmaintain = () =>{
  let obj = {
      maintainType: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华"],
      maintainTypeResult: "",
      maintainPart: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华"],
      maintainPartResult: "",
      maintainPhenomenon: ["损坏", "异响", "故障"],
      maintainPhenomenonResult: "",
      message: "",
    }
   formData.value.maintainDetails.push(obj)
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
  .closemaintain{
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
.addmaintain{
  font-size: 32px;
  margin: 0 32px;
  display: block;
}
</style>