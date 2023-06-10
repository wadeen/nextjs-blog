import { GetStaticPaths, NextPage } from 'next'
import fetchAsideCategory from '../../utils/fetchAsideCategory'
import { client } from 'libs/client'
import Comment from 'src/components/organisms/comment/Comment'

import PostSingle from 'src/components/organisms/post/PostSingle'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBase'
import AsidePost from 'src/components/templates/aside/AsidePost'
import { MicrocmsData, CategoryCountAndPost } from 'types/microCms'

type Props = {
  post: MicrocmsData
  categoryData: CategoryCountAndPost[]
}

// ISR
export const getStaticProps = async (context: { params: MicrocmsData }) => {
  const id = context.params.post

  const data = await client.getListDetail({ endpoint: 'posts', contentId: id })

  // サイドバーのカテゴリ
  const categoryData = await fetchAsideCategory()

  return {
    props: {
      post: data,
      categoryData,
    },
    revalidate: 60 * 60 * 6, // 6時間
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

const Post = ({ post, categoryData }: Props) => {
  return (
    <BlogLayout>
      <BlogLayoutBody>
        <PostSingle post={post} />
        <Comment id={post.id} />
      </BlogLayoutBody>
      <AsidePost post={post} categoryData={categoryData} />
    </BlogLayout>
  )
}

export default Post
