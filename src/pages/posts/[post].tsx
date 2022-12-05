import { GetStaticPaths, NextPage } from 'next'
import { client } from '../../../libs/client'
import { MicrocmsData } from '../../../types/microcmsData'
import Comment from 'src/components/organisms/comment/Comment'

import PostSingle from 'src/components/organisms/post/PostSingle'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBase'
import AsidePost from 'src/components/templates/aside/AsidePost'

// SSG
export const getStaticProps = async (context: { params: MicrocmsData }) => {
  const id = context.params.post
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
    queries: { limit: 100 }, // API取得件数:デフォルト10件(上限5MB)
  })
  const paths = data.contents.map(
    (content: MicrocmsData) => `/posts/${content.id}`
  )
  return {
    paths,
    fallback: false,
  }
}

const Post: NextPage<{ post: MicrocmsData }> = ({ post }) => {
  return (
    <BlogLayout>
      <BlogLayoutBody>
        <PostSingle post={post} />
        <Comment id={post.id} />
      </BlogLayoutBody>
      <AsidePost post={post} />
    </BlogLayout>
  )
}

export default Post
