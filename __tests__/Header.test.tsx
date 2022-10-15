import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { getPage, initTestHelpers } from 'next-page-tester';

// initTestHelpers()

describe('Header navigation by  Link', () => {
  it('Should route to selected page in Header menu', async () => {
    const { page } = await getPage({
      route: '/index',
    })
    // render(page)

    // userEvent.click(screen.getByTestId('blog-nav'))
    // expect(await screen.findByText('blog page')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('about-nav'))
    expect(await screen.findByText('About me')).toBeInTheDocument()
    // userEvent.click(screen.getByTestId('task-nav'))
    // expect(await screen.findByText('todos page')).toBeInTheDocument()
    // userEvent.click(screen.getByTestId('home-nav'))
    // expect(await screen.findByText('Welcome to Nextjs')).toBeInTheDocument()
  })
})
