/**
 * 全局参数处理
 * @param params 
 */
export function transformParams(params) {
    let result = '';
    for (const propName of Object.keys(params)) {
        const propValue = params[propName];
        var part = encodeURIComponent(propName) + "=";
        if (propValue !== null && propValue !== '' && typeof propValue !== 'undefined'){
            if(typeof propValue === 'object'){
                for(const key of Object.keys(propValue)){
                    if (propValue[key] !== null && propValue[key] !== "" && typeof (propValue[key]) !== 'undefined') {
                        let params = propName + '[' + key + ']';
                        var subPart = encodeURIComponent(params) + "=";
                        result += subPart + encodeURIComponent(propValue[key]) + "&";
                    }
                }
            }else {
                result += part + encodeURIComponent(propValue) + "&";
            }
        }
    }
    return result;
};

/**
 * 验证是否为blob格式
 * @param data 
 * @returns 
 */
export async function blobValidate(data) {
    try {
      const text = await data.text();
      // text:必需， 一个有效的 JSON 字符串。
      JSON.parse(text);
      return false;
    } catch (error) {
      return true;
    }
  }