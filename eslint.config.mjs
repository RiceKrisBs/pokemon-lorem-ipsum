import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintJs from "@eslint/js";

// Import standard configurations
const tsEslintRecommended = typescriptEslint.configs.recommended;

export default [
  // Apply ESLint's recommended rules as a base
  eslintJs.configs.recommended,
  
  // Apply TypeScript ESLint's recommended rules
  {
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        // Add Mocha globals for test files
        suite: "readonly",
        test: "readonly",
        setup: "readonly",
        teardown: "readonly",
      },
    },
    rules: {
      // Extend from TypeScript ESLint's recommended rules
      ...tsEslintRecommended.rules,
      
      // Add or override specific rules
      "@typescript-eslint/naming-convention": ["warn", {
        selector: "import",
        format: ["camelCase", "PascalCase"],
      }],
      
      // Code quality rules
      "curly": "warn",
      "eqeqeq": "warn",
      "no-throw-literal": "warn",
      
      // Style rules
      "semi": "warn",
      "indent": ["error", 2],
      "no-trailing-spaces": "error",
      "no-multiple-empty-lines": ["error", { "max": 1 }],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
    },
  },
  
  // Special rules for test files
  {
    files: ["**/src/test/**/*.ts"],
    rules: {
      // Relax some rules for test files
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "warn", // Downgrade to warning for tests
      "@typescript-eslint/no-unsafe-function-type": "off",
    },
  },
  
  // Special rules for data files
  {
    files: ["**/src/data/**/*.ts"],
    rules: {
      "array-bracket-newline": ["error", "consistent"],
      "array-element-newline": ["error", "consistent"],
      "@typescript-eslint/no-unused-vars": "off", // Data files often import types just for type checking
    },
  }
];
