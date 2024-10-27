import React, { ComponentProps } from "react";
import metaData from "./content/en/_meta.json";
import { RenderNavigation } from "@/pages/docs/render";
import s from "./Page.module.scss";
import type { MDXComponents } from "mdx/types"; // правильный импорт типов
import "@/styles/mdx.scss";
import "@/styles/prism-one-dark.scss";
import "@/styles/copy.scss";
import { Counter } from "@/pages/index/Counter";
import { useTypedTranslation } from "@/i18/useTypedTranslation";
import { CodeBlock } from "@/components/CodeBlock";
import { Language } from "@/components/CopyButton/i18n";
import { usePageContext } from "vike-react/usePageContext";

// Определяем компоненты с правильным типом
const componentsDefault: MDXComponents = {
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
  const {
    pageProps: { content: Content },
  } = usePageContext();
  const { language } = useTypedTranslation();

  const components: MDXComponents = {
    ...componentsDefault,
    pre: ({ children, ...props }: ComponentProps<"pre">) => (
      <CodeBlock {...props} language={language as unknown as Language}>
        {children}
      </CodeBlock>
    ),
  };

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
