module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // Enables Node.js global variables like `module`
    "react-native/react-native": true, // React Native environment
  },
  extends: [
    "eslint:recommended", // Base ESLint recommended rules
    "plugin:react/recommended", // React specific linting rules
    "plugin:react-native/all", // React Native specific linting rules
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
    ecmaVersion: 12, // Support ES2021 syntax
    sourceType: "module", // Use ES modules
  },
  plugins: ["react", "react-native"],
  settings: {
    react: {
      version: "detect", // Automatically detects the React version
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off", // Disable for React 17+
    "no-undef": "error", // Ensure variables are properly defined
  },
};
