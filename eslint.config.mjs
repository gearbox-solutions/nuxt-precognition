// @ts-check
import { createConfigForNuxt } from "@nuxt/eslint-config/flat";
import eslintConfigPrettier from "eslint-config-prettier";

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
const nuxtConfig = createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: false,
  },
  dirs: {
    src: ["./playground"],
  },
})

export default [ ...await nuxtConfig, eslintConfigPrettier ];
