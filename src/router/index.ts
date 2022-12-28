// 导入router所需的方法
import { createRouter, createWebHistory } from 'vue-router'

import helloworld from '@/page/helloworld.vue'

// 路由参数配置
const routers = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'layout',
            component: () => import('@/layout/Layout.vue'),
        }
    ],
})

export default routers

