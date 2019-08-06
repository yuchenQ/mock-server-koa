module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "no-console": "off",
    "import/no-extraneous-dependencies": [
      2,
      { "devDependencies": [
        "**/*.stories.jsx", 
        "**/*.spec.*", 
        "./webpack.config.babel.js",
        "./jest.setupAfterEnv.js"
      ]}
    ],
  },
};
