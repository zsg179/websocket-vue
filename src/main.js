// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { Form,Field,Button,Checkbox,Cell,Picker,Popup
,Toast,Dialog,RadioGroup, Radio,Grid, GridItem,Image as VanImage
,Icon,Divider,Col, Row } from 'vant';
import '@vant/touch-emulator';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
Vue.use(Form).use(Field).use(Button).use(Checkbox).use(Cell)
.use(Picker).use(Popup).use(Toast).use(Dialog).use(RadioGroup)
.use(Radio).use(Grid).use(GridItem).use(VanImage).use(Icon).use(Divider)
.use(Col).use(Row);
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog

//axios.defaults.baseURL = "http://localhost:8022"
axios.defaults.baseURL = "http://pensionlife.95522.cn/szyl_vote/"

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
