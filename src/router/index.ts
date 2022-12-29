// 导入router所需的方法
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/layout/Layout.vue'),
        children: [
            {
                path: '',
                name: 'index',
                component: () => import('@/page/helloworld.vue'),
            },
        ]
    },
]
// 路由参数配置
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

