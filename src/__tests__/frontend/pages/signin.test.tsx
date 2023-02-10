import {render, screen, waitFor, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {graphql} from 'msw'
import {setupServer} from 'msw/node'
import 'whatwg-fetch'

import Signin from '../../../pages/signin'

const handlers = [
  graphql.query('login', async (req, res, ctx) => {
    const json = await req.json()
    if (json.query.indexOf('molly@books.com') >= 0) {
      return res(
        ctx.data({
          login: {
            "name": "Molly Member",
            "accessToken": "whatever"
          }
        }),
      )
    } else {
      return res(
        ctx.errors ([ {
          "message": "Unexpected error."
        }]),
      )
    }
  })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

jest.mock('next/router', ()=> ({push: jest.fn()}))

const renderView = () => {
  render(<Signin />)
};

test('Sucess', async () => {
  renderView()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.alert = () => { }
  const email = screen.getByPlaceholderText('Email address');
  await userEvent.type(email, 'molly@books.com')
  const passwd = screen.getByPlaceholderText('•••••••');
  await userEvent.type(passwd, 'mollymember')
  fireEvent.click(screen.getByText('Sign In'))
  await waitFor(() => {
    expect(localStorage.getItem('user')).not.toBe(null)
  });
});

test('Fail', async () => {
  renderView()
  let alerted = false
  window.alert = () => {
    alerted = true
  }
  fireEvent.click(screen.getByText('Sign In'))
  await waitFor(() => {
    expect(alerted).toBe(true)
  })
  expect(localStorage.getItem('user')).toBe(null)
});
