<template>
  <div class="container">
    <van-nav-bar
      :title= 'title'
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
        <p>{{headerTitle}}</p>
        <div>
            <van-radio-group v-model="checked">
            <van-cell-group inset>
                <van-cell
                v-for="(item, index) in list"
                clickable
                :key="index"
                :title="`${item}`"
                @click="changeChecked(item)"
                >
                <template #right-icon>
                    <!-- <van-checkbox
                    :name="item"
                    :ref="el => checkboxRefs[index] = el"
                    @click.stop
                    /> -->
                    <van-radio :name= 'item' />
                </template>
                </van-cell>
            </van-cell-group>
            </van-radio-group>
        </div>
    </div>
    <div class="footerBox">
        <div></div>
        <!-- <van-checkbox  v-model="isall" @click="checkAll">全选</van-checkbox> -->
        <van-button  type="primary" @click="confirm" size="normal">确定</van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUpdate,onBeforeMount,watch } from 'vue';
import { useRouter } from "vue-router"; 
import {getCurrentInstance} from "vue"
import { getRepMan as getRepMan,dispatchNewMatBill as dispatchNewMatBill,dispatchRepBill as dispatchRepBill, getInspector as getInspector, startInspect as startInspect} from '@/api/home'
const router = useRouter();
const {proxy} = getCurrentInstance();
const list = ref(["weqwe", "张三", "王五", "李四"])
const checked = ref([""]);
const checkboxRefs = ref([]);
const toggle = (index) => {
    checkboxRefs.value[index].toggle();
};
const numId = ref('')
const pagetType = ref('')
const distribution = ref('')
const title = ref('')
const headerTitle = ref('')
watch(
  () => router.currentRoute.value.query,
  (newValue) => {
    if (newValue.numId) {
      title.value = '派修'
      headerTitle.value = '选择维修工'
      numId.value = newValue.numId;
    }
    if(newValue.name){
      title.value = '分配点检员'
      headerTitle.value = '选择点检员'
      distribution.value = newValue.name
    }
    pagetType.value = newValue.type;
  },
  { immediate: true }
);
onBeforeUpdate(() => {
    checkboxRefs.value = [];
});
onBeforeMount(() => {
  if(distribution.value === 'distribution'){
    getInspector().then((res)=>{
      if(res.code === 200){
            list.value = res.data
        }else {
               proxy.$toast({
                    message: res.msg,
              })
        }
    })
  }else {
    getRepMan().then((res) => {
        if(res.code === 200){
            list.value = res.data
        }else {
               proxy.$toast({
                    message: res.msg,
              })
        }
    })
  }

});
const changeChecked=(name)=>{
    checked.value = name
}
const onClickLeft = () => {
  router.go(-1);
};
const confirm =()=>{
  let obj={
    billId:numId.value,
    repUserName: JSON.parse(JSON.stringify(checked.value)) 
  }
  if(pagetType.value === 'maintain'){
        dispatchNewMatBill(obj).then((res)=>{
            if(res.code === 200){
                router.push({
                      path:'/task',
                })
            }else {
                  proxy.$toast({
                        message: res.msg,
                  })
            }
        })
  }else{
    if(distribution.value === 'distribution'){
      let params={
        billId:numId.value,
        inspector:JSON.parse(JSON.stringify(checked.value)) 
      }
      startInspect(params).then((res)=>{
            if(res.code === 200){
                router.push({
                      path:'/task',
                })
            }else {
                  proxy.$toast({
                        message: res.msg,
                  })
            }
        })
    }else {
        dispatchRepBill(obj).then((res)=>{
            if(res.code === 200){
                router.push({
                    path:'/task',
              })
            }else {
                  proxy.$toast({
                        message: res.msg,
                  })
            }
        })
    }

  }

}
</script>

<style lang="less" scoped>
:deep(.van-checkbox__label){
    color: #323233;
    font-size: 0.37333rem;
}
:deep(.van-button--normal){
    width: 2.5rem;
}
.container {
  display: flex;
  height: 100vh;
  flex-direction: column;
  .main {
    width: 100%;
    flex: 1;
    overflow-y: scroll;
     padding: .16rem;
    p{
        font-size: .35rem;
       margin: .16rem 0;
    }
  }
}
.footerBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .2rem;
}
</style>
