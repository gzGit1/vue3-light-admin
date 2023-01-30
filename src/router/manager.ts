import { RouteRecordRaw } from 'vue-router'
export const managerRouteList: Array<RouteRecordRaw> = [
    {
        path: '/manager/backstage',
        name: 'backstage',
        component: () => import('@/Layout/index.vue'),
        redirect: { name: 'processIndex' },
        meta: {
            resourceName: '流程管理',
            name: '流程管理',
        },
        children: [
            {
                path: '/manager/backstage/processIndex',
                name: 'processIndex',
                component: () => import('@/views/manager/processIndex.vue'),
                meta: {
                    name: '流程管理'
                },
            },
            {
                path: '/manager/backstage/editProgress/:id',
                name: 'editProgress',
                props: true,
                component: () => import('@/views/manager/editProgress.vue'),
                meta: {
                    name: '编辑流程',
                    hidden: true,
                    activeMenu: '/manager/backstage/processIndex'
                },
            },
            {
                path: '/manager/backstage/processNode',
                name: 'processNode',
                component: () => import('@/views/manager/processNode.vue'),
                meta: {
                    name: '节点管理'
                },
            },
            {
                path: '/manager/backstage/echartsMap',
                name: 'echartsMap',
                component: () => import('@/views/manager/echartsMap.vue'),
                meta: {
                    name: 'echarts地图'
                },
            },
            {
                path: '/manager/backstage/vForm',
                name: 'vForm',
                component: () => import('@/views/manager/vForm.vue'),
                meta: {
                    name: '自定义表单'
                },
            },
            {
                path: '/manager/backstage/canvasDraw',
                name: 'canvasDraw',
                component: () => import('@/views/manager/canvasDraw.vue'),
                meta: {
                    name: '画板'
                },
            },
            {
                path: '/manager/backstage/menu',
                name: 'infiniteMenu',
                component: () => import('@/views/public.vue'),
                meta: {
                    name: '无限嵌套菜单'
                },
                children: [
                    {
                        path: '/manager/backstage/menu1',
                        name: 'menu1',
                        component: () => import('@/views/manager/menu.vue'),
                        meta: {
                            name: '菜单1'
                        },
                    },
                    {
                        path: '/manager/backstage/menu2',
                        name: 'menu2',
                        component: () => import('@/views/public.vue'),
                        meta: {
                            name: '菜单2'
                        },
                        children: [
                            {
                                path: '/manager/backstage/menu3',
                                name: 'menu3',
                                component: () => import('@/views/manager/menu.vue'),
                                meta: {
                                    name: '菜单2'
                                },
                            },
                            {
                                path: '/manager/backstage/menu4',
                                name: 'menu4',
                                component: () => import('@/views/manager/menu.vue'),
                                meta: {
                                    name: '菜单3'
                                },
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
