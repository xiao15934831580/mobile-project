<template>
  <div class="container">
    <van-nav-bar
      :title= 'pageTitle'
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
      <van-form @failed="onFailed" ref="form">
        <!-- <div class="tableHeader">主表区</div> -->
        <van-cell-group class="topBox" inset>
          <van-field
            :model-value="formData.billCode"
            readonly 
            label="报修单号"
            placeholder="报修单号"
            :rules="[{ required: true, message: '请填写报修单号' }]"
          />
          <van-field
            v-model="formData.carCode"
            label="车辆编号"
            placeholder="车辆编号"
            :rules="[{ required: true, message: '请填写车辆编号' }]"
          />
          <van-field
            v-model="formData.carNumber"
            label="车牌号"
            placeholder="车牌号"
            :rules="[{ required: true, message: '请填写车牌号' }]"
          />
          <van-field
            v-model="formData.carBrandType"
            label="品牌型号"
            placeholder="品牌型号"
            :rules="[{ required: true, message: '请填写品牌型号' }]"
          />
          <van-field name="radio" label="紧急程度">
            <template #input>
              <van-radio-group v-model="formData.urgencyLevel" direction="horizontal">
                <van-radio name="PT">普通报修</van-radio>
                <van-radio name="JJ">紧急报修</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
        <van-tabs v-model:active="activeName" v-if="showApprove">
          <van-tab title="故障明细" name="a">       
            <div class="cardBox" v-for="(item,index) in formData.repairDetails" :key = 'index'>
                <p class="tableIndex">序号：{{index+1}}</p>
                <van-icon class="closeFault" @click="closeFault(index)" name="cross" />
                <van-cell-group inset>
                  <van-field
                    v-model="item.faultTypeLbl"
                    is-link
                    readonly
                    name="picker"
                    label="故障分类"
                    placeholder="选择故障分类"
                    @click="showfaultTypeConfirm(index)"
                    :rules="[{ required: true, message: '请选择故障分类' }]"
                  />
                  <van-popup v-model:show="showPicker" position="bottom">
                    <van-picker
                      :columns="formData.dropDowns.faultType"
                      @confirm="faultTypeConfirm"
                      @cancel="showPicker"
                    />
                  </van-popup>
                  <van-field
                    v-model="item.faultPartLbl"
                    is-link
                    readonly
                    name="picker"
                    label="故障部件"
                    placeholder="选择故障部件"
                    @click="showfaultPartButton(index)"
                    :rules="checkFaultPart"
                  />
                  <van-popup v-model:show="showfaultPart" position="bottom">
                    <van-picker
                      :columns="formData.dropDowns.faultPart"
                      @confirm="faultPartConfirm"
                      @cancel="showfaultPart = false"
                    />
                  </van-popup>
                  <van-field
                    v-model="item.faultSituationLbl"
                    is-link
                    readonly
                    name="picker"
                    label="故障现象"
                    placeholder="选择故障现象"
                    @click="showfaultPhenomenonButton(index)"
                    :rules="[{ required: true, message: '请选择故障现象' }]"
                  />
                  <van-popup v-model:show="showfaultPhenomenon" position="bottom">
                    <van-picker
                      :columns="formData.dropDowns.faultSituation"
                      @confirm="faultPhenomenonConfirm"
                      @cancel="showffaultPhenomenon = false"
                    />
                  </van-popup>
                  <van-field
                    v-model="item.otherDesc"
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
            <van-steps direction="vertical"  :active="approveActive" active-icon="success" active-color="#07c160" >
              <van-step v-for="(approve,index) in formData.apvDetails" :key = 'index'>
                <h3>{{approve.apvDesc}}({{approve.approver}})</h3>
                <p>{{approve.apvTime}}</p>
              </van-step>
            </van-steps>
          </div>
        </van-tab>
      </van-tabs>
      <div v-if="!showApprove">
        <div class="tableHeader">故障明细</div>
        <div class="cardBox" v-for="(item,index) in formData.repairDetails" :key = 'index'>
          <p class="tableIndex">序号：{{index+1}}</p>
          <van-icon class="closeFault" @click="closeFault(index)" name="cross" />
          <van-cell-group inset>
            <van-field
              v-model="item.faultTypeLbl"
              is-link
              readonly
              name="picker"
              label="故障分类"
              placeholder="选择故障分类"
              @click="showfaultTypeConfirm(index)"
              :rules="[{ required: true, message: '请选择故障分类' }]"
            />
            <van-popup v-model:show="showPicker" position="bottom">
              <van-picker
                :columns="formData.dropDowns.faultType"
                @confirm="faultTypeConfirm"
                @cancel="showPicker"
              />
            </van-popup>
            <van-field
              v-model="item.faultPartLbl"
              is-link
              readonly
              name="picker"
              label="故障部件"
              placeholder="选择故障部件"
              @click="showfaultPartButton(index)"
              :rules="checkFaultPart"
            />
            <van-popup v-model:show="showfaultPart" position="bottom">
              <van-picker
                :columns="formData.dropDowns.faultPart"
                @confirm="faultPartConfirm"
                @cancel="showfaultPart = false"
              />
            </van-popup>
            <van-field
              v-model="item.faultSituationLbl"
              is-link
              readonly
              name="picker"
              label="故障现象"
              placeholder="选择故障现象"
              :rules="[{ required: true, message: '请选择故障现象' }]"
              @click="showfaultPhenomenonButton(index)"
            />
            <van-popup v-model:show="showfaultPhenomenon" position="bottom">
              <van-picker
                :columns="formData.dropDowns.faultSituation"
                @confirm="faultPhenomenonConfirm"
                @cancel="showffaultPhenomenon = false"
              />
            </van-popup>
            <van-field
              v-model="item.otherDesc"
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
          <van-button round color="#1989fa"  native-type="submit" @click="saveRepair" text="保存" />
          <van-button round color="#1989fa" native-type="submit" @click="commitRepair" text="提交" />
        </div>
      </van-form>
    </div>
  </div>

