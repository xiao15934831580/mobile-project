<template>
    <van-form @failed="onFailed" class= 'loginBox' ref='form'>
      
          <div class="vanRow" style="">
            <van-row class="vanInput" >
              <van-row>
                <div class="fontSize">
                  <van-cell-group inset>
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
                      type='password'
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
                  </van-cell-group>
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
          console.log("222222")
            if (loginForm.value.rememberMe) {
              setCookie(loginForm.value.username, loginForm.value.password, 30);
            } else {
              clearCookie();
            }

            let obj = {
              username: loginForm.value.username,
              password: proxy.$md5(
                loginForm.value.password + "b459dcbe8a3d46d49dfdc39c12df854e"
              ),
              loginClient: "app",
            };
            store.dispatch("app/login",obj)
  })

};
onMounted(()=> {
  getaccount();
})
const getaccount = () => {
  if (document.cookie.length >= 0) {
    loginForm.value.username = getCookie("mobile");
    loginForm.value.password = getCookie("password");
    loginForm.value.rememberMe = true;
    console.log(form.username);
  }
};
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
const setCookie = (c_name, c_pwd, exdate) => {
  //账号，密码 ，过期的天数

  let date = new Date();

  console.log(c_name, c_pwd);

  date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * exdate); //保存的天数

  document.cookie =
    "mobile=" + c_name + ";path=/;expires=" + date.toLocaleString();

  document.cookie =
    "password=" + c_pwd + ";path=/;expires=" + date.toLocaleString();
};

const getCookie = (name) => {
  var arr = document.cookie.split(";");

  //["_ga=GA1.1.1756734561.1561034020", " mobile=123" password=456"]

  for (var i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split("="); // ["_ga", "GA1.1.1756734561.1561034020"]

    if (arr2[0].trim() == name) {
      return arr2[1];
    }
  }
};

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