/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import { ReactNode } from 'react'
import { mq } from 'src/components/Breakpoints'

const AsideBase: NextPage<{ children: ReactNode }> = ({ children }) => {
  return <aside css={aside}>{children}</aside>
}

export default AsideBase

// css
const aside = css`
  width: min(100%, 300px);
  ${mq[2]} {
    width: min(100%, 600px);
    margin: 60px auto 30px;
  }
`
