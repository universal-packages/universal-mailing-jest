import { Mailing } from '@universal-packages/mailing'
import stripAnsi from 'strip-ansi'

import '../src'

describe('toHaveSentOneWithOptions', (): void => {
  it('asserts options being sent', async (): Promise<void> => {
    const mailer = new Mailing({ templatesLocation: './tests/__fixtures__' })

    await mailer.prepare()
    await mailer.send({ subject: 'Welcome', template: 'welcome-email', locals: { local: '123' } })

    expect(Mailing).toHaveSentOneWithOptions({
      subject: 'Welcome',
      template: 'tests/__fixtures__/welcome-email',
      locals: { local: '123' }
    })

    expect(Mailing).not.toHaveSentOneWithOptions({
      subject: 'Other',
      template: 'tests/__fixtures__/other-email',
      locals: { local: '123' }
    })
  })

  it('fails and shows if options where not sent', async (): Promise<void> => {
    const mailer = new Mailing({ templatesLocation: './tests/__fixtures__' })

    await mailer.prepare()

    let error: Error

    try {
      expect(Mailing).toHaveSentOneWithOptions({
        subject: 'Welcome',
        template: 'tests/__fixtures__/welcome-email',
        locals: { local: '123' }
      })
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toEqual('expected Mailing to have sent the email with the given options, but no emails were sent at all.')
  })

  it('fails if options where not sent and tells which ones where', async (): Promise<void> => {
    const mailer = new Mailing({ templatesLocation: './tests/__fixtures__' })

    await mailer.prepare()
    await mailer.send({ subject: 'Welcome', template: 'welcome-email', locals: { local: '123' } })
    await mailer.send({ subject: 'Welcome', template: 'welcome-email', locals: { local: '123' } })

    let error: Error

    try {
      expect(Mailing).toHaveSentOneWithOptions({
        subject: 'Other',
        template: 'tests/__fixtures__/other-email',
        locals: { local: '123' }
      })
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toEqual(`expected Mailing to have sent the email with the given options, but it did not

Options sent were:
- Expected
+ Received

  Object {
    "locals": Object {
      "local": "123",
    },
-   "subject": "Welcome",
-   "template": "tests/__fixtures__/welcome-email",
+   "subject": "Other",
+   "template": "tests/__fixtures__/other-email",
  }
- Expected
+ Received

  Object {
    "locals": Object {
      "local": "123",
    },
-   "subject": "Welcome",
-   "template": "tests/__fixtures__/welcome-email",
+   "subject": "Other",
+   "template": "tests/__fixtures__/other-email",
  }`)
  })

  it('fails and shows the if options were sent and was not expected', async (): Promise<void> => {
    const mailer = new Mailing({ templatesLocation: './tests/__fixtures__' })

    await mailer.prepare()
    await mailer.send({ subject: 'Welcome', template: 'welcome-email', locals: { local: '123' } })

    let error: Error
    try {
      expect(Mailing).not.toHaveSentOneWithOptions({
        subject: 'Welcome',
        template: 'tests/__fixtures__/welcome-email',
        locals: { local: '123' }
      })
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toEqual('expected Mailing to not have sent the email with the given options, but it did.')
  })
})
