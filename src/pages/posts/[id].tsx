import { GetStaticPaths, NextPage } from 'next'
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
    queries: { limit: 100 }, // API取得件数:デフォルト10件(上限5MB)
  })
  const paths = data.contents.map(
    (content: microcmsData) => `/posts/${content.id}`
  )

  return {
    paths,
    fallback: false,
  }
}

const Post: NextPage<{ post: microcmsData }> = ({ post }) => {
  return (
    <BlogLayout>
      <BlogLayoutBody>
        <PostSingle post={post} />
        {/* v1.1で公開予定
           <Comment /> 
          */}
      </BlogLayoutBody>
      <AsidePost post={post} />
    </BlogLayout>
  )
}

export default Post
