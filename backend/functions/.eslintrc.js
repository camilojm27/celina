module.exports = {
  "root": true,
  "env": {
    es6: true,
    node: true,
  },
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    quotes: ["error", "double"],
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2020,
  },
};
