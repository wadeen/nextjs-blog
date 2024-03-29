/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import { PER_PAGE } from 'libs/per-page'
import Failed from 'src/components/atoms/Failed'
import ArticleTitle from 'src/components/atoms/articleTitle/ArticleTitle'
import Seo from 'src/components/molecules/Seo'
import { CategoryPagination } from 'src/components/organisms/pagination/CategoryPagination'
import PostArchive from 'src/components/organisms/post/PostArchive'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBase from 'src/components/templates/BlogLayoutBase'
import AsideArchive from 'src/components/templates/aside/AsideArchive'
import { mediaQuery } from 'src/utils/Breakpoints'
import fetchAsideCategory from 'src/utils/fetchAsideCategory'
import fetchZennData from 'src/utils/fetchZennData'
import { paginationRange } from 'src/utils/paginationRange'
import { PostDataType } from 'types/microCms'

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
      <Seo ogpTitle={` ${blog[0].categoryName} の記事一覧 | Webのあれこれ`} />
      <BlogLayoutBase>
        <ArticleTitle text={`カテゴリ： ${blog[0].categoryName} の記事一覧`} />
        <ul css={postLists}>
          {blog.map((post: PostDataType) => (
            <PostArchive key={post.id} post={post} />
          ))}
        </ul>

        <CategoryPagination category="zenn" totalCount={totalCount} />
      </BlogLayoutBase>
      <AsideArchive categoryData={categoryData} />
    </BlogLayout>
  )
}

// SSG: データの取得
export const getStaticProps: GetStaticProps = async () => {
  const zennPostData = await fetchZennData()

  // サイドバーのカテゴリ
  const categoryData = await fetchAsideCategory()

  return {
    props: {
      blog: zennPostData,
      totalCount: zennPostData.length,
      categoryData,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Zennデータの取得(api/fetchZennData.ts)
  const zennPostData = await fetchZennData()

  // 各カテゴリ別の記事をのページ数取得
  const pages = paginationRange(1, Math.ceil(zennPostData.length / PER_PAGE))

  return {
    paths: pages.map((page: number) => `/category/zenn/${page}`),
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
