import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import '@/assets/styles/index.css'; // or'
import { DatePicker } from 'ant-design-vue';
import router from './router/index'


const app =  createApp(App)
app.use(DatePicker);
app.use(router)
app.mount('#app')
