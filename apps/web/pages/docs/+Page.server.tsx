import React, { ComponentProps, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { usePageContext } from "vike-react/usePageContext";
import { useTypedTranslation } from "@/i18/useTypedTranslation";
import metaData from "./content/en/_meta.json";
import s from "./Page.module.scss";
import "@/styles/mdx.scss";
import "@/styles/prism-one-dark.scss";
import "@/styles/copy.scss";
import { CodeBlock } from "@/components/CodeBlock";
import { Language } from "@/components/CopyButton/i18n";
import { RenderNavigation } from "@/pages/docs/render";
import { Counter } from "@/pages/index/Counter";

// Базовые компоненты MDX
const componentsDefault = {
  h1: (props: ComponentProps<"h1">) => <h1 className="text-3xl font-bold" {...props} />,
  h2: (props: ComponentProps<"h2">) => <h2 className="text-2xl font-bold" {...props} />,
  h3: (props: ComponentProps<"h3">) => <h3 className="text-xl font-bold" {...props} />,
  // Специальные компоненты
  Counter,
};

export function Page() {
  console.log("🔥 Page.server.tsx START");
  const { language } = useTypedTranslation();
  const { ServerComponent } = usePageContext();
  console.log("🔥 Page.server.tsx ServerComponent exists:", !!ServerComponent);

  // Расширенные компоненты с CodeBlock
  const components = {
    ...componentsDefault,
    // Обработка блоков кода с поддержкой всех фич
    pre: ({ children, ...props }: ComponentProps<"pre">) => (
      <CodeBlock {...props} language={language as unknown as Language}>
        {children}
      </CodeBlock>
    ),
  };

  console.log("onRenderClient 777777777777777777", !!ServerComponent);

  return (
    <>
      <div className={s.wrap}>
        <div className={s.wrap__left}>
          <RenderNavigation meta={metaData} />
        </div>
        <div className={s.wrap__right}>
          <div className="mdx-content">
            <MDXProvider components={components}>
              <ServerComponent />
            </MDXProvider>
          </div>
        </div>
      </div>
    </>
  );
}
