import { createStore } from 'vuex';
import copy from '@/store/module/copy';
import file from '@/store/module/file';
import getters from '@/store/getters';
export const store = createStore({
    modules: {
        copy,
        file
    },
    getters,
    strict: import.meta.env.VITE_ENV,
});