import request from '@/utils/request';
import { saveAs } from 'file-saver';
import errorCode from '@/utils/errorCode';
import { message } from "ant-design-vue";
import {transformParams, blobValidate} from '@/utils/global'
/**
 * 
 * @param url 请求地址
 * @param params 参数
 * @param filename 文件名称
 * @returns 
 */
export function download(url:string,params:object,filename:string){
    return request.post(url,params,{
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        responseType: 'blob',
        transformRequest: [(params)=>{
            return transformParams(params)
        }],
    }).then(async (data:any) => {
        const isBlob = await blobValidate(data);
        if(isBlob){
            const blob = new Blob([data])
            saveAs(blob, filename)
        } else {
            const resText = await data.text();
            const rspObj = JSON.parse(resText);
            const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
            message.error(errMsg)
        }
    }).catch((error)=>{
        message.error(errorCode['dowanError'])
    })
}