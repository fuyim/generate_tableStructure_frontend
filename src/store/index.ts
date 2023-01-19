import { createStore } from 'vuex';
import copy from '@/store/module/copy';
import file from '@/store/module/file';
import dict from '@/store/module/dict';
import getters from '@/store/getters';
export const store = createStore({
    modules: {
        copy,
        file,
        dict
    },
    getters,
    strict: import.meta.env.VITE_ENV,
});