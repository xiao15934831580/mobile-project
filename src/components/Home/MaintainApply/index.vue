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
                />
                <van-popup v-model:show="showPicker" position="bottom">
                  <van-picker
                    :columns="item.maintainType"
                    @confirm="maintainTypeConfirm"
                    @cancel="showPicker = false"
                  />
                </van-popup>
                <van-field
                  v-model="item.maintainCycle"
                  label="保养周期（h）"
                  placeholder="保养周期（h）"
                />
                <van-field
                  v-model="item.replacement"
                  label="油品或滤芯型号"
                  placeholder="油品或滤芯型号"
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
                />
                <van-popup v-model:show="showPicker" position="bottom">
                <van-picker
                    :columns="item.maintainType"
                    @confirm="maintainTypeConfirm"
                    @cancel="showPicker = false"
                />
                </van-popup>
                <van-field
                v-model="item.maintainCycle"
                label="保养周期（h）"
                placeholder="保养周期（h）"
                />
                <van-field
                v-model="item.replacement"
                label="油品或滤芯型号"
                placeholder="油品或滤芯型号"
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
          <van-button round color="#1989fa"  text="保存" />
          <van-button round color="#1989fa"  text="提交" />
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const formData = ref({
  addNumber: "111",
  vehicleNumber: "",
  licensePlateNumber: "",
  modelNumber: "",
  maintainDetails: [
    {
      maintainType: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华"],
      maintainItemLbl: "", //保养项目
      maintainPart: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华"],
      maintainPartResult: "",
      maintainPhenomenon: ["损坏", "异响", "故障"],
      maintainPhenomenonResult: "",
      message: "1",
      maintainCycle: "", //保养周期
      replacement: "", //油品或滤芯型号
      lastExecHour: "", //上次执行台时/h
      planExecHour: "", // 本次计划执行台时/h
      realExecDate: "", // 实际执行日期
      realExecHour: "", //实际执行台时/h
      executor: "", //责任人
      remark: "", //备注
    },
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
const onClickLeft = () => {
  router.push({ path: "home" });
};
const showApprove = ref(true); // 新建状态
watch(
  () => router.currentRoute.value.query,
  (newValue) => {
    console.log("newValue", newValue);
    if (newValue.numId) {
      // 数据详情
      showApprove.value = true;
      let repairId = newValue.numId;
      formData.value.addNumber = repairId;
    } else {
      showApprove.value = false;
    }
  },
  { immediate: true }
);
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
    maintainType: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华"],
    maintainItemLbl: "",
    maintainPart: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华"],
    maintainPartResult: "",
    maintainPhenomenon: ["损坏", "异响", "故障"],
    maintainPhenomenonResult: "",
    message: "",
  };
  formData.value.maintainDetails.push(obj);
};
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