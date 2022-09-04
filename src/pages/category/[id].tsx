/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { InferGetStaticPropsType } from 'next'
import { client } from '../../../libs/client'
import Seo from '../../components/Seo'
import BlogLayout from '../../components/templates/BlogLayout'
import BlogLayoutBase from '../../components/templates/BlogLayoutBase'
import AsideArchive from '../../components/templates/aside/AsideArchive'
import Failed from 'src/components/atoms/Failed'
import ArticleTitle from 'src/components/atoms/articleTitle/ArticleTitle'
import { CategoryPagination } from 'src/components/organisms/pagination/CategoryPagination'
import PostSingle from 'src/components/organisms/post/PostArchive'
import { microcmsData } from 'types/microcmsData'

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
          {blog.map((post: microcmsData) => (
            <PostSingle key={post.id} post={post} /> // 最新ページから取り出した記事
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
export const getStaticProps = async (context: any) => {
  //✋any
  const id = context.params.id
  const data = await client.get({
    endpoint: 'posts',
    queries: {
      filters: `category[equals]${id}`,
      // offset: (id - 1) * 10,
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
  const paths = repos.contents.map((content: any) => `/category/${content.id}`)
  return { paths, fallback: false }
}

// css
const postLists = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`
