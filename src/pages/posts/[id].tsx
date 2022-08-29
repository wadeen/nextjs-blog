import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { client } from '../../../libs/client'
import { microcmsData } from '../../../types/microcmsData'
import AsideBasic from '../../components/organisms/aside/asideBasic'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBody'

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
  const data = await client.get({ endpoint: 'posts' })
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
    <BlogLayout>
      <BlogLayoutBody>
        {/* ToDo: OGPは外に出す(新しくコンポーネントを作成する予定.全体的に */}
        <Head>
          <title>{post.title} | Webのあれこれ</title>
        </Head>

        <p>タイトル：{post.title}</p>
        <p>カテゴリ名：{post.category.name}</p>
        <p>
          作成日時：
          {/* {dayjs.utc(post.date).tz('Asia/Tokyo').format('YYYY/MM/DD')} */}
        </p>
        <p>
          更新日時：
          {/* {dayjs.utc(post.update).tz('Asia/Tokyo').format('YYYY/MM/DD')} */}
        </p>
        <p>アイキャッチ画像：{post.eyecatch.url}</p>
        {/* <p>投稿内容：<p dangerouslySetInnerHTML={{ __html: data.content }}></p></p> */}
      </BlogLayoutBody>
      <AsideBasic />
    </BlogLayout>
  )
}

export default Post
