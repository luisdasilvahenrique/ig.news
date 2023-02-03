![Capa](https://user-images.githubusercontent.com/61327251/179782127-4421fae5-b6c8-4f43-b3eb-ed9f1cd8394e.svg)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```


# Testes unitários no React (Jest)

Aqui vamos entender como criar testes automatizados de unidade dentro do React garantindo que nossos componentes e páginas continuem funcionando independente de novas manutenções.


## Install library

#### Commands for the installing

```code
  yarn add jest jest-dom @testing-library/jest-dom @testing-library/dom testing-library/react babel-jest -D
```



## Config (jest.config.js)

```jest
module.exports = {
    testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    setupFilesAfterEnv: [
        "<rootDir>/tests/setupTests.ts"
    ],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$":"<rootDir>/node_modules/babel-jest"
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.(scss|css|sass)$": "identity-obj-proxy"
    }
};
```
### For Using (scss | css | sass)

```jest
yarn add identity-obj-proxy -D
```
### Mock for different functions  
```jest
yarn add jest-mock -D
```


## Features of the tests
- [x] Teste do ActiveLink
- [x] Teste do Header
- [x] Teste do SignInButton
- [x] Teste do SubscribeButton
- [x] Teste do Home/Page
- [x] Teste do getStaticProps
- [x] Teste da página de posts
- [x] Teste da página do post
- [x] Teste da página de preview

