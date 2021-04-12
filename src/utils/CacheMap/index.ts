const GLOBAL_CACHE_MAP = "GLOBAL_CACHE_MAP";

class CacheMap {
  private cacheMap: Record<string, any> = {};
  constructor() {
    const cahceStr = sessionStorage.getItem(GLOBAL_CACHE_MAP);
    if (cahceStr) {
      try {
        this.cacheMap = JSON.parse(cahceStr);
      } catch (error) {
        this.cacheMap = {};
      }
    }
  }

  clear() {
    this.cacheMap = {};
  }

  set(key: string, val: any) {
    this.cacheMap[key] = val;
    sessionStorage.setItem(GLOBAL_CACHE_MAP, JSON.stringify(this.cacheMap));
    return this;
  }

  get(key: string) {
    return this.cacheMap[key];
  }
}

const cacheMap = new CacheMap();

//@ts-ignore
window.cacheMap = cacheMap;

export default cacheMap;
