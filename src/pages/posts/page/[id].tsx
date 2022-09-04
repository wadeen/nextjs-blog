/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { client } from '../../../../libs/client'
import { microcmsData } from '../../../../types/microcmsData'
import Seo from '../../../components/Seo'
import ArticleTitle from '../../../components/atoms/articleTitle/ArticleTitle'
import AsideArchive from '../../../components/templates/aside/AsideArchive'
import { mq } from 'src/components/Breakpoints'
import { BasicPagination } from 'src/components/organisms/pagination/BasicPagination'
import PostArchive from 'src/components/organisms/post/PostArchive'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBase'

const PER_PAGE = 10

// SSG: データの取得
export const getStaticProps = async (context: any) => {
  //✋any
  const pageId = context?.params?.id

  const data = await client.get({
    endpoint: 'posts',
    queries: { offset: (pageId - 1) * 10, limit: 10 },
  })

  return {
    props: {
      data: data.contents,
      totalCount: data.totalCount,
    },
  }
}

// 動的ページの作成
export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: 'posts' })
  const pageNumbers = []
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)
  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
    (repo) => `/posts/page/${repo}`
  )
  return { paths, fallback: false }
}

const PostPage = ({
  data,
  totalCount,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  return (
    <>
      <Seo ogpTitle="記事一覧 | Webのあれこれ" />
      <BlogLayout>
        <BlogLayoutBody>
          <ArticleTitle text={`記事一覧 　${router.query.id}ページ目`} />
          <ul css={postLists}>
            {data.map((post: microcmsData) => (
              <PostArchive key={post.id} post={post} /> // 最新ページから取り出した一覧記事
            ))}
          </ul>
          <BasicPagination totalCount={totalCount} />
        </BlogLayoutBody>
        <AsideArchive />
      </BlogLayout>
    </>
  )
}

export default PostPage

// css
const postLists = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  ${mq[2]} {
    gap: 10px;
  }
`
