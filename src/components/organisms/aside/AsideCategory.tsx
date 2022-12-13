/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Link from 'next/link'
import { useEffect } from 'react'
import useSWR from 'swr'
import { client } from 'libs/client'
import AsideTitle from 'src/components/atoms/aside/AsideTitle'
import { microCmsPostData } from 'types/microCmsPostData'
import { MicrocmsData } from 'types/microcmsData'

// type Category = {
//   category: string
//   totalCount: string
// }[]

const AsideCategory = () => {
  // let categoryData: any = []

  // カテゴリ一覧の取得

  const categoriesFetch = async () => {
    // 全てのカテゴリを取得
    const categories = await client.get({ endpoint: 'categories' })
    return categories

    // カテゴリ別の記事を取得
    // const categoryPostCategoryData = categories.contents.map(
    //   async (category: microCmsPostData) => {
    //     await client
    //       .get({
    //         endpoint: 'posts',
    //         queries: {
    //           filters: `category[equals]${category.id}`,
    //           limit: 999,
    //         },
    //       })
    //       // .then((res) => console.log('res: ', res.contents))
    //       .then((res) => {
    //         categoryData.push(
    //           {
    //           // category: {
    //           category: res.contents[0].category.id,
    //           totalCount: res.totalCount,
    //           // },
    //         }
    //         )
    //       })
    //       .catch((err) => console.log(err))
    //   }
    // )
    // console.log('categoryData: ', categoryData)
    // return categoryPostCategoryData
  }

  let hoge: string[] = []

  const { data, error } = useSWR('categories', categoriesFetch)
  if (error) console.log(error.message)

  // カテゴリの取得結果の判定
  return data ? (
    <>
      <ul css={categoryList}>
        <AsideTitle text={'Category'} />
        {data.contents.map((categoryPage: MicrocmsData) => (
          <li key={categoryPage.id}>
            <Link href={`/category/${categoryPage.id}`}>
              {categoryPage.name}
              {/* <span>{categoryTotalCount}</span> */}
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
