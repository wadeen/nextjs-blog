/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import NextPage from 'next'
import { ReactNode } from 'react'

const BlogLayout = ({ children }: { children: ReactNode }) => {
  return <div css={article}>{children}</div>
}

export default BlogLayout

const article = css`
  display: flex;
  column-gap: 40px;
`
