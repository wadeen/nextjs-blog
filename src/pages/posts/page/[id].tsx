/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Head from 'next/head'
import { client } from '../../../../libs/client'
import { microcmsData } from '../../../../types/microcmsData'
import AsideBasic from '../../../components/organisms/aside/asideBasic'
import { Pagination } from 'src/components/organisms/micrcmsCustom/Pagination'
import PostSingle from 'src/components/organisms/post/PostArchive'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBody'

// SSG
// const PER_PAGE = 5
// export const getStaticProps = async (context: { params: microcmsData }) => {
//   const id = context.params.id

//   const data = await client.get({ endpoint: 'posts', contentId: id })

//   // const data = await client.get({
//   //   endpoint: 'posts',
//   //   // @ts-ignore //✋
//   //   queries: { offset: (id - 1) * 5, limit: 5 },
//   //   contentId: id,
//   // })
//   return {
//     props: {
//       post: data,
//       totalCount: data.totalCount,
//     },
//   }
// }

// export const getStaticPaths = async () => {
//   const data = await client.get({ endpoint: 'posts' })

//   // const pageNumbers = []
//   // // @ts-ignore //✋
//   const range = (start: any, end: any) =>
//     [...Array(end - start + 1)].map((_, i) => start + i)
//   console.log('range', range)
//   // // @ts-ignore //✋
//   const paths = range(1, Math.ceil(data.totalCount / PER_PAGE)).map(
//     (post) => console.log('post', post)
//     // `/posts/page/${post}`
//   )

//   // const paths = data.contents.map(
//   //   (content: microcmsData) => `/posts/page/${content.id}`
//   // )

//   return {
//     paths,
//     fallback: false,
//   }
// }

// const PostPage = ({ post }: { post: microcmsData }) => {
const PostPage = ({ post }: any) => {
  return (
    <>
      {/* ToDo: OGPは外に出す(新しくコンポーネントを作成する予定.全体的に */}
      <Head>{/* <title>{post.title} | Webのあれこれ</title> */}</Head>

      <BlogLayout>
        <BlogLayoutBody>
          {/* <ul css={postLists}>
            {post.map((post: microcmsData) => (
              <PostSingle key={post.id} post={post} /> // 最新ページから取り出した一覧記事
            ))}
          </ul> */}
          {/* <Pagination totalCount={20} /> */}
        </BlogLayoutBody>
        <AsideBasic />
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
`
