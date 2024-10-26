import React from "react";
import { T } from "@/components/T/T";
import { TRANSLATION_KEYS } from "@/components/T/keys";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { i18n } = useTranslation();

  return (
    <>
      <h1>Lang</h1>
      <div>
        <select value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="ru">Russia</option>
        </select>
      </div>
      <br />
      <hr />
      <p>
        {/*// Простой случай*/}
        <T k={TRANSLATION_KEYS.COMMON.AGREEMENT} default="I agree to terms" />
      </p>
      <p>
        {/*// С параметрами*/}
        <T k={TRANSLATION_KEYS.COMMON.WELCOME} default="Welcome, {name}!" params={{ name: "John" }} />
      </p>
      <p>
        {/*// С HTML*/}
        <T k={TRANSLATION_KEYS.COMMON.TERMS} default="Click <a href='/terms'>here</a>" html />
      </p>
      <p>
        {/*// Со сложными компонентами*/}
        <T k={TRANSLATION_KEYS.COMMON.AGREEMENT} default="I agree to the {terms} and {privacy}">
          <a href="/terms" key="terms">
            <T k={TRANSLATION_KEYS.COMMON.TERMS_LINK} default="Terms of Service" />
          </a>
          <a href="/privacy" key="privacy">
            <T k={TRANSLATION_KEYS.COMMON.PRIVACY_LINK} default="Privacy Policy" />
          </a>
        </T>
      </p>
    </>
  );
}
