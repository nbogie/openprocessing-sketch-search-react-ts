import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import mantine from "eslint-config-mantine";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    globalIgnores(["dist", "node_modules", ".vite"]),
    //putting this first isn't supposed to be necessary but what a faff without it
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...mantine,
    ...pluginQuery.configs["flat/recommended"],
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
            },
        },
        rules: {
            // Forces your "mistake catcher" to stay ON, even if a preset turns it off.
            "react-hooks/exhaustive-deps": "warn",
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
        },
    },
    // 4. Special Handling for Config Files
    {
        files: ["**/*.{js,cjs,mjs}"],
        ...tseslint.configs.disableTypeChecked,
    },
]);
