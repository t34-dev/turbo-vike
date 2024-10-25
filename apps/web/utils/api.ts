// utils/api.ts
import { debounce } from "lodash-es";

const BASE_URL = import.meta.env.PROD ? "https://jsonplaceholder.typicode.com" : "http://localhost:3000/placeholder";

// Кэш для запросов
const cache = new Map();

// Создаем обычную функцию для запросов
const fetchData = async (endpoint: string) => {
  // Проверяем кэш
  const cacheKey = endpoint;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const url = import.meta.env.SSR ? `https://jsonplaceholder.typicode.com${endpoint}` : `/placeholder${endpoint}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("API Error");

  const data = await response.json();
  // Сохраняем в кэш
  cache.set(cacheKey, data);

  return data;
};

export const api = {
  // Для SSR используем обычную функцию
  get: import.meta.env.SSR
    ? fetchData
    : // Для клиента используем debounce
      debounce(fetchData, 300),
};
