import request from '@/utils/request'
// 导出Excel文件
export function exportExcel (data:object)  {
    return request({
        url: '/generate/test',
        method: 'post',
        data,
    })
}


