import React, { ComponentProps, useEffect, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { usePageContext } from "vike-react/usePageContext";
import { useTypedTranslation } from "@/i18/useTypedTranslation";
import metaData from "./content/en/_meta.json";
import Component from "./content/en/index.mdx";
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
  console.log("🌐 Page.tsx START", 999999999999999999999999999);
  const { language } = useTypedTranslation();
  const {
    pageProps: { compiledSource }, // Получаем из pageProps!
    from,
  } = usePageContext();
  // const [ClientComponent, setClientComponent] = useState<typeof ClientComponent>(null);
  const [MDXComponent, setMDXComponent] = useState<any>(null);

  useEffect(() => {
    if (compiledSource) {
      setMDXComponent(() => Component);
      // evaluateMDX1(compiledSource).then(() => {
      //   setClientComponent(() => Component);
      // });
    }
  }, [compiledSource]);

  const components = {
    ...componentsDefault,
    pre: ({ children, ...props }: ComponentProps<"pre">) => (
      <CodeBlock {...props} language={language as Language}>
        {children}
      </CodeBlock>
    ),
  };

  // if (!ClientComponent) return null;

  return (
    <div className={s.wrap}>
      <div className={s.wrap__left}>
        <RenderNavigation meta={metaData} />
      </div>
      <div className={s.wrap__right}>
        <div className="mdx-content">
          <MDXProvider components={components}>
            <Component />
          </MDXProvider>
        </div>
      </div>
    </div>
  );
}
