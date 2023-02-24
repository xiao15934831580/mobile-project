import { login as loginApi } from '@/api/index'
import router from '@/router'
import store from '@/store'
import { setTokenTime } from '@/utils/auth'
import {getCurrentInstance} from 'vue'

export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '',
    siderType: true,
    lang: localStorage.getItem('lang') || 'zh',
    userData:  localStorage.getItem('userData') || '',
    loginErr:false
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    changeSiderType(state) {
      state.siderType = !state.siderType
    },
    changLang (state, lang) {
      state.lang = lang
    },
    SetUserData(state,userData){
      state.userData = userData
      localStorage.setItem('userData', JSON.stringify(userData))
    },
    changeErr(state,err){
      state.loginErr = err
    }
  },
  actions: {
    login({ commit }, userInfo) {
      let proxy = getCurrentInstance();
      // commit('setToken', '1111')
      // router.replace('/')
      return new Promise((resolve, reject) => {
        loginApi(userInfo)
          .then((res) => {
            if(res.code === 200){
              console.log(res)
              commit('SetUserData', res.data)
              commit('setToken', res.msg)
              setTokenTime()
              router.replace('/index')
              resolve()
            }else{
              
              proxy.$toast({
                    message: '用户名或密码错误，登录失败',
              })
            }

          })
          .catch((err) => {
            proxy.$toast({
              message: '用户名或密码错误，登录失败',
            })
            reject(err)
          })
      })
    },
    // 退出
    logout({ commit }) { 
      commit('setToken', '')
      localStorage.clear()
      router.replace('/')
    }
  }   
}
