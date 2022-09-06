/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'

import { MicrocmsApi } from '../../../types/microcmsApi'
import Seo from '../../components/Seo'
import ArticleTitle from '../../components/atoms/articleTitle/ArticleTitle'
import BlogLayout from '../../components/templates/BlogLayout'
import BlogLayoutBase from '../../components/templates/BlogLayoutBase'
import { client } from 'libs/client'
import { mq } from 'src/components/Breakpoints'
import Failed from 'src/components/atoms/Failed'
// import { CategoryPagination } from 'src/components/organisms/pagination/CategoryPagination'
import PostArchive from 'src/components/organisms/post/PostArchive'
import AsideArchive from 'src/components/templates/aside/AsideArchive'
import { MicrocmsData } from 'types/microcmsData'

const PER_PAGE = 10

export default function CategoryId({
  blog,
  totalCount,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (blog.length === 0) {
    return <Failed text={'カテゴリに該当する記事はありません。'} />
  }
  return (
    <BlogLayout>
      <Seo ogpTitle={` ${blog[0].category.name} の記事一覧 | Webのあれこれ`} />
      <BlogLayoutBase>
        <ArticleTitle text={`カテゴリ： ${blog[0].category.name} の記事一覧`} />
        <ul css={postLists}>
          {blog.map((post: MicrocmsData) => (
            <PostArchive key={post.id} post={post} /> // 最新ページから取り出した記事
          ))}
        </ul>

        {/* Pagination 未対応→ v1.1~で実装 */}
        {/* <CategoryPagination
          category={blog[0].category.id}
          totalCount={totalCount}
        /> */}
      </BlogLayoutBase>
      <AsideArchive />
    </BlogLayout>
  )
}

// SSG: データの取得
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const id = context?.params?.id
  const data = await client.get({
    endpoint: 'posts',
    queries: {
      filters: `category[equals]${id}`,
      // offset: (id - 1) * 10, // ページネーション設定後にON
      limit: 100,
    },
  })

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  }
}

// 動的ページの作成
export const getStaticPaths = async () => {
  const repos = await client.get({
    endpoint: 'categories',
  })
  const paths = repos.contents.map(
    (content: MicrocmsApi) => `/category/${content.id}`
  )
  return { paths, fallback: false }
}

// css
const postLists = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  ${mq[2]} {
    gap: 10px;
  }
`
