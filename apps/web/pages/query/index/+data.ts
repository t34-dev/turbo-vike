import type { Todo, TodoMinimal } from "../types";
import { useConfig } from "vike-react/useConfig";
import { api } from "../../../utils/api";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async () => {
  const config = useConfig();

  const todoData = (await api.get("/todos/1")) as Todo;

  config({
    title: `Todo: ${todoData.title}`,
  });

  // Минимизируем данные если нужно
  return todoData;
};

// Опционально: функция минимизации данных
function minimize(todo: Todo): TodoMinimal {
  const { id, title } = todo;
  return { id, title };
}
