import { compileMDX } from "@/pages/docs/mdxCompiler";
import { createHash } from "node:crypto";

const cache = new Map();

export async function compileMDXWithCache(source: string) {
  const key = createHash("md5").update(source).digest("hex");

  if (cache.has(key)) {
    return cache.get(key);
  }

  const result = await compileMDX(source);
  cache.set(key, result);

  return result;
}
