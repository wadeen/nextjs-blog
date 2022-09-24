/** @jsxImportSource @emotion/react */
// @ts-nocheck
import { css } from '@emotion/react'
import { NextPage } from 'next'
import fetch from 'node-fetch'
import AsideTitle from '../../atoms/aside/AsideTitle'

//コンテンツID一覧を抽出
const rankedPaths = response.data.reports[0].data.rows.map(
  (row) => row.dimensions[0]
)
const maybeContentIds = rankedPaths
  .map((path) => path.split('/')[1])
  .filter((v) => v)

//microCMSへのPATCH
const result = await fetch(
  `https://${process.env.NEXT_PUBLIC_MICROCMS_ACCESS_KEY}.microcms.io/api/v1/popular-bs`,
  {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
    },
    body: JSON.stringify({ articles: maybeContentIds }),
  }
)
console.log(await result.json())

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

// css
const container = css`
  display: block;
  width: 100%;
`
