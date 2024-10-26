import React from "react";
import { T } from "@/components/T/T";
import { TRANSLATION_KEYS } from "@/components/T/keys";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { i18n, t } = useTranslation();

  console.log("Current language:", i18n.language);
  console.log("Available resources:", i18n.services.resourceStore.data);

  return (
    <>
      <h1>Lang</h1>
      <div>
        <select value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="ru">Русский</option>
        </select>
      </div>
      <br />
      <hr />
      <p>
        <T k="common:agreement" default="I agree to terms" />
      </p>
      <p>
        <T k="common:welcome" default="Welcome, {{name}}!" params={{ name: "John" }} />
      </p>
      <p>
        <T k="common:terms" default="Click <a href='/terms'>here</a>" html />
      </p>
      <p>
        <T k="common:agreement" default="I agree to the {{terms}} and {{privacy}}">
          <a href="/terms">
            <T k="common:termsLink" default="Terms of Service" />
          </a>
          <a href="/privacy">
            <T k="common:privacyLink" default="Privacy Policy" />
          </a>
        </T>
      </p>

      <div>
        <T k="default:sign_in" default="Sign in" />
      </div>
    </>
  );
}
