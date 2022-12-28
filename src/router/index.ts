// 导入router所需的方法
import { createRouter, createWebHistory } from 'vue-router'


// 路由参数配置
const routers = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'layout',
            component: () => import('@/layout/Layout.vue'),
            children: [
                {
                    path: '',
                    name: 'index',
                    component: () => import('@/page/helloworld.vue'),
                },
            ]
        }
    ],
})

export default routers

