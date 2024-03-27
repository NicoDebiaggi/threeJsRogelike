const OFF = 0
const WARNING = 1
const ERROR = 2

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended'
  ],
  plugins: ['simple-import-sort', '@typescript-eslint', 'react', 'prettier', 'jest'],
  env: {
    browser: true,
    es6: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        paths: ['./src']
      }
    }
  },
  include: ['src/**/*'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, endOfLine: 'auto', jsxSingleQuote: true }],
    'import/no-extraneous-dependencies': OFF,
    'eol-last': ['error', 'always'],
    'no-unused-vars': OFF,
    'no-empty-function': OFF,
    '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'all' }],
    'no-unused-expressions': [
      ERROR,
      {
        allowShortCircuit: true
      }
    ],
    'no-console': WARNING,
    'no-debugger': OFF,
    'react/jsx-filename-extension': [WARNING, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-nested-ternary': ERROR,
    'no-shadow': [ERROR, { builtinGlobals: false, hoist: 'functions', allow: [] }],
    'max-classes-per-file': OFF,
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': WARNING,
    'react/button-has-type': OFF,
    'react/prefer-stateless-function': OFF,
    'react/jsx-pascal-case': ERROR,
    'react/require-default-props': OFF,
    'react/react-in-jsx-scope': OFF,
    'react/no-unknown-property': OFF,
    'simple-import-sort/imports': ERROR,
    'simple-import-sort/exports': ERROR,
    'no-use-before-define': OFF,
    'import/no-unresolved': OFF,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ]
  }
}
