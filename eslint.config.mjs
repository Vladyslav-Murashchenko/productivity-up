import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";
import { strict as strictBoundaries } from "eslint-plugin-boundaries/config";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "postcss.config.*",
    "eslint.config.*",
    "next.config.*",
    "vitest.config.*",
    "vitest.setup.*",
    "public/**",
    // Skill/agent assets are not part of the project source:
    ".agents/**",
    ".claude/**",
  ]),
  {
    ignores: ["**", "!src/**"],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: { boundaries },
    settings: {
      ...strictBoundaries.settings,
      "boundaries/elements": [
        { type: "app", pattern: "src/app" },
        { type: "feature", pattern: "src/features/*" },
        { type: "shared-feature", pattern: "src/shared-features/*" },
        { type: "lib-ui", pattern: "src/libs/ui" },
        { type: "lib-db", pattern: "src/libs/db" },
        { type: "lib-domain", pattern: "src/libs/domain" },
        { type: "lib-animations", pattern: "src/libs/animations" },
      ],
    },
    rules: {
      ...strictBoundaries.rules,
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          checkAllOrigins: true,
          rules: [
            {
              from: { type: "app" },
              allow: { to: { type: ["feature", "lib-ui"] } },
            },
            {
              from: { type: ["feature", "shared-feature"] },
              allow: {
                to: {
                  type: [
                    "shared-feature",
                    "lib-ui",
                    "lib-db",
                    "lib-domain",
                    "lib-animations",
                  ],
                },
              },
            },
            {
              from: { type: "lib-db" },
              allow: { to: { type: "lib-domain" } },
            },
            {
              disallow: {
                to: {
                  type: ["feature", "shared-feature"],
                  internalPath: "!index.ts",
                },
              },
            },
            {
              disallow: {
                to: {
                  type: ["lib-*"],
                  internalPath: "_*",
                },
              },
            },
            { allow: { to: { origin: "external" } } },
            {
              disallow: {
                to: { origin: "external" },
                dependency: {
                  source: [
                    "@heroui/react",
                    "@heroui/styles",
                    "dexie",
                    "dexie-react-hooks",
                    "motion/react",
                  ],
                },
              },
            },
            {
              from: { type: "lib-ui" },
              allow: {
                to: { origin: "external" },
                dependency: { source: ["@heroui/react", "@heroui/styles"] },
              },
            },
            {
              from: { type: "lib-db" },
              allow: {
                to: { origin: "external" },
                dependency: { source: ["dexie", "dexie-react-hooks"] },
              },
            },
            {
              from: { type: "lib-animations" },
              allow: {
                to: { origin: "external" },
                dependency: { source: ["motion/react"] },
              },
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/features/**", "src/shared-features/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["..**"],
              message:
                "Features cannot import from parent directory. To access libs, shared-features use absolute path.",
            },
            {
              group: ["./*/**"],
              message:
                "Features can import only from barrel (index.ts) for nested features, everything except barrel is private",
            },
            {
              group: ["@/features/**"],
              message:
                "Features cannot import from features folder. If u want to import a child feature, use relative path instead.",
            },
          ],
        },
      ],
    },
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "import/no-cycle": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
]);

export default eslintConfig;
