/**
 * 这是一个缓存工具
 */
class CacheUtils {

    public static getSessionCache(key: string): string {
        if (!sessionStorage) {
            return null;
        }
        if (key === null) {
            return null;
        }
        return sessionStorage.getItem(key);
    }

    public static setSessionCache(key: string, value: any) {
        if (!sessionStorage) {
            return;
        }
        if (key === null) {
            return;
        }
        if (key !== null && value !== null) {
            sessionStorage.setItem(key, value);
        }
    }

    public static removeSessionCache(key: string) {
        sessionStorage.removeItem(key);
    }

    public static getSessionJson(key: string):any {
        const value = CacheUtils.getSessionCache(key)
        if (value !== null) {
            return JSON.parse(value);
        }
    }

    public static setSessionJson(key: string, value: any): void {
        if (value != null) {
            CacheUtils.setSessionCache(key, JSON.stringify(value));
        }
    }

    public static getLocalCache(key: string): string {
        if (!localStorage) {
            return null
        }
        if (key == null) {
            return null
        }
        return localStorage.getItem(key)
    }

    public static setLocalCache(key: string, value: any): void {
        if (!localStorage) {
            return
        }
        if (key != null && value != null) {
            localStorage.setItem(key, value)
        }
    }

    public static removeLocalCache(key: string): void {
        localStorage.removeItem(key);
    }

    public static setLocalJson(key: string, value: any): void {
        if (value != null) {
            CacheUtils.setLocalCache(key, JSON.stringify(value))
          }
    }

    public static getLocalJson(key: string): string {
        const value = CacheUtils.getLocalCache(key)
        if (value != null) {
          return JSON.parse(value)
        }
    }

}

export default CacheUtils;