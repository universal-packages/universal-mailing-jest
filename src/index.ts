import { expect } from '@jest/globals'
import { Mailing, SendOptions, TestEngine } from '@universal-packages/mailing'

import './globals'

beforeEach(() => {
  TestEngine.reset()
})

function toHaveSentOneWithOptions(_mailing: Mailing, sendOptions: SendOptions): jest.CustomMatcherResult {
  const sendOptionsKeys = Object.keys(sendOptions)
  const sentOptions = TestEngine.sendHistory.map((inHistorySendOptions) => {
    return Object.keys(inHistorySendOptions).reduce((acc, key) => {
      if (sendOptionsKeys.includes(key)) {
        acc[key] = inHistorySendOptions[key]
      }

      return acc
    }, {})
  })

  const pass = sentOptions.some((sentOptions: SendOptions) => {
    return this.equals(sendOptions, sentOptions)
  })

  if (pass) {
    return {
      message: () => `expected Mailing to not have sent the email with the given options, but it did.`,
      pass
    }
  } else {
    return {
      message: () => {
        if (sentOptions.length === 0) {
          return `expected Mailing to have sent the email with the given options, but no emails were sent at all.`
        } else {
          return `expected Mailing to have sent the email with the given options, but it did not\n\nOptions sent were:\n${sentOptions
            .map((sentOptions: SendOptions) => this.utils.diff(sendOptions, sentOptions))
            .join('\n')}`
        }
      },
      pass
    }
  }
}

function toHaveSentTotal(_mailing: Mailing, count: number): jest.CustomMatcherResult {
  const pass = TestEngine.sendHistory.length === count

  if (pass) {
    return {
      message: () => `expected Mailing to not have sent a total of ${count} emails, but it did.`,
      pass
    }
  } else {
    return {
      message: () => {
        if (TestEngine.sendHistory.length === 0) {
          return `expected Mailing to have sent a total of ${count} emails, but no emails were sent at all.`
        } else {
          return `expected Mailing to have sent a total of ${count} emails, but it sent a total of ${TestEngine.sendHistory.length} emails.`
        }
      },
      pass
    }
  }
}

expect.extend({
  toHaveSentOneWithOptions,
  toHaveSentTotal
})
