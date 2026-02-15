import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tseslint.configs.recommendedTypeChecked,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "postcss.config.*",
    "eslint.config.*",
    "public/**",
  ]),
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
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
              group: ["../**"],
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
            {
              group: ["@/app/**"],
              message: "Features cannot import from app.",
            },
            {
              group: ["@/shared-features/*/**"],
              message:
                "Features can only import from root level of shared-features (via index.ts). All nested directories and files are private. Import from '@/shared-features/*' instead.",
            },
            {
              group: ["@heroui/react", "@heroui/styles"],
              message: "Can be used only in src/libs/ui",
            },
            {
              group: ["dexie", "dexie-react-hooks", "@/libs/api/_internal/**"],
              message: "Can be used only in src/libs/api",
            },
            {
              group: ["motion/*", "@/libs/animations/_internal/**"],
              message: "Can be used only in src/libs/animations",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/app/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*/**", "@/shared-features/*/**"],
              message:
                "App can only import features and shared-features via their root index.ts barrel files. Import from '@/features/*' or '@/shared-features/*' instead.",
            },
            {
              group: ["@heroui/react", "@heroui/styles"],
              message: "Can be used only in src/libs/ui",
            },
            {
              group: ["dexie", "dexie-react-hooks", "@/libs/api/_internal/**"],
              message: "Can be used only in src/libs/api",
            },
            {
              group: ["motion", "@/libs/animations/_internal/**"],
              message: "Can be used only in src/libs/animations",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/libs/ui/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/features/**",
                "@/shared-features/**",
                "@/app/**",
                "@/libs/api/**",
                "@/libs/ui/**",
                "@/libs/animations/**",
              ],
              message:
                "This lib cannot import from features, shared-features, and other libs",
            },
            {
              group: ["dexie", "dexie-react-hooks", "@/libs/api/_internal/**"],
              message: "Can be used only in src/libs/api",
            },
            {
              group: ["motion", "@/libs/animations/_internal/**"],
              message: "Can be used only in src/libs/animations",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/libs/api/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/features/**",
                "@/shared-features/**",
                "@/app/**",
                "@/libs/api/**",
                "@/libs/ui/**",
                "@/libs/animations/**",
              ],
              message:
                "This lib cannot import from features, shared-features, and other libs",
            },
            {
              group: ["@heroui/react", "@heroui/styles"],
              message: "Can be used only in src/libs/ui",
            },
            {
              group: ["motion", "@/libs/animations/_internal/**"],
              message: "Can be used only in src/libs/animations",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/libs/animations/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/features/**",
                "@/shared-features/**",
                "@/app/**",
                "@/libs/api/**",
                "@/libs/ui/**",
                "@/libs/animations/**",
              ],
              message:
                "This lib cannot import from features, shared-features, and other libs",
            },
            {
              group: ["@heroui/react", "@heroui/styles"],
              message: "Can be used only in src/libs/ui",
            },
            {
              group: ["dexie", "dexie-react-hooks", "@/libs/api/_internal/**"],
              message: "Can be used only in src/libs/api",
            },
          ],
        },
      ],
    },
  },
  {
    rules: {
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
