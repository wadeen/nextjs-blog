import { render, screen } from '@testing-library/react'
import CustomErrorPage from '../src/pages/404'

// describe('ヘッダーのリンク先確認', () => {
//   it('ヘッダーのリンク名の確認', () => {
//     render(<Header />)
//     // data-testidを利用してテスト対象を抽出する方法
//     expect(screen.getByTestId('about-nav')).toBeInTheDocument()
//     expect(screen.getByTestId('about-nav')).toHaveTextContent('About me')

//     // テキストを利用してテスト対象を抽出する方法
//     expect(screen.getByText('About me')).toBeTruthy()
//   })
// })

describe('テスト', () => {
  test('成功が出るか確認のテスト', async () => {
    render(<CustomErrorPage />)
    const listitem = await screen.findByText('404')
    expect(listitem).toBeInTheDocument()
  })
})
