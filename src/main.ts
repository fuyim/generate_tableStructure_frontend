import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import { DatePicker } from 'ant-design-vue';

const app =  createApp(App)
app.use(DatePicker);

app.mount('#app')
