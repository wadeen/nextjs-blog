import { GetStaticPaths, GetStaticProps } from 'next'
import { client } from '../../../libs/client'
import { microcmsData } from '../../../types/microcmsData'

// SSG
export const getStaticProps = async (context: { params: microcmsData }) => {
  const id = context.params.id
  const data = await client.get({ endpoint: 'posts', contentId: id })
  return {
    props: {
      data: data,
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

const Post = ({ data }: { data: microcmsData }) => {
  return (
    <>
      <p>タイトル：{data.title}</p>
      <p>カテゴリ名：{data.category.name}</p>
      <p>作成日時：{data.date}</p>
      <p>更新日時：{data.update}</p>
      <p>アイキャッチ画像：{data.eyecatch.url}</p>
      <p>
        {/* 投稿内容：<p dangerouslySetInnerHTML={{ __html: data.content }}></p> */}
      </p>
    </>
  )
}

export default Post
