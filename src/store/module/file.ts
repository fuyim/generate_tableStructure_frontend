import { URL , PARAMS , FILE_NAME } from '@/utils/constant';
const state = ()=>{
    return {
        url: '',
        params: {},
        fileName: '',
    }
}


const mutations = {
    [URL] (state, url) {
        state.url = url
    },
    [PARAMS] (state, params) {
        state.params = params
    },
    [FILE_NAME] (state, fileName) {
        state.fileName = fileName
    },
}

const actions = {
    url ({commit}, url) {
        commit(URL, url)
    },
    params ({commit}, params) {
        commit(PARAMS, params)
    },
    fileName ({commit}, fileName) {
        commit(FILE_NAME, fileName)
    },
}

export default {
    namespace: true,
    state,
    mutations,
    actions
}