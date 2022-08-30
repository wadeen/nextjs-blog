/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import ArticleTitle from '../components/atoms/articleTitle/ArticleTitle'
import AsideArchive from '../components/templates/aside/AsideArchive'
import { client } from 'libs/client'
import { Pagination } from 'src/components/organisms/micrcmsCustom/Pagination'
import PostSingle from 'src/components/organisms/post/PostArchive'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBody'
import { microcmsData } from 'types/microcmsData'

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
    <BlogLayout>
      <BlogLayoutBody>
        <ArticleTitle text={'最新の記事一覧'} />
        <ul css={postLists}>
          {data.map((post: microcmsData) => (
            <PostSingle key={post.id} post={post} /> // 最新ページから取り出した記事
          ))}
        </ul>
        <Pagination totalCount={totalCount} />
      </BlogLayoutBody>
      <AsideArchive />
    </BlogLayout>
  )
}

export default Home

// css
const postLists = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`
