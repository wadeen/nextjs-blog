/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next'
import { client } from 'libs/client'
import Failed from 'src/components/atoms/Failed'
import ArticleTitle from 'src/components/atoms/articleTitle/ArticleTitle'
import Seo from 'src/components/molecules/Seo'
import { CategoryPagination } from 'src/components/organisms/pagination/CategoryPagination'
import PostArchive from 'src/components/organisms/post/PostArchive'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBase from 'src/components/templates/BlogLayoutBase'
import AsideArchive from 'src/components/templates/aside/AsideArchive'
import { mediaQuery } from 'src/utils/Breakpoints'
import { paginationRange } from 'src/utils/paginationRange'
import { PostDataType } from 'types/PostDataType'

const PER_PAGE = 6

export default function CategoryId({
  blog,
  totalCount,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (blog.length === 0) {
    return <Failed text={'カテゴリに該当する記事はありません。'} />
  }
  return (
    <BlogLayout>
      <Seo ogpTitle={`${blog[0].category.name} の記事一覧 | Webのあれこれ`} />
      <BlogLayoutBase>
        <ArticleTitle text={`カテゴリ： ${blog[0].category.name} の記事一覧`} />
        <ul css={postLists}>
          {blog.map((post: PostDataType) => (
            <PostArchive key={post.id} post={post} /> // 最新ページから取り出した記事
          ))}
        </ul>

        <CategoryPagination
          category={blog[0].category.id}
          totalCount={totalCount}
        />
      </BlogLayoutBase>
      <AsideArchive />
    </BlogLayout>
  )
}

// SSG: データの取得
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  // paramsの型エラー回避のため
  const categoryName = context?.params?.categoryId // カテゴリー名(ID)
  const categoryNum = context?.params?.pageNum // カテゴリーの合計数

  const data = await client.get({
    endpoint: 'posts',
    queries: {
      filters: `category[equals]${categoryName}`,
      offset: (Number(categoryNum) - 1) * 6,
      limit: 6,
    },
  })

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 全てのカテゴリAPI取得
  const categories = await client.get({ endpoint: 'categories' })

  // pathsに設定する配列の作成
  const categoryPaths: any = []

  // 各カテゴリ別の記事を取得(カテゴリの合計ページ数の取得)
  for (const category of categories.contents) {
    const { totalCount: totalCountByCategory } = await client.get({
      endpoint: 'posts',
      queries: {
        filters: `category[equals]${category.id}`,
        limit: 1,
        fields: 'id',
      },
    })

    // 各カテゴリ別の記事をのページ数取得
    const pages = paginationRange(1, Math.ceil(totalCountByCategory / PER_PAGE))

    // 各カテゴリ別の記事一覧のパスを作成
    pages.forEach((pageNum) => {
      categoryPaths.push(`/category/${category.id}/${pageNum}`)
    })
  }

  return {
    paths: categoryPaths,
    fallback: false,
  }
}

// css
const postLists = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  ${mediaQuery[2]} {
    gap: 10px;
  }
`
