import React, { ComponentProps, useEffect, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { usePageContext } from "vike-react/usePageContext";
import { useTypedTranslation } from "@/i18/useTypedTranslation";
import metaData from "./content/en/_meta.json";
import ComponentX from "./content/en/index.mdx";
import s from "./Page.module.scss";
import "@/styles/mdx.scss";
import "@/styles/prism-one-dark.scss";
import "@/styles/copy.scss";
import { CodeBlock } from "@/components/CodeBlock";
import { Language } from "@/components/CopyButton/i18n";
import { RenderNavigation } from "@/pages/docs/render";
import { Counter } from "@/pages/index/Counter";
import { isServer } from "@/utils/server";
import { run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { evaluateMDX1 } from "@/pages/docs/+onBeforeRender";

// Базовые компоненты MDX
const componentsDefault = {
  h1: (props: ComponentProps<"h1">) => <h1 className="text-3xl font-bold" {...props} />,
  h2: (props: ComponentProps<"h2">) => <h2 className="text-2xl font-bold" {...props} />,
  h3: (props: ComponentProps<"h3">) => <h3 className="text-xl font-bold" {...props} />,
  // Специальные компоненты
  Counter,
};

export function Page() {
  console.log("🔥 Page.server.tsx START", "isServer", isServer());
  const { language } = useTypedTranslation();
  const pageContext = usePageContext();
  const {
    pageProps: { compiledSource },
  } = pageContext;

  const [ClientComponent, setClientComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    if (compiledSource && !isServer()) {
      // evaluateMDX1(compiledSource).then((Component) => {
      //   setClientComponent(() => Component as unknown as React.ComponentType);
      // });
      // Создаем компонент из compiledSource на клиенте
      run(compiledSource, {
        ...runtime,
      }).then(({ default: Component }) => {
        setClientComponent(() => Component);
      });
    }
  }, [compiledSource]);

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

  const MDXComponent = isServer() ? pageContext.ServerComponent : ClientComponent;

  if (!MDXComponent) {
    console.log(111, "oopss!", isServer());
    return null; // или прелоадер
  }

  return (
    <>
      <div className={s.wrap}>
        <div className={s.wrap__left}>
          <RenderNavigation meta={metaData} />
        </div>
        <div className={s.wrap__right}>
          <div className="mdx-content">
            <MDXProvider components={components}>
              <MDXComponent />
            </MDXProvider>
          </div>
        </div>
      </div>
    </>
  );
}
