/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
// import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { client } from '../../../../libs/client'
import { MicrocmsData } from '../../../../types/microcmsData'
import AsideTitle from 'src/components/atoms/aside/AsideTitle'

const categoriesFetch = async () => {
  const category = await client.get({
    endpoint: 'categories',
  })
  return category
}

// ページ件数 (v 1.2~)
// const categoriesNumber = async () => {
//   const categoryNum = await client.get({
//     endpoint: 'posts',
//     queries: {
//       filters: `category[equals]${category}`,
//     },
//   })
//   return categoryNum
// }

const AsideCategory = () => {
  const { data, error } = useSWR('category', categoriesFetch)
  if(error) console.log(error.message)

  // カテゴリの取得結果の判定
  return data ? (
    <>
      <AsideTitle text={'Category'} />
      <ul css={categoryList}>
        {data.contents.map((category: MicrocmsData) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`}>
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  ) : ""
}

export default AsideCategory

// css
const categoryList = css`
  li {
    font-size: 1.6rem;
    line-height: 2;
    letter-spacing: 0.04em;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid var(--cSub);
    border-left: 6px solid var(--cSub);
    &:hover {
      border-color: var(--cMain);
    }
    a {
      display: block;
      width: 100%;
      height: 100%;
      padding-left: 15px;
    }
    &:not(:last-of-type) {
      margin-bottom: 10px;
    }
  }
`

const loadingIcon = css`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`
