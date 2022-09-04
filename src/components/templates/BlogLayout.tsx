/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import NextPage from 'next'
import { ReactNode } from 'react'
import { mq } from '../Breakpoints'

const BlogLayout = ({ children }: { children: ReactNode }) => {
  return <div css={article}>{children}</div>
}

export default BlogLayout

const article = css`
  display: flex;
  gap: 0 40px;
  ${mq[2]} {
    display: block;
    width: 100%;
    gap: 60px 0;
  }
`
