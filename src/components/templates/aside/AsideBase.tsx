/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ReactNode } from 'react'

//
const AsideBase = ({ children }: { children: ReactNode }) => {
  return <aside css={aside}>{children}</aside>
}

export default AsideBase

const aside = css`
  width: min(100%, 300px);
`
