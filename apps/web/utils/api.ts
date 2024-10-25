// utils/api.ts
const BASE_URL = import.meta.env.PROD
  ? "https://jsonplaceholder.typicode.com" // production URL
  : "http://localhost:3000/placeholder"; // development URL

export const api = {
  get: async (endpoint: string) => {
    // Проверяем SSR через import.meta.env
    const url = import.meta.env.SSR
      ? `https://jsonplaceholder.typicode.com${endpoint}` // Для SSR всегда используем полный URL
      : `/placeholder${endpoint}`; // Для клиента используем прокси

    const response = await fetch(url);
    if (!response.ok) throw new Error("API Error");
    return response.json();
  },
};
