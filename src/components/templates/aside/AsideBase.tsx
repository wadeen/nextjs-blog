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
  /* background-color: rgba(0, 0, 0, 0.1); //✋ 目印のため後で削除
  height: 800px; //✋ 目印のため後で削除 */
`
