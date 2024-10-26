import fetch from "node-fetch";
import fs from "fs/promises";
import path from "path";

const API_KEY = "t-3QIfqCSgEFu7-11RKoww";
const PROJECT_ID = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${API_KEY}`;

interface TranslationKey {
  key: string;
  value: string;
}

async function fetchTranslationKeys(): Promise<TranslationKey[]> {
  const response = await fetch(`https://api.i18nexus.com/project/${PROJECT_ID}/translations/keys`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.json();
}

function convertToUpperSnakeCase(str: string): string {
  return str
    .split(".")
    .map((part) =>
      part
        .replace(/([A-Z])/g, "_$1")
        .toUpperCase()
        .replace(/^_/, ""),
    )
    .join("_");
}

function buildNestedStructure(keys: string[]) {
  const result: any = {};

  keys.forEach((key) => {
    const parts = key.split(".");
    let current = result;

    parts.forEach((part, index) => {
      const upperPart = convertToUpperSnakeCase(part);

      if (index === parts.length - 1) {
        // Последний элемент - сохраняем полный путь как значение
        current[upperPart] = key;
      } else {
        current[upperPart] = current[upperPart] || {};
        current = current[upperPart];
      }
    });
  });

  return result;
}

function generateTypeScriptCode(structure: any, indent = 0): string {
  const spaces = " ".repeat(indent);

  return `{
${Object.entries(structure)
  .map(([key, value]) => {
    if (typeof value === "string") {
      return `${spaces}  ${key}: '${value}'`;
    }
    return `${spaces}  ${key}: ${generateTypeScriptCode(value, indent + 2)}`;
  })
  .join(",\n")}
${spaces}}`;
}

async function generateTranslationKeysFile() {
  try {
    const keys = await fetchTranslationKeys();
    const structure = buildNestedStructure(keys.map((k) => k.key));

    const code = `// This file is auto-generated. Do not edit it manually
// Generated at ${new Date().toISOString()}

export const TRANSLATION_KEYS = ${generateTypeScriptCode(structure)} as const;

// Type for all possible translation keys
export type TranslationKey = typeof TRANSLATION_KEYS extends { [K in keyof typeof TRANSLATION_KEYS]: infer U } ? U : never;
`;

    await fs.writeFile(path.resolve(process.cwd(), "src/constants/translationKeys.ts"), code);

    console.log("Translation keys file generated successfully!");
  } catch (error) {
    console.error("Error generating translation keys:", error);
  }
}

generateTranslationKeysFile();
