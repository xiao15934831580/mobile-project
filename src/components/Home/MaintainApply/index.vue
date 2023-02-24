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
        </van-cell-group>
        <van-tabs v-model:active="activeName" v-if="showApprove">
          <van-tab title="保养明细" name="a">
            <div
              class="cardBox"
              v-for="(item, index) in formData.maintainDetails"
              :key="item.index"
            >
              <p class="tableIndex">序号：{{ index + 1 }}</p>
              <van-icon
                class="closemaintain"
                @click="closemaintain(index)"
                name="cross"
              />
              <van-cell-group inset>
                <van-field
                  v-model="item.maintainItemLbl"
                  is-link
                  readonly
                  name="picker"
                  label="保养项目/内容"
                  placeholder="选择保养项目/内容"
                  @click="showPickerButton(index)"
                  :rules="checkMaintainItem"
                />
                <van-popup v-model:show="showPicker" position="bottom">
                  <van-picker
                    :columns="formData.dropDowns.maintainItem"
                    @confirm="maintainTypeConfirm"
                    @cancel="showPicker = false"
                  />
                </van-popup>
                <van-field
                  v-model="item.maintainCycle"
                  label="保养周期（h）"
                  placeholder="保养周期（h）"
                  :rules="[{ required: true, message: '请输入保养周期（h）' }]"
                />
                <van-field
                  v-model="item.replacement"
                  label="油品或滤芯型号"
                  placeholder="油品或滤芯型号"
                  :rules="[{ required: true, message: '请输入油品或滤芯型号' }]"
                />
                <van-field
                  v-model="item.lastExecHour"
                  label="上次执行台时/h"
                  placeholder="上次执行台时/h"
                />
                <van-field
                  v-model="item.planExecHour"
                  label="本次计划执行台时/h"
                  placeholder="本次计划执行台时/h"
                />
                <!-- <van-field
              v-model="item.realExecDate"
              label="实际执行日期"
              placeholder="实际执行日期"
            /> -->
                <van-field
                  v-model="item.realExecDate"
                  is-link
                  readonly
                  name="datePicker"
                  label="实际执行日期"
                  placeholder="实际执行日期"
                  @click="showrealExecDate(index)"
                />
                <van-popup v-model:show="isShowrealExecDate" position="bottom">
                  <van-datetime-picker
                    type="date"
                    @confirm="realExecDateConfirm"
                    @cancel="isShowrealExecDate = false"
                  />
                </van-popup>
                <van-field
                  v-model="item.realExecHour"
                  label="实际执行台时/h"
                  placeholder="实际执行台时/h"
                />
                <van-field
                  v-model="item.executor"
                  label="责任人"
                  placeholder="责任人"
                />
                <van-field
                  v-model="item.remark"
                  label="备注"
                  placeholder="备注"
                />
              </van-cell-group>
            </div>
            <van-icon
              @click.prevent="addmaintain"
              class="addmaintain"
              name="add-o"
            />
          </van-tab>
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
            <div class="tableHeader">保养明细</div>
            <div
            class="cardBox"
            v-for="(item, index) in formData.maintainDetails"
            :key="item.index"
            >
            <p class="tableIndex">序号：{{ index + 1 }}</p>
            <van-icon
                class="closemaintain"
                @click="closemaintain(index)"
                name="cross"
            />
            <van-cell-group inset>
                <van-field
                v-model="item.maintainItemLbl"
                is-link
                readonly
                name="picker"
                label="保养项目/内容"
                placeholder="选择保养项目/内容"
                @click="showPickerButton(index)"
                :rules="checkMaintainItem"
                />
                <van-popup v-model:show="showPicker" position="bottom">
                <van-picker
                    :columns="formData.dropDowns.maintainItem"
                    @confirm="maintainTypeConfirm"
                    @cancel="showPicker = false"
                />
                </van-popup>
                <van-field
                v-model="item.maintainCycle"
                label="保养周期（h）"
                placeholder="保养周期（h）"
                :rules="[{ required: true, message: '请输入保养周期（h）' }]"
                />
                <van-field
                v-model="item.replacement"
                label="油品或滤芯型号"
                placeholder="油品或滤芯型号"
                :rules="[{ required: true, message: '请输入油品或滤芯型号' }]"
                />
                <van-field
                v-model="item.lastExecHour"
                label="上次执行台时/h"
                placeholder="上次执行台时/h"
                />
                <van-field
                v-model="item.planExecHour"
                label="本次计划执行台时/h"
                placeholder="本次计划执行台时/h"
                />
                <van-field
                v-model="item.realExecDate"
                is-link
                readonly
                name="datePicker"
                label="实际执行日期"
                placeholder="实际执行日期"
                @click="showrealExecDate(index)"
                />
                <van-popup v-model:show="isShowrealExecDate" position="bottom">
                <van-datetime-picker
                    type="date"
                    @confirm="realExecDateConfirm"
                    @cancel="isShowrealExecDate = false"
                />
                </van-popup>
                <van-field
                v-model="item.realExecHour"
                label="实际执行台时/h"
                placeholder="实际执行台时/h"
                />
                <van-field
                v-model="item.executor"
                label="责任人"
                placeholder="责任人"
                />
                <van-field v-model="item.remark" label="备注" placeholder="备注" />
            </van-cell-group>
            </div>
            <van-icon
            @click.prevent="addmaintain"
            class="addmaintain"
            name="add-o"
            />
        </div>
        <div style="margin: 16px" class="flexBox">
          <van-button  v-if="showSave" round color="#1989fa"  native-type="submit" @click="saveMaintain"  text="保存" />
          <van-button v-if="showDeleteRepair" round color="#1989fa"  native-type="submit" @click="deleteMaintain"  text="删除" />
          <van-button v-if="showDispatchRepair" round color="#1989fa" native-type="submit" @click="commitMaintain" text="派修" />
          <van-button v-if="showExitRepair" round color="#1989fa" native-type="submit" @click="exitMaintain" text="退回重修" />
          <van-button v-if="showCompleteCheckNodeFun" round color="#1989fa" native-type="submit" @click="completeCheckNodeFun" text="完成验收" />
          <van-button v-if="showStartRepNodeFun" round color="#1989fa" native-type="submit" @click="startRepNodeFun" text="开始维保" />
          <van-button v-if="showEndRepNodeFun" round color="#1989fa" native-type="submit" @click="endRepNodeFun" text="结束维保" />
        </div>
          
      </van-form>

    </div>
       <VanDialog 
              :show='isShowNameDialog'
              title="退回说明"
              :show-cancel-button = 'true'
              @cancel='isShowNameDialog = false'
              @confirm='confirm'
              >
              <van-form  ref="formDialog">
                <!-- 输入框 -->
                  <van-field
                    v-model.trim="exitdesc"
                    input-align="center"
                    maxlength="50"
                    label='退回说明'
                    placeholder="请输入退回说明"
                    :rules="[{ required: true, message: '请输入退回说明' }]"
                  />
              </van-form>
      </VanDialog>
  </div>

