// 导入router所需的方法
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        component: () => import('@/layout/Layout.vue'),
        redirect: to => {
            return {
                path: 'index'
            }
        },
        children: [
            {
                path: 'index',
                name: 'Index',
                component: () => import('@/page/index.vue'),
                meta: {
                    title: '首页',
                }
            },
            {
                path: 'test',
                name: 'Test',
                component: () => import('@/page/test.vue'),
            },
            {
                path: 'sqlgenerate',
                name: 'SqlGenerate',
                component: () => import('@/page/sqlGenerate/SqlGenerate.vue'),
            },
            {
                path: 'codeGenerate',
                name: 'codeGenerate',
                component: () => import('@/page/codeGenerate/codeGenerate.vue'),
            },
        ]
    },
    {
        path: '/404',
        component: () => import('@/page/error/404.vue'),
    },
    {
        path: '/401',
        component: () => import('@/page/error/401.vue'),
    },
]
// 路由参数配置
const router = createRouter({
            history: createWebHistory(),
            routes
        })

export default router

