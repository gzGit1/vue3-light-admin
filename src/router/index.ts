import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { managerRouteList } from './manager';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/login.vue')
  },
  {
    path: '/desktop',
    name: 'desktop',
    component: () => import('@/views/desktop.vue')
  },
  {
    path: '/leafletMap',
    name: 'leafletMap',
    component: () => import('@/views/leaflet/index.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/AboutView.vue')
      },
    ]
  },
  ...managerRouteList,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/404.vue')
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

export default router;
