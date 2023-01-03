import { COPY_TEXT } from '@/utils/constant';
const state = ()=>{
    return {
        copyText: ''
    }
}


const mutations = {
    [COPY_TEXT] (state, text) {
        state.copyText = text
    }
}

const actions = {
    copyText ({commit}, text) {
        commit(COPY_TEXT, text)
    }
}

export default {
    namespace: true,
    state,
    mutations,
    actions
}