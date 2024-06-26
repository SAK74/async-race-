// @ts-check
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': ['error', { namedComponents: 'function-expression' }],
    'import/no-cycle': 'off',
    'import/extensions': 'off',
    'func-names': ['warn', 'as-needed'],
    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
  },
});
