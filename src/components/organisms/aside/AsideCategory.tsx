/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Link from 'next/link'
import useSWR from 'swr'
import { client } from 'libs/client'
import AsideTitle from 'src/components/atoms/aside/AsideTitle'

type CategoryCountAndPost = {
  category: string
  totalCount: string
}

const AsideCategory = () => {
  // 各カテゴリのページ情報の取得
  const fetchCategories = async () => {
    // 全てのカテゴリを取得
    const categories = await client.get({ endpoint: 'categories' })

    // カテゴリと合計件数が入る配列
    const categoryPosts: CategoryCountAndPost[] = []

    // カテゴリ別の記事を取得
    for (const category of categories.contents) {
      const categoryPostData = await client.get({
        endpoint: 'posts',
        queries: {
          filters: `category[equals]${category.id}`,
          limit: 999,
        },
      })

      // カテゴリ別の記事のカテゴリIDと合計数の代入
      categoryPosts.push({
        category: category.id,
        totalCount: categoryPostData.totalCount,
      })
    }
    return categoryPosts
  }

  const { data, error } = useSWR('categories', fetchCategories)
  if (error) console.log(error.message)

  // カテゴリの取得結果の判定
  return data ? (
    <>
      <ul css={categoryList}>
        <AsideTitle text={'Category'} />
        {data.map((categoryData: CategoryCountAndPost) => (
          <li key={categoryData.category}>
            <Link href={`/category/${categoryData.category}`}>
              {categoryData.category}
              <span css={totalCount}>({categoryData.totalCount})</span>
            </Link>
          </li>
        ))}
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

const totalCount = css`
  display: inline-block;
  margin-left: 10px;
`

const loadingIcon = css`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`
