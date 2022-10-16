import { css } from '@emotion/react'
import { NextPage } from 'next'
import { ReactNode } from 'react'
import { mediaQuery } from '../../utils/Breakpoints'
const BlogLayoutBase: NextPage<{ children: ReactNode }> = ({ children }) => {
  return <div css={main}>{children}</div>
}

export default BlogLayoutBase

// css
const main = css`
  width: calc(100% - 300px);
  ${mediaQuery[2]} {
    width: 100%;
  }
`
