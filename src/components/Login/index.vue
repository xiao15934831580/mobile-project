<template>
    <van-form class= 'loginBox' ref='form'>
          <div class="vanRow" style="">
            <van-row class="vanInput" >
              <van-row>
                <div class="fontSize">
                  <van-field
                    style="color: white;font-size: 16px"
                    v-model="loginForm.username"
                    name="username"
                    label="用户名"
                    left-icon="manager-o"
                    placeholder="请输入用户名或手机号"
                    :error="false"
                    :rules="[{ required: true, message: '请填写用户名或手机号' }]" clearable />
                  <van-field
                    style="color: white;font-size: 16px"
                    v-model="loginForm.password"
                    :type="passType"
                    name="password"
                    label="密码"
                    left-icon="goods-collect-o"
                    placeholder="请输入密码"
                    :error="false"
                    :rules="[{ required: true, message: '请填写密码' }]"
                    @click-right-icon="showPassword"
                  >
                    <template #right-icon>
                      <van-icon :name="passIcon" color="#E8F0FE"></van-icon>
                    </template>

                  </van-field>
            
                  <van-checkbox 
                      class="vancheck"
                      style="height:40px;margin: 4px 15px;font-size: 15px;"
                      v-model="loginForm.rememberMe"
                      name = 'rememberMe' shape="square">
                      记住密码
                  </van-checkbox>
                </div>
              </van-row>
            </van-row>
          </div>
           <div style="margin: 16px;">
                <van-button @click='handleLogin' round block type="primary" native-type="submit">
                登录
                </van-button>
            </div>
        </van-form>
  
</template>

<script setup>
import { useStore } from "vuex";
import { ref, onMounted,getCurrentInstance } from "vue";
const store = useStore();
const { proxy } = getCurrentInstance();
const form = ref('')
const loginForm = ref(
    {
                username: "",
                password: "",
                rememberMe: false,
          }
) 
const handleLogin = () => {
  form.value.validate().then(()=>{
      let obj = {
        username: loginForm.value.username,
        password: proxy.$md5(
          loginForm.value.password + "b459dcbe8a3d46d49dfdc39c12df854e"
        ),
        loginClient: "app",
      };
      store.dispatch("app/login",obj);
  })
  .catch (()=> {
  })

};
onMounted(()=> {
    if(!!localStorage.getItem("rememberMe") &&localStorage.getItem("rememberMe") =='true'){
       getrememberPassword();
    }
})
const getrememberPassword=()=> {
            this.loginForm = {
                username:!!localStorage.getItem("username")?localStorage.getItem("username"):'',
                password:!!localStorage.getItem("password")?localStorage.getItem("password"):'',
                rememberMe:!!localStorage.getItem("rememberMe")?localStorage.getItem("rememberMe"):false
            };
}
// const handleLogin = () => {
//         // let _this = this;
//         // let param ={
//         //   username: loginForm.username,
//         //   password: loginForm.password
//         // };
//         store.dispatch("app/login",'111');
//         // requestLogin(param).then(res => {
//         //   if(res.code == 200){
//         //     Toast({
//         //         message: '登录成功',
//         //     })
//         //     localStorage.setItem('token', res.token);
//         //     if (this.loginForm.rememberMe) {
//         //         localStorage.setItem("username", this.loginForm.username, {
//         //             expires: 30
//         //         });
//         //         localStorage.setItem(
//         //             "password",
//         //             this.loginForm.password,
//         //             {
//         //                 expires: 30
//         //             }
//         //         );
//         //         localStorage.setItem("rememberMe", this.loginForm.rememberMe, {
//         //             expires: 30
//         //         });
//         //     } else {
//         //         localStorage.removeItem("username");
//         //         localStorage.removeItem("password");
//         //         localStorage.removeItem("rememberMe");
//         //     }
//         //         _this.$router.push({path: '/index'});
//         //     }else{
//         //       Toast({
//         //         message: '用户名或密码错误，登录失败',
//         //       })
//         //     }
//         // });
//       }
</script>

<style lang="less" scoped>
    .loginBox{
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        width:100%;
        .van-row{
            width:100%;
        }
        .vanInput{
            .fontSize{
                 width:100%;
            }
        }

    }
    
</style>