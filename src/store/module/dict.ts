import { SAVE_DICT_ITEM, DELETE_DICT_ITEM } from '@/utils/constant'
import { getDictDataByType } from '@/api/dict/dictData'

const getState = () => {
    return {
        dictMap: {}
    }
}

const state = getState();


const mutations = {

    [SAVE_DICT_ITEM](state, data) {
        let obj = {}
        obj[data.dictKey] = data
        state.dictMap = Object.assign({}, state.dictMap, obj)
    },

    [DELETE_DICT_ITEM](state, dictKey) {
        delete state.dictMap[dictKey]
    }

}

const actions = {
    getByDictkey({ commit }, data) {

        if (state.dictMap[data.dictKey]) {
            Promise.resolve()
        } else {
            // 防止同一个key多次请求
            commit('SAVE_DICT_ITEM', {
                dictKey: data.dictKey,
                items: []
            })
        }
        getDictDataByType(data.dictKey).then((res) => { 
            if (res.data) {
                commit(SAVE_DICT_ITEM, {
                    dictKey: data.dictKey,
                    items: res.data
                })
            } else {
                commit(DELETE_DICT_ITEM, data.dictKey)
            }
            Promise.resolve();
        }).catch(error => {
            commit(DELETE_DICT_ITEM, data.dictKey)
            Promise.reject();
        })

    }
}

export default {
    namespace: true,
    state,
    mutations,
    actions
}