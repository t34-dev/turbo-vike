// pages/docs/+Page.tsx
import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import metaData from "./content/en/_meta.json";
import { RenderNavigation } from "@/pages/docs/render";
import s from "./index.module.scss";

// Предварительно импортируем все MDX файлы
const mdxFiles = import.meta.glob("./content/**/*.mdx");

export { Page };

function Page() {
  const pageContext = usePageContext();
  const locale = pageContext.pageProps?.locale || "en";

  // Удаляем '/docs' из начала пути
  const contentPath = pageContext.urlLogical.replace(/^\/docs/, "") || "/index";

  // Формируем путь к файлу
  const filePath = `./content/${locale}${contentPath}.mdx`;

  // Проверяем, существует ли файл
  if (!mdxFiles[filePath]) {
    return <div>404 - Page not found</div>;
  }

  // Динамический импорт MDX-контента
  const MDXContent = React.lazy(() => mdxFiles[filePath]());

  return (
    <div className={s.wrap}>
      <div className={s.wrap__left}>
        <RenderNavigation meta={metaData} />
      </div>
      <div className={s.wrap__right}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <MDXContent />
        </React.Suspense>
      </div>
    </div>
  );
}
