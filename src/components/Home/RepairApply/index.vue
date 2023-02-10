<template>
  <div class="container">
    <van-nav-bar
      :title= 'pageTitle'
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
      <van-form @failed="onFailed">
        <!-- <div class="tableHeader">主表区</div> -->
        <van-cell-group class="topBox" inset>
          <van-field
            :model-value="formData.addNumber"
            readonly 
            label="报修单号"
            placeholder="报修单号"
          />
          <van-field
            v-model="formData.vehicleNumber"
            label="车辆编号"
            placeholder="车辆编号"
          />
          <van-field
            v-model="formData.licensePlateNumber"
            label="车牌号"
            placeholder="车牌号"
          />
          <van-field
            v-model="formData.modelNumber"
            label="品牌型号"
            placeholder="品牌型号"
          />
          <van-field name="radio" label="紧急程度">
            <template #input>
              <van-radio-group v-model="formData.urgencyChecked" direction="horizontal">
                <van-radio name="1">普通报修</van-radio>
                <van-radio name="2">紧急报修</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
        <van-tabs v-model:active="activeName" v-if="showApprove">
          <van-tab title="故障明细" name="a">       
            <div class="cardBox" v-for="(item,index) in formData.faultDetails" :key = 'index'>
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
                    @click="showfaultTypeConfirm(index)"
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
                    @click="showfaultPartButton(index)"
                  />
                  <van-popup v-model:show="showfaultPart" position="bottom">
                    <van-picker
                      :columns="item.faultPart"
                      @confirm="faultPartConfirm"
                      @cancel="showfaultPart = false"
                    />
                  </van-popup>
                  <van-field
                    v-model="item.faultPhenomenonResult"
                    is-link
                    readonly
                    name="picker"
                    label="故障现象"
                    placeholder="选择故障现象"
                    @click="showfaultPhenomenonButton(index)"
                  />
                  <van-popup v-model:show="showfaultPhenomenon" position="bottom">
                    <van-picker
                      :columns="item.faultPhenomenon"
                      @confirm="faultPhenomenonConfirm"
                      @cancel="showffaultPhenomenon = false"
                    />
                  </van-popup>
                  <van-field
                    v-model="item.message"
                    rows="1"
                    autosize
                    label="其他说明"
                    type="textarea"
                    placeholder="请输入其他说明"
                  />
                </van-cell-group>
              </div>
          <van-icon @click.prevent="addFault" class="addFault" name="add-o" /></van-tab>
          <van-tab title="审批进度" name="b" v-if="showApprove">
          <div>
            <van-steps direction="vertical"  :active="1" active-icon="success" active-color="#07c160" >
              <van-step v-for="(approve,index) in formData.approveArr" :key = 'index'>
                <h3>{{approve.name}}</h3>
                <p>{{approve.time}}</p>
              </van-step>
            </van-steps>
          </div>
        </van-tab>
      </van-tabs>
      <div v-if="!showApprove">
        <div class="tableHeader">故障明细</div>
        <div class="cardBox" v-for="(item,index) in formData.faultDetails" :key = 'index'>
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
              @click="showfaultTypeConfirm(index)"
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
              @click="showfaultPartButton(index)"
            />
            <van-popup v-model:show="showfaultPart" position="bottom">
              <van-picker
                :columns="item.faultPart"
                @confirm="faultPartConfirm"
                @cancel="showfaultPart = false"
              />
            </van-popup>
            <van-field
              v-model="item.faultPhenomenonResult"
              is-link
              readonly
              name="picker"
              label="故障现象"
              placeholder="选择故障现象"
              @click="showfaultPhenomenonButton(index)"
            />
            <van-popup v-model:show="showfaultPhenomenon" position="bottom">
              <van-picker
                :columns="item.faultPhenomenon"
                @confirm="faultPhenomenonConfirm"
                @cancel="showffaultPhenomenon = false"
              />
            </van-popup>
            <van-field
              v-model="item.message"
              rows="1"
              autosize
              label="其他说明"
              type="textarea"
              placeholder="请输入其他说明"
            />
          </van-cell-group>

        </div>
        <van-icon @click.prevent="addFault" class="addFault" name="add-o" />
      </div>
        <div style="margin: 16px" class="flexBox">
          <van-button round color="#1989fa"  text="保存" />
          <van-button round color="#1989fa"  text="提交" />
        </div>
      </van-form>
    </div>
  </div>

</template>

<script setup>
import { ref, watch } from "vue";
import {useRouter} from 'vue-router';
const router = useRouter()
const pageTitle = ref('发起报修')
const formData = ref({
  addNumber: "111", //报修单号
  vehicleNumber:'', //车辆编号
  licensePlateNumber:'', //车牌号
  modelNumber:'', //品牌型号
  urgencyChecked: '2',
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
  ],
  approveArr:[
    {
      name:'已审批',
      time:'2023-06-03'
    },
    {
      name:'待审批',
      time:'2023-06-03'
    },
        {
      name:'待审批',
      time:'2023-06-03'
    },
        {
      name:'待审批',
      time:'2023-06-03'
    }
  ]

});
const onClickLeft = ()=>{
  router.push({ path:'home'})
}
const showApprove = ref(true);// 新建状态
watch(
  ()=>router.currentRoute.value.query,
  (newValue)=>{
    console.log('newValue',newValue)
    if(newValue.numId){ // 数据详情
        showApprove.value = true;
        let repairId = newValue.numId;
        pageTitle.value = '报修单详情'
        formData.value.addNumber = repairId
    }else{
      showApprove.value = false;
    }

  },
  {immediate:true}
)
const showPicker = ref(false);
const faultTypeIndex = ref('')
const showfaultTypeConfirm = (index) => {
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
const faultPhenomenonIndex = ref('')
const faultPhenomenonConfirm = (value) => {
  formData.value.faultDetails[faultPhenomenonIndex.value].faultPhenomenonResult = value;
  showfaultPhenomenon.value = false;
};
const showfaultPhenomenonButton = (index)=>{
    showfaultPhenomenon.value = true;
    faultPhenomenonIndex.value = index;
}
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
:deep(.van-button--round){
  width: 3rem;
}
.tableHeader {
  color: #666;
  font-size: .4rem;
  margin: .16rem;
  background-color: #ffffff;
  margin: .16rem 0;
  padding: .16rem !important;
}
.topBox{
  margin-top: .16rem;
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
:deep(.van-step__title p){
  font-size: .35rem;
}
:deep(.van-step__title h3){
  font-size: .35rem;
}
:deep(.van-cell-group--inset) {
  margin: .16rem 0;
}
:deep(.van-tabs__content){
  margin-top: .16rem;
}
:deep(.van-tabs__line){
    background:#1989fa;
}
.cardBox {
  padding-top: 1.2rem;
  background-color: #ffffff;
  margin: .16rem;
  border-radius: 0.21333rem;
  position: relative;
  .closeFault{
    font-size: .4rem;
    position: absolute;
    top: .4rem;
    right: .4rem;
  }
  .tableIndex{
    font-size: .4rem;
    position: absolute;
    top: .4rem;
    left:.4rem;
    font-weight: 600;
  }
}
.addFault{
  font-size: .4rem;
  margin: 0 .4rem;
  display: block;
}
</style>