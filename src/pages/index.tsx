/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import AsideBasic from '../components/organisms/aside/asideBasic'
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
    },
  }
}

const Home = ({
  data,
  totalCount,
}: {
  data: microcmsData[]
  totalCount: any
}) => {
  return (
    <BlogLayout>
      <BlogLayoutBody>
        <ul css={postLists}>
          {data.map((post: microcmsData) => (
            <PostSingle key={post.id} post={post} /> // 最新ページから取り出した一覧記事
          ))}
        </ul>
        <Pagination totalCount={20} />
      </BlogLayoutBody> 
      <AsideBasic />
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
