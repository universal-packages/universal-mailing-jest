# Mailing Jest

[![npm version](https://badge.fury.io/js/@universal-packages%2Fmailing-jest.svg)](https://www.npmjs.com/package/@universal-packages/mailing-jest)
[![Testing](https://github.com/universal-packages/universal-mailing-jest/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-mailing-jest/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-mailing-jest/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-mailing-jest)

Jest matchers for [Mailing](https://github.com/universal-packages/universal-mailing) testing.

## Install

```shell
npm install @universal-packages/mailing-jest

npm install @universal-packages/mailing
```

## Setup

Add the following to your `jest.config.js` or where you configure Jest:

```js
module.exports = {
  setupFilesAfterEnv: ['@universal-packages/mailing-jest']
}
```

## Matchers

### toHaveSentTotal

```js
import { Mailing } from '@universal-packages/mailing'

it('should send a given number of emails', async () => {
  const mailer = new Mailing({ templatesLocation: './tests/__fixtures__' })

  await mailer.prepare()
  await mailer.send({ subject: 'Welcome', template: 'welcome-email', locals: { local: '123' } })

  expect(Mailing).toHaveSentTotal(1)
})
```

### toHaveSentOneWithOptions

```js
import { Mailing } from '@universal-packages/mailing'

it('should send an email using the given options', async () => {
  const mailer = new Mailing({ templatesLocation: './tests/__fixtures__' })

  await mailer.prepare()
  await mailer.send({ subject: 'Welcome', template: 'welcome-email', locals: { local: '123' } })

  expect(Mailing).toHaveSentOneWithOptions({
    subject: 'Welcome',
    template: 'tests/__fixtures__/welcome-email',
    locals: { local: '123' }
  })
})
```

## Typescript

In order for typescript to see the global types you need to reference the types somewhere in your project, normally `./src/globals.d.ts`.

```ts
/// <reference types="@universal-packages/mailing-jest" />
```

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
