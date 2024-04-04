import { Mailing } from '@universal-packages/mailing'
import stripAnsi from 'strip-ansi'

import '../src'

describe('toHaveSentTotal', (): void => {
  it('asserts count being sent', async (): Promise<void> => {
    const mailer = new Mailing({ templatesLocation: './tests/__fixtures__' })

    await mailer.prepare()
    await mailer.send({ subject: 'Welcome', template: 'welcome-email', locals: { local: '123' } })

    expect(Mailing).toHaveSentTotal(1)
    expect(Mailing).not.toHaveSentTotal(0)
  })

  it('fails and shows if count where not sent', async (): Promise<void> => {
    const mailer = new Mailing({ templatesLocation: './tests/__fixtures__' })

    await mailer.prepare()

    let error: Error

    try {
      expect(Mailing).toHaveSentTotal(2)
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toEqual('expected Mailing to have sent a total of 2 emails, but no emails were sent at all.')
  })

  it('fails if optiosn were not sent and tells the actual count', async (): Promise<void> => {
    const mailer = new Mailing({ templatesLocation: './tests/__fixtures__' })

    await mailer.prepare()
    await mailer.send({ subject: 'Welcome', template: 'welcome-email', locals: { local: '123' } })
    await mailer.send({ subject: 'Welcome', template: 'welcome-email', locals: { local: '123' } })

    let error: Error

    try {
      expect(Mailing).toHaveSentTotal(3)
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toEqual('expected Mailing to have sent a total of 3 emails, but it sent a total of 2 emails.')
  })

  it('fails and shows the if the count was exapected not ot', async (): Promise<void> => {
    const mailer = new Mailing({ templatesLocation: './tests/__fixtures__' })

    await mailer.prepare()
    await mailer.send({ subject: 'Welcome', template: 'welcome-email', locals: { local: '123' } })

    let error: Error
    try {
      expect(Mailing).not.toHaveSentTotal(1)
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toEqual('expected Mailing to not have sent a total of 1 emails, but it did.')
  })
})
