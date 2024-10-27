// +Page.tsx
import React from "react";
import metaData from "./content/en/_meta.json";
import { RenderNavigation } from "@/pages/docs/render";
import s from "./Page.module.scss";
import type { MDXComponents } from "mdx/types"; // правильный импорт типов
import Content from "./content/en/index.mdx";
import "@/styles/mdx.scss";
import "@/styles/code.scss";
import { Counter } from "@/pages/index/Counter";

// Определяем компоненты с правильным типом
const components: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1 className="text-3xl font-bold" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-2xl font-bold" {...props}>
      {children}
    </h2>
  ),
  Counter,
};

function Page() {
  return (
    <div className={s.wrap}>
      <div className={s.wrap__left}>
        <RenderNavigation meta={metaData} />
      </div>
      <div className={s.wrap__right}>
        <div className="wrap">
          <div className="wrap__right">
            <div className="mdx-content">
              <Content components={components} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Page };
