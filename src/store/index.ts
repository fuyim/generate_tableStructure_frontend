import { createStore } from 'vuex';
import copy from '@/store/module/copy';
import getters from '@/store/getters';
export const store = createStore({
    modules: {
        copy,
    },
    getters,
    strict: import.meta.env.VITE_ENV,
});