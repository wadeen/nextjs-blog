/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next'
import { client } from 'libs/client'
import { PER_PAGE } from 'libs/per-page'
import Failed from 'src/components/atoms/Failed'
import ArticleTitle from 'src/components/atoms/articleTitle/ArticleTitle'
import Seo from 'src/components/molecules/Seo'
import { CategoryPagination } from 'src/components/organisms/pagination/CategoryPagination'
import PostArchive from 'src/components/organisms/post/PostArchive'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBase from 'src/components/templates/BlogLayoutBase'
import AsideArchive from 'src/components/templates/aside/AsideArchive'
import fetchAsideCategory from 'src/pages/api/fetchAsideCategory'
import { mediaQuery } from 'src/utils/Breakpoints'
import { dateToString } from 'src/utils/dateToString'
import { paginationRange } from 'src/utils/paginationRange'
import { PostDataType, MicrocmsData } from 'types/microCms'

export default function CategoryId({
  blog,
  totalCount,
  categoryData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (blog.length === 0) {
    return <Failed text={'カテゴリに該当する記事はありません。'} />
  }
  return (
    <BlogLayout>
      <Seo ogpTitle={`${blog[0].categoryName} の記事一覧 | Webのあれこれ`} />
      <BlogLayoutBase>
        <ArticleTitle text={`カテゴリ： ${blog[0].categoryName} の記事一覧`} />
        <ul css={postLists}>
          {blog.map((post: PostDataType) => (
            <PostArchive key={post.id} post={post} />
          ))}
        </ul>

        <CategoryPagination
          category={blog[0].categoryId}
          totalCount={totalCount}
        />
      </BlogLayoutBase>
      <AsideArchive categoryData={categoryData} />
    </BlogLayout>
  )
}

// SSG: データの取得
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const categoryName = context?.params?.categoryId // カテゴリー名(ID)
  const categoryNum = context?.params?.pageNum // カテゴリーの合計数

  const microcmsData = await client.getList({
    endpoint: 'posts',
    queries: {
      filters: `category[equals]${categoryName}`,
      offset: (Number(categoryNum) - 1) * 6,
      limit: 6,
    },
  })

  const data = microcmsData.contents.map((item: MicrocmsData) => {
    const created_at = dateToString(item.created_at, 'YYYY/MM/DD')
    const updated_at =
      item.updated_at === undefined
        ? ''
        : dateToString(item.updated_at, 'YYYY/MM/DD')

    return {
      id: item.id,
      title: item.title,
      content: item.content,
      description: item.description || null,
      categoryId: item.category.id,
      categoryName: item.category.name,
      updated_at,
      created_at,
      eyecatch: item.eyecatch.url,
    }
  })

  // サイドバーのカテゴリ
  const categoryData = await fetchAsideCategory()

  return {
    props: {
      blog: data,
      totalCount: data.length,
      categoryData,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 全てのカテゴリAPI取得
  const categories = await client.getList({ endpoint: 'categories' })

  // pathsに設定する配列の作成
  const categoryPaths: string[] = []

  // 各カテゴリ別の記事を取得(カテゴリの合計ページ数の取得)
  for (const category of categories.contents) {
    const { totalCount: totalCountByCategory } = await client.getList({
      endpoint: 'posts',
      queries: {
        filters: `category[equals]${category.id}`,
        limit: 1,
        fields: ['id'],
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
