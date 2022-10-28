import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import Page404 from '../src/pages/404'

describe('404ページ', () => {
  render(
    <RecoilRoot>
      <Page404 />
    </RecoilRoot>
  )

  it('404ページに遷移しているか', () => {
    expect(screen.getByTestId('text-404').textContent).toBe(
      'お探しのページが見つかりませんでした。'
    )
  })

  // it('記事を押すと詳細ページに遷移する', () => {
  //   const articleList = screen.queryByRole('li')
  //   expect(articleList).toBeTruthy()
  // })

  // it('ホームに戻るを押すとTopページに遷移する', () => {
  //   userEvent.click(screen.getByTestId('gohome'))
  //   expect(screen.queryByText('')).toBeInTheDocument()
  // })
})
