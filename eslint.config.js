import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // turn on errors for missing imports
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          alphabetize: { caseInsensitive: true, order: 'asc', orderImportKind: 'asc' },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type', 'unknown'],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '*.scss',
              patternOptions: { dot: true, nocomment: true, matchBase: true },
              group: 'builtin',
              position: 'before',
            },
          ],
        },
      ],
      'react/jsx-uses-react': 'error',
      'react/react-in-jsx-scope': 'error',
    },
    settings: {
      react: {
        version: 'detect', // React version. "detect" automatically picks the version you have installed.
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        },
        node: true,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  eslintConfigPrettier,
  // pluginReactHooks.configs.flat.recommended, // TODO: the plugin does not seem to export flat configs (eslint 9) for now. Uncomment this and remove the object below once supported
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: pluginReactHooks.configs.recommended.rules,
  },
];
