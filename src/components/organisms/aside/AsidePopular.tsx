/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { NextPage } from 'next'
import AsideTitle from '../../atoms/AsideTitle'
const AsidePopular: NextPage = () => {
  return (
    <div css={container}>
      <AsideTitle text={'Popular'} />
      {/* 人気記事については、v1.1で実装 */}
      <p>現在準備中です</p>
    </div>
  )
}

export default AsidePopular

const container = css`
  /* background-color: #fff; */
  display: block;
  width: 100%;
`
