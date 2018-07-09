module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    "parser": "babel-eslint",
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-console': ['warn', {allow: ['warn', 'error']}]
    }
};
