import { fixupPluginRules, includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import svelte from 'eslint-plugin-svelte';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
  includeIgnoreFile(gitignorePath),

  js.configs.recommended,

  ...ts.configs.recommended,

  svelte.configs['flat/recommended'],

  prettier,

  ...svelte.configs['flat/prettier'],

  { languageOptions: { globals: { ...globals.browser, ...globals.node }, parserOptions: { parser: ts.parser } } },

  {
    files: ['**/*.svelte'],
  },
  {
    ignores: ['.svelte-kit/', 'project.inlang'],
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
      'unused-imports': eslintPluginUnusedImports,
      import: fixupPluginRules(eslintPluginImport),
    },
  },

  {
    rules: {
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],

      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],

      semi: ['error', 'always'],

      'no-irregular-whitespace': [
        'error',
        {
          skipStrings: true,
          skipRegExps: true,
          skipTemplates: true,
        },
      ],

      quotes: ['error', 'single', 'avoid-escape'],

      'max-len': 'off',

      'max-lines': [
        'error',
        {
          max: 500,
        },
      ],

      'arrow-parens': ['error', 'always'],
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          caughtErrors: 'none',
        },
      ],

      'simple-import-sort/imports': [
        'error',
        {
          // Disable blank lines between import groups.
          groups: [['^\\u0000', '^@?\\w', '^[^.]', '^\\.']],
        },
      ],

      'import/no-named-as-default-member': 'off',
      'unused-imports/no-unused-imports': 'error',
    },
  },
);
