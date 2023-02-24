import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index';
import router from './router'
import 'amfe-flexible'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { Button,Tabbar,Checkbox,CheckboxGroup ,Uploader,Step,Dialog ,List, Steps,RadioGroup, Radio ,Search, Toast ,TabbarItem,DatetimePicker ,Space,Form, Field, Switch,CellGroup,Picker   } from 'vant';

import 'vant/lib/index.css';
import axios from 'axios';
import md5 from 'js-md5';
import * as Base64 from 'js-base64'
import '@/router/permission'
import '@/assets/css/global.less';
const app = createApp(App)
// useVantUI(app)
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$md5 = md5;
app.config.globalProperties.$Base64 = Base64;
app.use(router).use(store)
.use(Button)
.use(Antd)
.use(Tabbar)
.use(Dialog)
.use(Radio)
.use(RadioGroup)
.use(Form)
.use(Search)
.use(Checkbox)
.use(CheckboxGroup )
.use(Field)
.use(Step)
.use(List)
.use(Toast)
.use(Steps)
.use(Uploader)
.use(DatetimePicker )
.use(CellGroup)
.use(Space)
.use(Switch)
.use(Picker)
.use(TabbarItem)
.mount('#app')
