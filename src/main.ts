import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
// 全局样式
import '@/assets/styles/index.css'; // or'
import 'bulma/css/bulma.min.css'; // or
import '@/assets/iconfont/iconfont';

import { DatePicker } from 'ant-design-vue';
// 路由
import router from './router/index'

// 全局组件
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import CodeEditor from '@/components/CodeEditor/CodeEditor.vue'
import ClipBoard from '@/components/ClipBoard/ClipBoard.vue'


const app =  createApp(App)
app.component('SvgIcon', SvgIcon);
app.component('CodeEditor', CodeEditor)
app.component('Clipboard', Clipboard)
app.use(DatePicker);
app.use(router)
app.mount('#app')