</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";
import { Dialog } from 'vant';
import { getBillCodeAndDropDowns as getBillCodeAndDropDowns,getBillData as getBillData,saveNewBill as saveNewBill, deleteBill as deleteBill,returnRepNode as returnRepNode, completeCheckNode as completeCheckNode, startRepNode as startRepNode,endRepNode as endRepNode} from '@/api/home'
import {getCurrentInstance} from "vue"
const {proxy} = getCurrentInstance();
const router = useRouter();
const pageTitle = ref('保养申请')
const form= ref('')
const formDialog = ref('')
const VanDialog = Dialog.Component;
const repairman = ref('')
const showSave = ref(true)
const showDeleteRepair = ref(false)
const showDispatchRepair = ref(false)
const showExitRepair = ref(false)
const showCompleteCheckNodeFun = ref(false)
const showStartRepNodeFun = ref(false)
const showEndRepNodeFun = ref(false)
const formData = ref({
  billCode: "", //报修单号
  carCode:'', //车辆编号
  carNumber:'', //车牌号
  carBrandType:'', //品牌型号
  dropDowns:{
    maintainItem:["发动机油", "驱动桥油", "变速箱油", "液压油", "空气内外滤芯", "空调外滤", "空调内滤", "燃油呼吸器", "发动滤芯"],
    repairman:["weqwe", "张三", "王五", "李四"]
  },
  maintainDetails: [
    {
      message: "",
      maintainCycle: "", //保养周期
      replacement: "", //油品或滤芯型号
      lastExecHour: "", //上次执行台时/h
      planExecHour: "", // 本次计划执行台时/h
      realExecDate: "", // 实际执行日期
      realExecHour: "", //实际执行台时/h
      executor: "", //责任人
      remark: "", //备注
    },
  ]
});
const onClickLeft = () => {
  router.go(-1)
};
const numId = ref()
const approveActive=ref('')
const showApprove = ref(true); // 新建状态
const isShowNameDialog = ref(false)
const exitdesc = ref('')
const allFalse = () => {
  showSave.value = false;
  showDeleteRepair.value = false;
  showDispatchRepair.value = false;
  showExitRepair.value = false;
  showCompleteCheckNodeFun.value = false;
  showStartRepNodeFun.value = false;
  showEndRepNodeFun.value = false;
}
watch(
  () => router.currentRoute.value.query,
  (newValue) => {
    console.log("newValue", newValue);
    if(newValue.type === 'task'){ ///任务页面跳转过来的
      allFalse()
      switch (newValue.status) {
        case 'DTJ':
            showSave.value = true;
            showDispatchRepair.value = true;
            showDeleteRepair.value = true;
            break;
        case 'DYS':
            showExitRepair.value = true;
            showCompleteCheckNodeFun.value = true;
            break;
        case 'DWB':
            showStartRepNodeFun.value = true;
            break;
        case 'WBZ':
            showEndRepNodeFun.value = true;
            break;    
        
      }
    }
    if (newValue.numId) {
      // 数据详情
      showApprove.value = true;
      numId.value = newValue.numId;
      pageTitle.value = '保养单详情'
    } else {
      showApprove.value = false;
    }
  },
  { immediate: true }
);
onBeforeMount(() => {
  if(showApprove.value){
    getBillData(numId.value).then((res)=>{
      if(res.code === 200){
       formData.value=res.data
       approveActive.value = res.data.apvDetails.length;
      }else{
              proxy.$toast({
                    message: res.msg,
              })
      }
    })
  }else{
    getBillCodeAndDropDown();
  }
});
const getBillCodeAndDropDown = ()=>{
    getBillCodeAndDropDowns('BYD').then((res)=>{
       if(res.code === 200){
          formData.value.billCode = res.data.billCode
       }else{
               proxy.$toast({
                    message: res.msg,
              })
       }
    })
}
const showPicker = ref(false);
const maintainIndex = ref("");
const showPickerButton = (index) => {
  showPicker.value = true;
  maintainIndex.value = index;
};

