import request from '@/utils/request'

/**
 * 根据字典类型获取字典值
 * @param dictType 字典类型
 * @returns 
 */
export function getDictDataByType(dictType:string) {
    return request({
        url: '/dict/data/type/'+ dictType,
        method: 'get',
    })
}