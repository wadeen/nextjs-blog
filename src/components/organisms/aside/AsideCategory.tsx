/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Link from 'next/link'
import useSWR from 'swr'
import { client } from 'libs/client'
import AsideTitle from 'src/components/atoms/aside/AsideTitle'
import { MicrocmsApi } from 'types/microcmsApi'
import { MicrocmsData } from 'types/microcmsData'

const AsideCategory = () => {
  // カテゴリ一覧の取得

  const fetchCategories = async () => {
    // 全てのカテゴリを取得
    const categories = await client.get({ endpoint: 'categories' })

    // カテゴリの取得
    const categoriesData = await Promise.all(
      categories.contents.map(async (categoryTag: MicrocmsData) => {
        const categoryPost = await client.get({
          endpoint: 'posts',
          queries: {
            filters: `category[equals]${categoryTag.id}`,
            limit: 999,
          },
        })
        return categoryPost
      })
    )
    return categoriesData
  }

  const { data, error } = useSWR('categories', fetchCategories)
  if (error) console.log(error.message)

  // カテゴリの取得結果の判定
  return data ? (
    <>
      <AsideTitle text={'Category'} />
      <ul css={categoryList}>
        {data.map((categoryData: MicrocmsApi) => {
          const category = categoryData.contents[0].category.id
          const totalCount = categoryData.totalCount

          console.log('categoryData: ', categoryData)
          return (
            <li key={category}>
              <Link href={`/category/${category}`}>
                {category}
                <span css={count}>({totalCount})</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  ) : (
    // 取得失敗した場合は、カテゴリ自体を表示しない
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

const count = css`
  display: inline-block;
  margin-left: 10px;
`
