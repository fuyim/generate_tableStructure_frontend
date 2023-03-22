import reuqest from '@/utils/request'

export function getGenerateCode(data:object) {
    return reuqest({
        url: '/gen/genPreviewCode',
        method: 'post',
        data,
    });
}