import reuqest from '@/utils/request'

export function getGenerateSql(data:object) {
    return reuqest({
        url: '/sql/generateSql',
        method: 'post',
        data,
    });

}