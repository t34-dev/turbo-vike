// pages/lang/+onBeforeRender.ts
import type { OnBeforeRenderAsync } from "vike/types";

// Типизация данных с JSONPlaceholder
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const onBeforeRender: OnBeforeRenderAsync = async (pageContext): ReturnType<OnBeforeRenderAsync> => {
  const locale = pageContext.pageProps?.locale || "en";

  try {
    // Получаем данные
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos: Todo[] = await response.json();

    // Возвращаем обновленный контекст
    return {
      pageContext: {
        pageProps: {
          locale, // сохраняем язык
          todos: todos.slice(0, 5), // берем первые 5 задач для примера
        },
      },
    };
  } catch (error) {
    console.error("Error fetching todos:", error);
    return {
      pageContext: {
        pageProps: {
          locale,
          todos: [],
        },
      },
    };
  }
};
