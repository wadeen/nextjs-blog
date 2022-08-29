/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import type { GetStaticProps } from 'next'
import AsideBasic from '../components/organisms/aside/asideBasic'
import { client } from 'libs/client'
import PostSingle from 'src/components/organisms/post/PostSingle'
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

const Home = ({ data }: { data: microcmsData[] }) => {
  return (
    <BlogLayout>
      <BlogLayoutBody>
        <ul css={postLists}>
          {data.map((post: microcmsData) => (
            // 最新ページから取り出した一覧記事
            <PostSingle key={post.id} post={post} />
          ))}
        </ul>
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
