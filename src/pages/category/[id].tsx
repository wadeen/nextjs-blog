/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { client } from '../../../libs/client'
import BlogLayout from '../../components/templates/BlogLayout'
import BlogLayoutBase from '../../components/templates/BlogLayoutBase'
import AsideArchive from '../../components/templates/aside/AsideArchive'
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
    return (
      <div css={failed}>
        カテゴリに該当する記事はありません。
        <p>
          <Link href="/">
            <a>記事一覧ページへ戻る</a>
          </Link>
        </p>
      </div>
    )
  }
  return (
    <BlogLayout>
      <BlogLayoutBase>
        <ArticleTitle text={`カテゴリ： ${blog[0].category.name} の記事一覧`} />
        <ul css={postLists}>
          {blog.map((post: microcmsData) => (
            <PostSingle key={post.id} post={post} /> // 最新ページから取り出した記事
          ))}
        </ul>

        {/* Pagination 未対応→ v1.1で実装 */}
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

const failed = css`
  p {
    margin-top: 40px;
    a {
      color: var(--cLink);
      text-decoration: underline;
      transition: opacity 0.3s ease;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`
