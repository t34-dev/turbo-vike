// pages/lang/+Page.tsx
import React from "react";
import { T } from "@/components/T/T";
import { useTranslation } from "react-i18next";

export { Page };

function Page(props: { locale?: string }) {
  const { i18n, ready } = useTranslation();
  const locale = props.locale || "—";

  if (!ready) {
    return <div>Loading translations...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <p>Current locale: {locale}</p>
        <p>i18n language: {i18n.language}</p>
      </div>

      <h1 className="text-2xl font-bold mb-4">
        <T k="common:welcome" default="Welcome, {{name}}!" params={{ name: "User" }} />
      </h1>

      <div className="space-y-4">
        <p>
          <T k="common:agreement" default="I agree to terms" />
        </p>
      </div>
    </div>
  );
}
