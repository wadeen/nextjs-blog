/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Seo from '../components/Seo'
import ArticleTitle from '../components/atoms/articleTitle/ArticleTitle';
import { client } from 'libs/client'
import { mq } from 'src/components/Breakpoints'
import { BasicPagination } from 'src/components/organisms/pagination/BasicPagination'
import PostArchive from 'src/components/organisms/post/PostArchive'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBase'
import AsideArchive from 'src/components/templates/aside/AsideArchive'
import { MicrocmsData } from 'types/microcmsData'

// SSG
export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({
    endpoint: 'posts',
  })
  return {
    props: {
      data: data.contents,
      totalCount: data.totalCount,
    },
  }
}

const Home = ({
  data,
  totalCount,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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

export default Home

// css
const postLists = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  ${mq[2]} {
    gap: 10px;
  }
`
