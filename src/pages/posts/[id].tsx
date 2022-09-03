import { GetStaticPaths } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { client } from '../../../libs/client'
import { microcmsData } from '../../../types/microcmsData'
import PostSingle from '../../components/organisms/post/PostSingle'
import Comment from 'src/components/organisms/comment/Comment'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBase'
import AsidePost from 'src/components/templates/aside/AsidePost'

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
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_HOST
  return (
    <>
      <Head>
        <title>{post.title} | Webのあれこれ</title>
        <meta property="og:url" content={`${baseUrl}`} />
        <meta property="og:type" content=" website" />
        <meta property="og:title" content="Webのあれこれ" />
        <meta
          property="og:description"
          content=" ディスクリプションのテキストが入ります。"
        />
        <meta property="og:site_name" content="Webのあれこれ" />
        <meta property="og:image" content="https://placehold.jp/1200x630.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@wadeen_net" />
      </Head>

      <BlogLayout>
        <BlogLayoutBody>
          <PostSingle post={post} />
          {/* <Comment /> */}
        </BlogLayoutBody>
        <AsidePost post={post} />
      </BlogLayout>
    </>
  )
}

export default Post
