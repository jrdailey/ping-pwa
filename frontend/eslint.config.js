import pluginVue from 'eslint-plugin-vue'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsEslintParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'

export default [
  ...pluginVue.configs['flat/recommended'],
  // Use TypeScript parser for .ts/.tsx files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsEslintParser,  
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
    }
  },
  // Use Vue parser for vue files
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,  
      parserOptions: {
        parser: tsEslintParser,  // Parse TypeScript inside .vue files
      },
    },
  },
  // Custom rules that should apply to all files
  {
    files: ['**/*.{js,ts,jsx,tsx,vue}'],
    rules: {
      "semi": ["error", "never"],  // Disable semicolons
      "indent": ["error", 2],      // Enforce 2-space indentation
    },
  },
]
