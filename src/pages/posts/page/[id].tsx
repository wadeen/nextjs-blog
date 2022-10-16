import { css } from '@emotion/react'
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { client } from '../../../../libs/client'
import { MicrocmsData } from '../../../../types/microcmsData'
import ArticleTitle from '../../../components/atoms/articleTitle/ArticleTitle'
import Seo from '../../../components/molecules/Seo'
import AsideArchive from '../../../components/templates/aside/AsideArchive'
import { BasicPagination } from 'src/components/organisms/pagination/BasicPagination'
import PostArchive from 'src/components/organisms/post/PostArchive'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBase'
import { mediaQuery } from 'src/utils/Breakpoints'
import { paginationRange } from 'src/utils/paginationRange'

const PER_PAGE = 10

// SSG: データの取得
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const id = Number(context?.params?.id)

  const data = await client.get({
    endpoint: 'posts',
    queries: { offset: Number(id - 1) * 10, limit: 10 },
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

  const paths = paginationRange(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
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
            {data.map((post: MicrocmsData) => (
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
  ${mediaQuery[2]} {
    gap: 10px;
  }
`
