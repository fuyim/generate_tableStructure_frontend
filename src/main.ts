import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import '@/assets/styles/index.css'; // or'
import 'bulma/css/bulma.min.css'; // or
import '@/assets/iconfont/iconfont';

import { DatePicker } from 'ant-design-vue';
import router from './router/index'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'


const app =  createApp(App)
app.component('SvgIcon', SvgIcon);
app.use(DatePicker);
app.use(router)
app.mount('#app')
