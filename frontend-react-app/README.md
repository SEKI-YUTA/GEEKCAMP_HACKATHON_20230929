# ディレクトリ説明

`/src`直下にソースコードを保存します

- `application` --> 共通で使う関数・コンポーネント
  - `@types` --> 共通で使う型情報のファイルを記述
  - `AppProviders` --> プロバイダー、ここにReact Router Domも入れている
  - `lib` --> 共通で使う関数を記述
  - `UI` --> ヘッダーなど各画面などで共通で使用するコンポーネントを記述
- `features` --> 機能毎の画面のコンポーネントを配置
  - `{機能名}/UI` --> ここにUIのコンポーネントを記述
    - `Components` --> 画面単体で使うコンポーネントを記述
    - `Container` --> コンポーネントのロジック部分を記述
    - `Presentational` --> コンポーネントのUI部分を記述

`Container / Presentational` のコンポーネントをロジックとUIで分離するアーキテクチャを採用しています。

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
