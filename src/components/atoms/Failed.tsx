/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { NextPage } from 'next'
import Link from 'next/link'

const Failed: NextPage<{ text: string }> = ({ text }) => {
  return (
    <div css={failed}>
      {text}
      <p>
        <Link href="/">
          <a>記事一覧ページへ戻る</a>
        </Link>
      </p>
    </div>
  )
}

export default Failed

const failed = css`
  p {
    margin-top: 40px;
    a {
      color: var(--cLink);
      text-decoration: underline;
      transition: opacity 0.3s ease;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`
