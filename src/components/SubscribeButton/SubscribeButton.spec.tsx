import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'jest-mock'
import { signIn, useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
// import { useRouter } from 'next/router';
import { SubscribeButton } from '.';

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    });
  },
}));

jest.mock('next-auth/react');
// jest.mock('next/router');

describe('SubscribeButton component', () => {

  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false] as any)

    render(
      <SubscribeButton />
    )

    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  it('redirect user to signIn when not authenticated', () => {
    const signInMocked = mocked(signIn)
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false] as any)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('redirects to posts when user already subscription', () => {
    const useRouter = jest.spyOn(require("next/router"), "useRouter");
    const useSessionMocked = mocked(useSession)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce(
      {
        data: {
          user: {
            name: 'John Doe',
            email: 'john.doe@exemple.com'
          },
          activeSubscription: 'fake-active-subscription',
          expires: 'fake-expires'
        }
      } as any
    )

    useRouter.mockReturnValueOnce({
      push: pushMock,
    } as any)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalled()
  })
})