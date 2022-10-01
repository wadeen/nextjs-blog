/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Link from 'next/link'
import { memo } from 'react'
import SearchForm from 'src/components/molecules/aside/SearchForm'
import { mediaQuery } from 'src/utils/Breakpoints'

const CustomErrorPage = memo(() => {
  return (
    <div css={errorPage}>
      <div css={wrapper}>
        <p>404</p>
        <p>Not Found</p>
      </div>
      <h1>お探しのページが見つかりませんでした。</h1>
      <p css={announce}>
        アクセスしようとしたページは削除・変更された可能性があります。
        <br />
        お手数ですが、下記の戻るボタン・検索フォームよりお探しください。
      </p>
      <div css={container}>
        <SearchForm />
        <Link href="/">
          <a css={goBack}>ホームに戻る</a>
        </Link>
      </div>
    </div>
  )
})

export default CustomErrorPage

const errorPage = css`
  h1 {
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-align: center;
    margin-bottom: 30px;
    ${mediaQuery[1]} {
      font-size: 1.6rem;
    }
  }
`

const wrapper = css`
  margin-bottom: 20px;
  p {
    font-size: 7rem;
    font-weight: 900;
    font-family: var(--fontMain);
    text-align: center;
    text-shadow: 2px 2px 0 gray, -1px -1px 0 #fff;
    ${mediaQuery[1]} {
      font-size: 4rem;
      font-weight: 700;
    }
  }
`

const container = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: min(100%, 600px);
  margin: 0 auto;
`

const announce = css`
  text-align: center;
  font-size: 1.6rem;
  letter-spacing: 0.04em;
  line-height: 1.6;
  margin-bottom: 60px;
  ${mediaQuery[1]} {
    font-size: 1.4rem;
    text-align: left;
    margin-bottom: 40px;
    br {
      display: none;
    }
  }
`

const goBack = css`
  display: block;
  text-align: center;
  margin-top: 60px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  font-size: 1.8rem;
  text-decoration: underline;
  ${mediaQuery[1]} {
    font-size: 1.6rem;
  }
  &:hover {
    opacity: 0.8;
  }
`
