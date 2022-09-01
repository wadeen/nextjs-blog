/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ReactNode } from 'react'
const BlogLayoutBase = ({ children }: { children: ReactNode }) => {
  return <div css={main}>{children}</div>
}

export default BlogLayoutBase

const main = css`
  width: calc(100% - 300px);
`