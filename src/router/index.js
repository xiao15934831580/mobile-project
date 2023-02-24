import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: '/',
    component:() => import('../components/Login/index.vue')
  },
  {
    path: '/index',
    redirect: '/home',
    component:() => import('../components/Index/index.vue'),
    children: [
      {
        path: '/home',
        name: '首页',
        component: () => import('../components/Home/index.vue'),
      },
      {
        path: '/task',
        name: '任务',
        component: () => import('../components/Task/index.vue'),
      },
      {
        path: '/my',
        name: '我的',
        component: () => import('../components/My/index.vue'),
      },
    ]
  },
  {
    path: '/repairapply',
    component:() => import('../components/Home/RepairApply/index.vue'),
  },
  {
    path: '/maintainapply',
    component:() => import('../components/Home/MaintainApply/index.vue'),
  },
  {
    path: '/violation',
    component:() => import('../components/Home/Violation/index.vue'),
  },
  {
    path: '/outperson',
    component:() => import('../components/Home/Outperson/index.vue'),
  },
  {
    path: '/repairsearch',
    component:() => import('../components/Home/RepairSearch/index.vue'),
  },
  {
    path: '/maintainsearch',
    component:() => import('../components/Home/MaintainSearch/index.vue'),
  },
  {
    path: '/violationsearch',
    component:() => import('../components/Home/ViolationSearch/index.vue'),
  },
  {
    path: '/outpersonsearch',
    component:() => import('../components/Home/OutpersonSearch/index.vue'),
  },
  {
    path: '/dispatchman',
    component:() => import('../components/Home/DispatchMan/index.vue'),
  }
];
const router = createRouter({
  mode:'history',
  history: createWebHashHistory(),
  routes
});
export default router;