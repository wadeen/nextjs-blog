/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ReactNode } from 'react'
import { mq } from 'src/components/Breakpoints'

//
const AsideBase = ({ children }: { children: ReactNode }) => {
  return <aside css={aside}>{children}</aside>
}

export default AsideBase

const aside = css`
  width: min(100%, 300px);
  ${mq[2]} {
    width: min(100%, 600px);
    margin: 60px auto 30px;
  }
`
