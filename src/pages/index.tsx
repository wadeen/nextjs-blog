/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import type {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { memo } from 'react'
import ArticleTitle from '../components/atoms/articleTitle/ArticleTitle'
import Seo from '../components/molecules/Seo'
import { client } from 'libs/client'
import { BasicPagination } from 'src/components/organisms/pagination/BasicPagination'
import PostArchive from 'src/components/organisms/post/PostArchive'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBase'
import AsideArchive from 'src/components/templates/aside/AsideArchive'
import { mediaQuery } from 'src/utils/Breakpoints'
import { MicrocmsData } from 'types/microcmsData'

// SSG
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const data = await client.get({
    endpoint: 'posts',
    queries: { limit: 10 },
  })
  return {
    props: {
      data: data.contents,
      totalCount: data.totalCount,
    },
  }
}
const Home = memo(
  ({ data, totalCount }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
      <>
        <Seo />
        <BlogLayout>
          <BlogLayoutBody>
            <ArticleTitle text={'最新の記事一覧'} />
            <ul css={postLists}>
              {data.map((post: MicrocmsData) => (
                <PostArchive key={post.id} post={post} /> // 最新ページから取り出した記事
              ))}
            </ul>
            <BasicPagination totalCount={totalCount} />
          </BlogLayoutBody>
          <AsideArchive />
        </BlogLayout>
      </>
    )
  }
)

export default Home

// css
const postLists = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  ${mediaQuery[2]} {
    gap: 10px;
  }
`
