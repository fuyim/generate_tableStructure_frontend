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
// vuex
import { store } from '@/store/index'

// 全局组件
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import CodeEditor from '@/components/CodeEditor/CodeEditor.vue'
import ClipBoard from '@/components/ClipBoard/ClipBoard.vue'
import SuccessBtn from '@/components/SuccessBtn/SuccessBtn.vue'
import FileDownVue from '@/components/FileDown/FileDown.vue';
import DictData from '@/components/DictData/dictData.vue';


const app =  createApp(App)
app.component('SvgIcon', SvgIcon);
app.component('CodeEditor', CodeEditor)
app.component('Clipboard', ClipBoard)
app.component('SucceedBtn', SuccessBtn)
app.component('FileDownVue', FileDownVue)
app.component('DictData', DictData)
app.use(DatePicker);
app.use(router)
app.use(store);
app.mount('#app')
