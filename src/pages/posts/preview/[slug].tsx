import { GetStaticPaths, GetStaticProps } from 'next'
import PostSingle from '../../../components/organisms/post/PostSingle'
import Post from '../[id]'
import { client } from 'libs/client'
import { MicrocmsData } from 'types/microcmsData'

export const getStaticProps: GetStaticProps = async (context) => {
  const { params, previewData } = context
  if (!params?.slug) {
    throw new Error('Error: ID not found')
  }

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
  const draftKey = isDraft(previewData)
    ? { draftKey: previewData.draftKey }
    : {}

  try {
    const data = await client.getListDetail<MicrocmsData>({
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
  console.log('draftKey: ', draftKey)
  return post ? (
    <>
      {draftKey && <div>現在プレビューモードで閲覧中です。</div>}
      <PostSingle post={post} />
      {/* <Post post={post} /> */}
    </>
  ) : (
    <div>no content</div>
  )
}
