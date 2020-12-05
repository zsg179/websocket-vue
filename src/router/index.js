import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index2',
      component: ()=>import("@/views/index2"),
      meta:{
        title: "深圳供电局赠险领取"
      }
    },
    {
      path: '/computer',
      name: 'computer',
      component: ()=>import("@/views/computer")
    },
    {
      path: '/stake',
      name: 'stake',
      component: ()=>import("@/views/stake"),
      meta:{
        title: "开门红项目押注"
      }
    },
    {
      path: '/stakesaas',
      name: 'stakesaas',
      component: ()=>import("@/views/stakesaas"),
      meta:{
        title: "开门红项目押注后台"
      }
    },
    {
      path: '/stake2',
      name: 'stake2',
      component: ()=>import("@/views/stake2"),
      meta:{
        title: "开门红社区单押注"
      }
    },
    {
      path: '/stakesaas2',
      name: 'stakesaas2',
      component: ()=>import("@/views/stakesaas2"),
      meta:{
        title: "开门红社区单押注后台"
      }
    }
  ]
})
