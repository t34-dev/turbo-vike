import React from "react";
import { useData } from "vike-react/useData";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";
import { useStore } from "@/store";
import { Todo } from "@/pages/query/types";
import { Data } from "@/pages/query/index/+data";
import { useTypedTranslation } from "@/i18/useTypedTranslation";
import { Button } from "ui";

export default function Page() {
  const { t, formatDate, formatNumber, hasTranslation } = useTypedTranslation();
  const initialData = useData<Data>();
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);

  const { data, isLoading } = useQuery<Todo>({
    queryKey: ["todos"],
    queryFn: () => api.get("/todos/1"),
    initialData,
    staleTime: 1000 * 60,
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">React Query + Zustand</h1>
      <div className="mb-4">
        <p className="mb-2">Count: {count}</p>
        <Button onClick={increment}>Increment</Button>
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Data from API:</h2>
            <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
            <div className="mt-4">
              <p>Title: {data.title}</p>
              <p>Completed: {data.completed ? "Yes" : "No"}</p>
              <p>ID: {data.id}</p>
              <p>User ID: {data.userId}</p>
            </div>
          </div>
        )}
      </div>
      <hr />

      <div>
        {/* Типизированный перевод */}
        <h1>
          {t("common.welcome", {
            defaultValue: "Welcome!",
            params: { name: "John" },
          })}
        </h1>

        {/* Форматирование даты с учетом локали */}
        <p>Date: {formatDate(new Date())}</p>

        {/* Форматирование числа с учетом локали */}
        <p>Number: {formatNumber(1234567.89)}</p>

        {/* Проверка наличия перевода */}
        {hasTranslation("common.buttons.submit") && <button>{t("common.buttons.submit")}</button>}
      </div>
    </div>
  );
}
