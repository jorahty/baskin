import { CssVarsProvider } from '@mui/joy/styles';
import {render, screen, waitFor, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {graphql} from 'msw'
import {setupServer} from 'msw/node'
import 'whatwg-fetch'
import '../matchMedia';

import Signup from '../../../pages/signup'

const handlers = [
  graphql.mutation('addUser', async (req, res, ctx) => {
    const json = await req.json()
    if (json.query.indexOf('john@doe.com') >= 0) {
      return res(
        ctx.data({
          signUp: {
            "name": "John Doe",
            "email": "john@doe.com"
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
  render(
    <CssVarsProvider>
      <Signup />
    </CssVarsProvider>
  );
};

test('Sucess', async () => {
  renderView()
  let alerted = false
  window.alert = () => {
    alerted = true
  }
  const first = screen.getByPlaceholderText('Enter your first name');
  await userEvent.type(first, 'john')
  const last = screen.getByPlaceholderText('Enter your last name');
  await userEvent.type(last, 'does')
  const email = screen.getByPlaceholderText('Enter your email');
  await userEvent.type(email, 'john@doe.com')
  const username = screen.getByPlaceholderText('Enter your username');
  await userEvent.type(username, 'john_doe')
  const passwd = screen.getByPlaceholderText('•••••••');
  await userEvent.type(passwd, 'johndoes')
  fireEvent.click(screen.getByLabelText('signup'))
  await waitFor(() => {
    expect(alerted).toBe(false)
  })
});

test('Fail', async () => {
  renderView()
  let alerted = false
  window.alert = () => {
    alerted = true
  }
  const first = screen.getByPlaceholderText('Enter your first name');
  await userEvent.type(first, 'molly')
  const last = screen.getByPlaceholderText('Enter your last name');
  await userEvent.type(last, 'member')
  const email = screen.getByPlaceholderText('Enter your email');
  await userEvent.type(email, 'mollymember@books.com')
  const username = screen.getByPlaceholderText('Enter your username');
  await userEvent.type(username, 'molly_memb')
  const passwd = screen.getByPlaceholderText('•••••••');
  await userEvent.type(passwd, 'mollymember')
  fireEvent.click(screen.getByLabelText('signup'))
  await waitFor(() => {
    expect(alerted).toBe(true)
  })
});