const maintainTypeConfirm = (value) => {
  formData.value.maintainDetails[maintainIndex.value].maintainItemLbl = value;
  showPicker.value = false;
};

const isShowrealExecDate = ref(false);
const pickerIndex = ref("");
const showrealExecDate = (index) => {
  isShowrealExecDate.value = true;
  pickerIndex.value = index;
};
const getymd = (dateStr) => {
  let d = new Date(dateStr);
  let resDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  return resDate;
};
const realExecDateConfirm = (value) => {
  formData.value.maintainDetails[pickerIndex.value].realExecDate =
    getymd(value);
  isShowrealExecDate.value = false;
};

const closemaintain = (index) => {
  formData.value.maintainDetails.splice(index, 1);
};
const addmaintain = () => {
  let obj = {
      message: "",
      maintainItemLbl:'',//保养项目
      maintainCycle: "", //保养周期
      replacement: "", //油品或滤芯型号
      lastExecHour: "", //上次执行台时/h
      planExecHour: "", // 本次计划执行台时/h
      realExecDate: "", // 实际执行日期
      realExecHour: "", //实际执行台时/h
      executor: "", //责任人
      remark: "", //备注
    }
  formData.value.maintainDetails.push(obj);
};
const checkMaintainItem = ref([
   {
      required:true,
      message: '请选择保养项目/内容',
      trigger:'onChange',
  },{
     validator: value => {
       let arr = []
       for(let item of JSON.parse(JSON.stringify(formData.value.maintainDetails))){
         if(value === item.maintainItemLbl){
           arr.push(item)
         }
       }
       if(arr.length>1){
         return false
       }
      },
      message: '保养项目/内容不能重复',
      trigger: 'onChange',
  }
])

