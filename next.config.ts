import type { NextConfig } from "next";
import path from "node:path";
import {createRequire} from "node:module";
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: { unoptimized: true },
  turbopack: { root: path.resolve(path.dirname(createRequire(import.meta.url).resolve("next/package.json")), "../..") },
};
export default config;
