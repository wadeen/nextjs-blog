/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { NextPage } from 'next'
import AsideTitle from '../../atoms/AsideTitle'
const AsidePopular: NextPage = () => {
  return (
    <div css={container}>
      <AsideTitle text={'Popular'} />
    </div>
  )
}

export default AsidePopular

const container = css`
  background-color: #fff;
`
