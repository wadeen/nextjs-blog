/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
// import axios from 'axios'
import Link from 'next/link'
import useSWR from 'swr'
import { client } from '../../../../libs/client'
import { MicrocmsData } from '../../../../types/microcmsData'
import AsideTitle from 'src/components/atoms/aside/AsideTitle'

const AsideCategory = () => {
  // カテゴリ一覧の取得

  const categoriesFetch = async () => {
    const category = await client.get({
      endpoint: 'categories',
    })
    return category
  }

  // ページ件数の取得
  // const categoriesNumber = async () => {
  //   const categories = await client.get({ endpoint: 'categories' })

  //   for (const category of categories.contents) {
  //     const categoryContents = await client.get({
  //       endpoint: 'posts',
  //       queries: {
  //         filters: `category[equals]${category.id}`,
  //       },
  //     })
  //     console.log(category.id)
  //   }
  // }

  const { data, error } = useSWR('category', categoriesFetch)
  if (error) console.log(error.message)

  // カテゴリの取得結果の判定
  return data ? (
    <>
      <AsideTitle text={'Category'} />
      <ul css={categoryList}>
        {data.contents.map((categoryPage: MicrocmsData) => (
          <li key={categoryPage.id}>
            {/* 最初は1ページに遷移する */}
            <Link href={`/category/${categoryPage.id}/1`}>
              {categoryPage.name}
              {/* <span>({categoryPage.length})</span> */}
            </Link>
          </li>
        ))}
      </ul>
    </>
  ) : (
    <></>
  )
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
