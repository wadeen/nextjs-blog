/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const AsideBasic = () => {
  return <aside css={aside}>
    サイドバーです
  </aside>
}

export default AsideBasic

const aside = css`
  width: min(100%, 300px);
  background-color: rgba(0, 0, 0, 0.1);//✋ 目印のため後で削除
  height: 800px; //✋ 目印のため後で削除
`
