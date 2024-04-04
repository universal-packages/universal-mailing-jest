import { expect } from '@jest/globals'
import { Mailing, SendOptions, TestEngine } from '@universal-packages/mailing'

import './globals'

TestEngine.setMock(jest.fn())

beforeEach(() => {
  TestEngine.mock.mockClear()
})

function toHaveSentOneWithOptions(_mailing: Mailing, sendOptions: SendOptions): jest.CustomMatcherResult {
  const sendOptionsKeys = Object.keys(sendOptions)
  const sentOptions = TestEngine.mock.mock.calls.map((call: any[]) => {
    const callSendOptions = call[0]

    return Object.keys(callSendOptions).reduce((acc, key) => {
      if (sendOptionsKeys.includes(key)) {
        acc[key] = callSendOptions[key]
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
            .map((sentOptions: SendOptions) => this.utils.diff(sentOptions, sendOptions))
            .join('\n')}`
        }
      },
      pass
    }
  }
}

function toHaveSentTotal(_mailing: Mailing, count: number): jest.CustomMatcherResult {
  const pass = TestEngine.mock.mock.calls.length === count

  if (pass) {
    return {
      message: () => `expected Mailing to not have sent a total of ${count} emails, but it did.`,
      pass
    }
  } else {
    return {
      message: () => {
        if (TestEngine.mock.mock.calls.length === 0) {
          return `expected Mailing to have sent a total of ${count} emails, but no emails were sent at all.`
        } else {
          return `expected Mailing to have sent a total of ${count} emails, but it sent a total of ${TestEngine.mock.mock.calls.length} emails.`
        }
      },
      pass
    }
  }
}

// function toHaveBeenSent(template: string): jest.CustomMatcherResult {
//   const calls = TestEngine.mock.mock.calls

//   const pass = calls.some((call: any[]) => {
//     const [sendOptions] = call

//     return sendOptions.template.includes(template)
//   })

//   if (pass) {
//     return {
//       message: () => `expected ${this.utils.printReceived(template)} not to have been sent`,
//       pass
//     }
//   } else {
//     return {
//       message: () => {
//         if (calls.length === 0) {
//           return `expected ${this.utils.printReceived(template)} to have been sent but no emails were sent`
//         } else {
//           return `expected ${this.utils.printReceived(template)} to have been sent but it was not\n\Templates sent were: ${calls
//             .map((call: any[]) => this.utils.printExpected(call[0].template))
//             .join(', ')}`
//         }
//       },
//       pass
//     }
//   }
// }

// function toHaveSentTemplateWith(template: string): jest.CustomMatcherResult {
//   const calls = TestEngine.mock.mock.calls

//   const pass = calls.some((call: any[]) => {
//     const [sendOptions] = call

//     return sendOptions.template.includes(template)
//   })

//   if (pass) {
//     return {
//       message: () => `expected ${this.utils.printReceived(template)} not to have been sent`,
//       pass
//     }
//   } else {
//     return {
//       message: () => {
//         if (calls.length === 0) {
//           return `expected ${this.utils.printReceived(template)} to have been sent but no emails were sent`
//         } else {
//           return `expected ${this.utils.printReceived(template)} to have been sent but it was not\n\Templates sent were: ${calls
//             .map((call: any[]) => this.utils.printExpected(call[0].template))
//             .join(', ')}`
//         }
//       },
//       pass
//     }
//   }
// }

// function toHaveSentTemplateWithLocals(template: string, locals: Record<string, any>): jest.CustomMatcherResult {
//   const calls = TestQueue.mock.mock.calls
//   const jobCalls = calls.filter((call: any[]) => call[0] === job['name'])

//   const pass = jobCalls.some((call: any[]) => {
//     const [_jobName, _queue, jobPayload] = call

//     return this.equals(jobPayload, payload)
//   })

//   if (pass) {
//     return {
//       message: () => `expected ${this.utils.printReceived(job['name'])} not to have been enqueued with the given payload, bit it was`,
//       pass
//     }
//   } else {
//     return {
//       message: () => {
//         if (jobCalls.length === 0) {
//           return `expected ${this.utils.printReceived(job['name'])} to have been enqueued, but it was not enqueued at all`
//         } else {
//           const jobCallsToPrint = jobCalls
//             .map((call: any[]) => {
//               const [_jobName, _queue, jobPayload] = call

//               return this.utils.diff(payload, jobPayload)
//             })
//             .join('\n\n')

//           return `expected ${this.utils.printReceived(job['name'])} to have been enqueued with the given payload but it was not\n\nEnqueue payloads were:\n${jobCallsToPrint}`
//         }
//       },
//       pass
//     }
//   }
// }

expect.extend({
  toHaveSentOneWithOptions,
  toHaveSentTotal
})
