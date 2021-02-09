/*
 * @Author: Kilims Ye
 * @Date: 2021-02-09 09:51:00
 * @LastEditTime: 2021-02-09 15:57:43
 * @LastEditors: Kilims Ye
 * @Description:
 * @FilePath: /my-app/.eslintrc.js
 */
module.exports = {
    parser: '@typescript-eslint/parser', // 指定ESLint解析器

    extends: [
        'plugin:react/recommended', // 使用来自 @eslint-plugin-react 的推荐规则
        'plugin:@typescript-eslint/recommended', // 使用来自@typescript-eslint/eslint-plugin的推荐规则
        'prettier/@typescript-eslint', // 使用 ESLint -config-prettier 禁用来自@typescript-eslint/ ESLint 与 prettier 冲突的 ESLint 规则
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018, // 允许解析最新的 ECMAScript 特性
        sourceType: 'module', // 允许使用 import
        ecmaFeatures: {
            jsx: true, // 允许对JSX进行解析
        },
    },
    rules: {
        // 自定义规则
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        // suppress errors for missing 'import React' in files
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
    settings: {
        react: {
            version: 'detect', // 告诉 eslint-plugin-react 自动检测 React 的版本
        },
    },

    overrides: [
        {
            // enable the rule specifically for TypeScript files
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/explicit-module-boundary-types': ['error'],
            },
        },
    ],
};
