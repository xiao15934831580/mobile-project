import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index';
import router from './router'
import 'amfe-flexible'
import { Button,Tabbar, TabbarItem,row,icon,checkbox,Space,Form, Field, Switch,CellGroup,Picker   } from 'vant';
import 'vant/lib/index.css';
import '@/assets/css/global.less';
// import vue from 'vue';
// vue.config.productionTip = false
createApp(App).use(router).use(store)
.use(Button)
.use(Tabbar)
.use(row)
.use(icon)
.use(checkbox)
.use(Form)
.use(Field)
.use(CellGroup)
.use(Space)
.use(Switch)
.use(Picker)
.use(TabbarItem)
.mount('#app')
