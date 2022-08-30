/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { NextPage } from 'next'
import AsideTitle from '../../atoms/AsideTitle'
const AsideCategory: NextPage = () => {
  return (
    <div css={container}>
      <AsideTitle text={'Category'} />
    </div>
  )
}

export default AsideCategory

const container = css`
  background-color: tomato;
`