</template>

<script setup>
import { ref, watch } from "vue";
import {useRouter} from 'vue-router';
import { onBeforeMount } from "vue";
import { getBillCodeAndDropDowns as getBillCodeAndDropDowns,getBillData as getBillData,saveNewBill as saveNewBill, commitNewRepBill as commitNewRepBill} from '@/api/home'
const router = useRouter()
const pageTitle = ref('发起报修')
const numId = ref()
const approveActive=ref('')
const form = ref('')
const formData = ref({
  billCode: "", //报修单号
  carCode:'', //车辆编号
  carNumber:'', //车牌号
  carBrandType:'', //品牌型号
  urgencyLevel: 'PT',
  dropDowns:{
    faultPart:['发动机', '柴油机', '轮胎', '车桥', '铲斗', '座椅'],
    faultSituation:['异响', '损坏', '故障'],
    faultType:['人为原因', '外部原因', '安全保护装置', '控制系统', '电气系统', '其他']
  },
  repairDetails:[
    {
      faultTypeLbl: "",
      faultPartLbl: "",
      faultSituationLbl: "",
      otherDesc: "",
    }
  ],
  apvDetails:[
    {
      apvDesc:'已审批',
      apvTime:'2023-06-03'
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
onBeforeMount(() => {
  if(showApprove.value){
    getBillData(numId.value).then((res)=>{
      if(res.code === 200){
       formData.value=res.data
       approveActive.value = res.data.apvDetails.length;
      }else{

      }
    })
  }else{
    getBillCodeAndDropDown();
  }
});

watch(
  ()=>router.currentRoute.value.query,
  (newValue)=>{
    console.log('newValue',newValue)
    if(newValue.numId){ // 数据详情
        showApprove.value = true;
        numId.value = newValue.numId;
        pageTitle.value = '报修单详情'
    }else{
      showApprove.value = false;
    }

  },
  {immediate:true}
)
const getBillCodeAndDropDown = ()=>{
    getBillCodeAndDropDowns('BXD').then((res)=>{
       if(res.code === 200){
          formData.value.billCode = res.data.billCode
       }else{

       }
    })
}
const checkFaultPart = ref([
  {
      required:true,
      message: '请选择故障部件',
      trigger:'onChange',
  },{
     validator: value => {
       let arr = []
       for(let item of JSON.parse(JSON.stringify(formData.value.repairDetails))){
         if(value === item.faultPartLbl){
           arr.push(item)
         }
       }
       if(arr.length>1){
         return false
       }
      },
      message: '故障部件不能重复',
      trigger: 'onChange',
  }
])
const showPicker = ref(false);
const faultTypeIndex = ref('')
const showfaultTypeConfirm = (index) => {
    showPicker.value = true;
    faultTypeIndex.value = index;
}
const faultTypeConfirm = (value) => {
  formData.value.repairDetails[faultTypeIndex.value].faultTypeLbl = value;
  showPicker.value = false;
};
const showfaultPart = ref(false);
const faultPartIndex = ref('')
const showfaultPartButton = (index) => {
    showfaultPart.value = true;
    faultPartIndex.value = index;
}
const faultPartConfirm = (value) => {
  formData.value.repairDetails[faultPartIndex.value].faultPartLbl = value;
  showfaultPart.value = false;
};
const showfaultPhenomenon = ref(false);
const faultPhenomenonIndex = ref('')
const faultPhenomenonConfirm = (value) => {
  formData.value.repairDetails[faultPhenomenonIndex.value].faultSituationLbl = value;
  showfaultPhenomenon.value = false;
};
const showfaultPhenomenonButton = (index)=>{
    showfaultPhenomenon.value = true;
    faultPhenomenonIndex.value = index;
}
const closeFault = (index)=>{
  formData.value.repairDetails.splice(index,1)
}
const addFault = () =>{
  let obj = {
      faultTypeLbl: "",
      faultPartLbl: "",
      faultSituationLbl: "",
      otherDesc: "",
    }
   formData.value.repairDetails.push(obj)
}
const saveData = ()=>{
      form.value.validate().then(()=>{
        let obj = {
           billCode: formData.value.billCode, //报修单号
          carCode:formData.value.carCode, //车辆编号
          carNumber:formData.value.carNumber, //车牌号
          carBrandType:formData.value.carBrandType, //品牌型号
          urgencyLevel: formData.value.urgencyLevel,
          repairDetails:JSON.parse(JSON.stringify(formData.value.repairDetails)),
          billType:'BXD'
        }
        saveNewBill(obj).then((res)=>{
          if(res.code === 200){
            return true
          }else{
            return false
          }
        })
  })
  .catch (()=>{
    return false
  }) 
}
const saveRepair = ()=>{
  saveData()

}
const commitRepair=()=>{
    form.value.validate().then(()=>{
        let obj = {
           billCode: formData.value.billCode, //报修单号
          carCode:formData.value.carCode, //车辆编号
          carNumber:formData.value.carNumber, //车牌号
          carBrandType:formData.value.carBrandType, //品牌型号
          urgencyLevel: formData.value.urgencyLevel,
          repairDetails:JSON.parse(JSON.stringify(formData.value.repairDetails)),
          billType:'BXD'
        }
        commitNewRepBill(obj).then((res)=>{
          if(res.code === 200){
            router.push({ path:'home'})
          }else{
              
          }
        })
  })
  .catch (()=>{
    console.log('错误')
  }) 
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