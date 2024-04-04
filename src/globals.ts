import { SendOptions } from '@universal-packages/mailing'

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveSentOneWithOptions(sendOptions: SendOptions): R
      toHaveSentTotal(count: number): R
    }
  }
}

export {}
