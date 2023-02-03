<template>
  <div>
    <van-space size="16px"> 
      <van-button type="primary" to="/repairapply">报修申请</van-button>
      <van-button type="primary">保修单查询</van-button>
      <van-button type="primary" to='/maintainapply'>保养申请</van-button>
    </van-space>
     <van-space size="16px"> 
      <van-button type="primary">保养单查询</van-button>
      <van-button type="primary">外来人登记</van-button>
      <van-button type="primary">违规登记</van-button>
    </van-space>
    
    <van-space size="16px"> 
      <van-button type="primary">违规历史记录</van-button>
      <van-button type="primary">外来人员登记记录</van-button>
      <van-button type="primary">待办提醒</van-button>
    </van-space>
  </div>
</template>

<script setup>
import { ref } from "vue";
const columns = ref([
      { text: '杭州', value: 'Hangzhou' },
      { text: '宁波', value: 'Ningbo' },
      { text: '温州', value: 'Wenzhou' },
      { text: '绍兴', value: 'Shaoxing' },
      { text: '湖州', value: 'Huzhou' },
    ]);
     const fieldValue = ref('');
    const showPicker = ref(false);

    const onConfirm = ({ selectedOptions }) => {
      showPicker.value = false;
      fieldValue.value = selectedOptions[0].text;
    };
</script>

<style lang="less" scoped>
:deep(.van-space--horizontal .van-space-item){
  width:3rem
}
:deep(.van-button--normal){
  width:100%
}
</style>