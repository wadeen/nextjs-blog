import { css } from '@emotion/react'
import { NextPage } from 'next'
import { ReactNode } from 'react'
import { mediaQuery } from 'src/utils/Breakpoints'

const AsideBase: NextPage<{ children: ReactNode }> = ({ children }) => {
  return <aside css={aside}>{children}</aside>
}

export default AsideBase

// css
const aside = css`
  width: min(100%, 300px);
  ${mediaQuery[2]} {
    width: min(100%, 600px);
    margin: 60px auto 30px;
  }
`