/**
 * 保存
 */
const saveData = ()=>{
      form.value.validate().then(()=>{
        let obj = {
           billCode: formData.value.billCode, //报修单号
          carCode:formData.value.carCode, //车辆编号
          carNumber:formData.value.carNumber, //车牌号
          carBrandType:formData.value.carBrandType, //品牌型号
          maintainDetails:JSON.parse(JSON.stringify(formData.value.maintainDetails)),
          billType:'BYD'
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
const saveMaintain = ()=>{
  saveData()
}
/**
 * 派修
 */
const commitMaintain=()=>{
    // saveData()
    form.value.validate().then(()=>{
        let obj = {
           billCode: formData.value.billCode, //报修单号
          carCode:formData.value.carCode, //车辆编号
          carNumber:formData.value.carNumber, //车牌号
          carBrandType:formData.value.carBrandType, //品牌型号
          maintainDetails:JSON.parse(JSON.stringify(formData.value.maintainDetails)),
          billType:'BYD'
        }
        saveNewBill(obj).then((res)=>{
          if(res.code === 200){
              router.push({
                  //传递参数使用params的话，只能使用name指定(在route.js里面声明name)
                  path:'/dispatchman',
                  query:{
                    numId:numId.value,
                    type:'maintain'
                  }
            })
          }else{
              proxy.$toast({
                    message: res.msg,
              })
          }
        })
  })
  .catch (()=>{
    console.log('错误')
  }) 
}
/**
 * 删除
 */
const deleteMaintain=()=>{
  let obj = {
    billId:numId.value,
    billType:'BYD'
  }
  deleteBill(obj).then((res) => {
     if(res.code === 200){
       router.go(-1);
        }else {
              proxy.$toast({
                    message: res.msg,
              })
        }
  })
}
/**
 * 退回重修
 */

const exitMaintain=()=>{
  isShowNameDialog.value= true;
}
const confirm = () => {
  formDialog.value.validate().then(()=>{
      let obj = {
        billId:numId.value,
        desc:exitdesc.value
      }
      returnRepNode(obj).then((res) => {
            isShowNameDialog.value= false;
            if(res.code === 200){
              router.go(-1);
            }else {
                  proxy.$toast({
                        message: res.msg,
                  })
            }
      })
  })

}

/**
 * 任务完成验收
 */
const completeCheckNodeFun = () => {
    let obj = {
    billId:numId.value,
  }
  completeCheckNode(obj).then((res)=>{
        if(res.code === 200){
          router.go(-1);
        }else {
              proxy.$toast({
                    message: res.msg,
              })
        }
  })
}
/**
 * 开始维保
 */
const startRepNodeFun=()=>{
 let obj = {
    billId:numId.value,
  }
  startRepNode(obj).then((res)=>{
        if(res.code === 200){
          router.go(-1);
        }else {
              proxy.$toast({
                    message: res.msg,
              })
        }
  })
}
/**
 * 结束维保
 */
const endRepNodeFun=()=>{
 let obj = {
    billId :numId.value,
  }
  endRepNode(obj).then((res)=>{
        if(res.code === 200){
          router.go(-1);
        }else {
              proxy.$toast({
                    message: res.msg,
              })
        }
  })
}
</script>

<style lang="less" scoped>
:deep(.van-button--round){
  width: 3rem;
}
:deep(.van-dialog__content){
  margin: .5rem;
}
.tableHeader {
  color: #666;
  font-size: .4rem;
  margin: .16rem;
  background-color: #ffffff;
  margin: .16rem 0;
  padding: .16rem !important;
}
.topBox {
  margin-top: 0.16rem;
}
.container {
  display: flex;
  height: 100vh;
  flex-direction: column;
  .main {
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
    margin: .16rem 0;
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
  padding-top: 90px;
  background-color: #ffffff;
  margin: .16rem;
  border-radius: 0.21333rem;
  position: relative;
  .closemaintain {
    font-size: 28px;
    position: absolute;
    top: 32px;
    right: 32px;
  }
  .tableIndex {
    font-size: 28px;
    position: absolute;
    top: 32px;
    left: 32px;
    font-weight: 600;
  }
}
.addmaintain {
  font-size: 32px;
  margin: 0 32px;
  display: block;
}

</style>