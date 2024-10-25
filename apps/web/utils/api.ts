import { debounce, DebouncedFunc } from "lodash-es";

const CACHE_TIME = 5 * 60 * 1000; // 5 минут в миллисекундах

interface CachedData<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CachedData<unknown>>();

async function fetchData<T>(endpoint: string): Promise<T> {
  const cacheKey = endpoint;
  const now = Date.now();

  if (cache.has(cacheKey)) {
    const cachedData = cache.get(cacheKey) as CachedData<T>;
    if (now - cachedData.timestamp < CACHE_TIME) {
      return cachedData.data;
    }
  }

  const url = import.meta.env.SSR ? `https://jsonplaceholder.typicode.com${endpoint}` : `/placeholder${endpoint}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("API Error");

  const data: T = await response.json();

  cache.set(cacheKey, { data, timestamp: now });

  return data;
}

type ApiFunction = <T>(endpoint: string) => Promise<T>;

// Создаем дебаунсированную версию функции с правильным типом
const debouncedFetchData: ApiFunction = debounce(<T>(endpoint: string) => fetchData<T>(endpoint), 300) as ApiFunction;

export const api: { get: ApiFunction } = {
  get: import.meta.env.SSR ? fetchData : debouncedFetchData,
};
