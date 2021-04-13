import { useEffect, useState, useCallback, useRef } from "react";
import { Loading } from "../../components";
import cacheMap from "../../utils/CacheMap";
import http from "../../utils/http";

type Method = "get" | "delete" | "head" | "options" | "post" | "put" | "patch";

interface IConfig {
  /** api url */
  url: string;
  /** 请求方法 */
  method?: Method;
  /** 是否开启全局Loading 默认开启 */
  globalLoading?: boolean;
  /** 是否已进入就发起请求 默认发起 */
  immediatelyFetch?: boolean;
  /** 请求参数 */
  params?: Record<string, any>;
  useCache?: boolean;
}

const DEV_HOST = "https://dev.com";
const TEST_HOST = "https://test.com";
const PROD_HOST = "https://prod.com";

function getFullUrl(url: string) {
  switch (process.env.NODE_ENV) {
    case "development":
      return `${DEV_HOST}${url}`;
    case "test":
      return `${TEST_HOST}${url}`;
    case "production":
      return `${PROD_HOST}${url}`;
    default:
      return `${PROD_HOST}${url}`;
  }
}

export default function useFetch<TData>(
  {
    method = "get",
    url,
    globalLoading = true,
    immediatelyFetch = true,
    params,
    useCache = false,
  }: IConfig,
  deps?: any[]
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<TData>();
  const ref = useRef(immediatelyFetch);

  const fetchData = useCallback(async () => {
    const fullUrl = getFullUrl(url);
    const cacheData = cacheMap.get(fullUrl);
    if (useCache && cacheData) {
      setData(cacheData);
      return;
    }

    setLoading(true);
    globalLoading && Loading.global(true);

    try {
      const res = await http[method]<TData>(
        fullUrl,
        method === "get" ? { params } : params
      );

      if (res && res.data) {
        setData(res.data);
        setError(undefined);
        if (useCache) {
          cacheMap.set(fullUrl, res.data);
        }
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      globalLoading && Loading.global(false);
    }
  }, [method, url]);

  useEffect(
    () => {
      if (ref.current) {
        fetchData();
        return;
      }

      ref.current = true;
    },
    deps ? deps : []
  );

  return { data, loading, error, fetchData };
}
