import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // JS base rules
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  // Vue specific rules
  ...pluginVue.configs['flat/essential'].map((config) => ({
    ...config,
    files: ['**/*.vue'],
    plugins: { vue: pluginVue },
    rules: {
      ...(config.rules || {}),
      'vue/multi-word-component-names': 'warn',
    },
  })),
  // CSS rules
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },
  // Ignore assets
  {
    ignores: ['src/assets/**/*'],
  },
]);
