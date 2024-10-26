// pages/lang/+Page.tsx
import React from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { T } from "@/components/T/T";
import { usePageContext } from "vike-react/usePageContext";
import { useTranslation } from "react-i18next";

export { Page };

function Page() {
  const pageContext = usePageContext();
  const { i18n, ready } = useTranslation();

  if (!ready) {
    return <div>Loading translations...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <p>Current locale: {pageContext.locale}</p>
        <p>i18n language: {i18n.language}</p>
        <LanguageSwitcher />
      </div>

      <h1 className="text-2xl font-bold mb-4">
        <T k="common:welcome" default="Welcome, {{name}}!" params={{ name: "User" }} />
      </h1>

      <div className="space-y-4">
        <p>
          <T k="common:agreement" default="I agree to terms" />
        </p>

        <p>
          <T k="common:agreement" default="I agree to the {{terms}} and {{privacy}}">
            <a href="/terms" className="text-blue-500 hover:underline">
              <T k="common:termsLink" default="Terms of Service" />
            </a>
            <a href="/privacy" className="text-blue-500 hover:underline">
              <T k="common:privacyLink" default="Privacy Policy" />
            </a>
          </T>
        </p>
      </div>

      <pre className="mt-4 p-4 bg-gray-100 rounded">
        {JSON.stringify(
          {
            currentLocale: pageContext.locale,
            i18nLanguage: i18n.language,
            availableLanguages: i18n.languages,
            resources: i18n.services.resourceStore.data,
          },
          null,
          2,
        )}
      </pre>
    </div>
  );
}
