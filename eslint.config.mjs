import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js, "@stylistic": stylistic },
        extends: ["js/recommended"],
        rules: {
            "@stylistic/eol-last": ["warn", "always"],
            "@stylistic/indent": ["warn", 4],
            "no-unused-vars": ["warn"],
        },
    },
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            globals: globals.browser,
        },
    },
    {
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn",
        },
    },
    {
        files: ["**/*.json"],
        plugins: { json },
        language: "json/json",
        extends: ["json/recommended"],
    },
    {
        files: ["**/*.md"],
        plugins: { markdown },
        language: "markdown/gfm",
        extends: ["markdown/recommended"],
    },
    {
        files: ["**/*.css"],
        plugins: { css },
        language: "css/css",
        extends: ["css/recommended"],
    },
    eslintConfigPrettier,
]);
