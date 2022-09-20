import { GetStaticPaths, GetStaticProps } from 'next'
import PostSingle from '../../../components/organisms/post/PostSingle'
import { client } from 'libs/client'
import { MicrocmsData } from 'types/microcmsData'

export const getStaticProps: GetStaticProps = async (context) => {
  const { params, previewData } = context
  if (!params?.slug) {
    throw new Error('Error: ID not found')
  }

  /* draftKeyの存在チェック関数 */
  type Draft = {
    draftKey: string
  }

  const isDraft = (arg: any): arg is Draft => {
    if (!arg?.draftKey) {
      return false
    }
    return typeof arg.draftKey === 'string'
  }

  const slug = String(params.slug)
  /* requestのクエリパラメータを生成*/
  const draftKey = isDraft(previewData)
    ? { draftKey: previewData.draftKey }
    : {}

  /* draftKeyを付与してリクエストを投げる */
  try {
    const data = await client.getListDetail<any>({
      endpoint: 'posts',
      contentId: slug,
      queries: draftKey,
    })
    return {
      props: {
        post: data,
        ...draftKey,
      },
    }
  } catch (e) {
    /* 失敗したら404 */
    return { notFound: true }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({
    endpoint: 'posts',
  })
  const paths = data.contents.map(
    (content: MicrocmsData) => `/posts/preview/${content.id}`
  )
  return { paths, fallback: true }
}

type Props = {
  post: MicrocmsData
  draftKey: string
}

export default function Article({ post, draftKey }: Props) {
  return post ? (
    <>
      {/* プレビューモードであるという表示 */}
      {draftKey && <div>現在プレビューモードで閲覧中です。</div>}
      <PostSingle post={post} />
    </>
  ) : (
    <div>no content</div>
  )
}
