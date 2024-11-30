module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/no-var-requires': 2,
    '@typescript-eslint/no-namespace': 2,
    '@typescript-eslint/no-empty-interface': 2,
    '@typescript-eslint/no-empty-function': 2,
    '@typescript-eslint/no-inferrable-types': 1,
    '@typescript-eslint/no-non-null-assertion': 2,
    '@typescript-eslint/no-this-alias': 2,
    '@typescript-eslint/no-unnecessary-type-assertion': 1,
    
  },
};
