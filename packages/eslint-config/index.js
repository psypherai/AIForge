/**
 * ESLint flat config — fallback for cases Biome doesn't cover.
 * Primary lint/format is handled by Biome. This is for Next.js specific rules.
 */
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const prettierConfig = require('eslint-config-prettier');

module.exports = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      '.expo/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.turbo/**',
    ],
  },
);
