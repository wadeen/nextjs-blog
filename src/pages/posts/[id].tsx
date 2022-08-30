import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { client } from '../../../libs/client'
import { microcmsData } from '../../../types/microcmsData'
import PostSingle from '../../components/organisms/post/PostSingle'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBody'
import AsideArchive from 'src/components/templates/aside/AsideArchive'

// SSG
export const getStaticProps = async (context: { params: microcmsData }) => {
  const id = context.params.id
  const data = await client.get({ endpoint: 'posts', contentId: id })
  return {
    props: {
      post: data,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({
    endpoint: 'posts',
    // API取得件数:デフォルト10件(上限5MB)
    queries: { limit: 100 },
  })
  const paths = data.contents.map(
    (content: microcmsData) => `/posts/${content.id}`
  )

  return {
    paths,
    fallback: false,
  }
}

const Post = ({ post }: { post: microcmsData }) => {
  return (
    <>
      {/* ToDo: OGPは外に出す(新しくコンポーネントを作成する予定.全体的に */}
      <Head>
        <title>{post.title} | Webのあれこれ</title>
      </Head>

      <BlogLayout>
        <BlogLayoutBody>
          <PostSingle post={post} />
        </BlogLayoutBody>
        <AsideArchive />
      </BlogLayout>
    </>
  )
}

export default Post
