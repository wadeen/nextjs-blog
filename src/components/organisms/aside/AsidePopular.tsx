/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { NextPage } from 'next'
import AsideTitle from '../../atoms/aside/AsideTitle'
const AsidePopular: NextPage = () => {
  return (
    <div css={container}>
      <AsideTitle text={'Popular'} />
      {/* 人気記事については、v1.2~で実装予定 */}
      <p>現在準備中です</p>
    </div>
  )
}

export default AsidePopular

 // css
const container = css`
  display: block;
  width: 100%;
`
