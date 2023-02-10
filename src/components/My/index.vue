<template>
  <div>
      <div class="topBox">
          <p class="personCenter">个人中心</p>
          <div class="bgColor">
              <div class="personName">
                  <p>小小肖</p>
                  <p>点检员</p>
              </div>
              <div class="personImg">

              </div>
          </div>
      </div>
      <van-divider dashed>个人信息</van-divider>
      <div class="changePassword">
        <van-field
          is-link
          readonly
          name="picker"
          label="修改密码"
          @click="showPassWord = true"
        />
        <a-modal
                :visible="showPassWord"
                :closable="false"
                :maskClosable="false"
                width="80%"
                :cancelButtonProps="{ props: {type: 'normal'} }"
                @ok="handleOk"
                @cancel="handleCancel"
                centered
                ok-text="确认"
                cancel-text="取消"
                :bodyStyle = "{height:'4rem'}"
        >
            <van-field v-model="passWordData.password" type="password" label="原密码" />
            <van-field v-model="passWordData.newPassword" type="password" label="新密码" />
            <van-field v-model="passWordData.confirmPassword" type="password" label="新密码" />
        </a-modal>
      </div>
      <!-- <div class="layout" @click="layOut">
          退出登录
      </div> -->
      <div  class="layout" @click="layOut">
        <van-button round block type="primary" native-type="submit">
          退出登录
        </van-button>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import store from '@/store'
const router = useRouter();
const showPassWord = ref(false);
// showPassWord.value = false
const passWordData = ref({
  oldPassword:'',
  newPassword:'',
  confirmPassword:''
})
const handleOk = ()=>{
  showPassWord.value = false
}
const handleCancel = ()=>{
  showPassWord.value = false
}
const onBeforeClose=(action,done)=>{
  if(action === 'confirm'){
    // return done(false)
    showPassWord.value = false
  }else{
    // done()
    showPassWord.value = false
  }
}
const layOut = ()=>{
  store.dispatch('app/logout')
}
</script>

<style lang="less" scoped>
.changePassword :global(.ant-modal-title){
      font-size: 0.42rem;
      line-height: 0.42rem;
      text-align: center;
}
.changePassword :global(.ant-btn){
            width: 1.5rem;
            height: 0.8rem;
}
  .topBox{
    width: 100%;
    height: 6rem;
    background-color: #1989fa;
    padding-top: .32rem;
    .personCenter{
      color: #ffffff;
      font-size: .48rem;
      font-weight: 600;
      text-align: center;
    }
    .bgColor{
      width: 70%;
      height: 3.5rem;
      margin: .6rem auto 0;
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .32rem;
      border-radius: .5rem;
      p{
          font-size: .48rem;
          font-weight: 600;
      }
      p:last-child{
        font-size: .40rem;
        margin-top: .48rem;
        font-weight: 100;
        color: #000;
      }
      .personImg{
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        background-color: #e2ad71;
      }
    }
  }
  .layout{
    width: 90%;
    position: absolute;
    bottom: 2rem;
    left: 5%;
  }
</style>