/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ReactNode } from 'react'
const BlogLayoutBody = ({ children }: { children: ReactNode }) => {
  return <div css={main}>{children}</div>
}

export default BlogLayoutBody

const main = css`
  width: calc(100% - 300px);
`
