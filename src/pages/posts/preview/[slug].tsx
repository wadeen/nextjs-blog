/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GetStaticPaths, GetStaticProps } from 'next'
// import PostSingle from '../../../components/organisms/post/PostSingle'
import Post from '../[post]'
import { client } from 'libs/client'
import fetchAsideCategory from 'src/pages/api/fetchAsideCategory'
import { mediaQuery } from 'src/utils/Breakpoints'
import { MicrocmsData, CategoryCountAndPost } from 'types/microCms'

export const getStaticProps: GetStaticProps = async (context) => {
  const { params, previewData } = context

  // サイドバーのカテゴリ
  const categoryData = await fetchAsideCategory()

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
    const data = await client.getListDetail({
      endpoint: 'posts',
      contentId: slug,
      queries: draftKey,
    })
    return {
      props: {
        post: data,
        ...draftKey,
        categoryData,
      },
    }
  } catch (e) {
    return { notFound: true }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.getList({
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
  categoryData: CategoryCountAndPost[]
}

export default function Article({ post, draftKey, categoryData }: Props) {
  return post ? (
    <>
      {draftKey && <div css={preview}>現在プレビューモードで閲覧中です。</div>}
      <Post post={post} categoryData={categoryData} />
    </>
  ) : (
    <div>no content</div>
  )
}

const preview = css`
  display: inline-block;
  color: #fff;
  background-color: red;
  position: fixed;
  top: 20px;
  z-index: 100;
  height: 40px;
  line-height: 40px;
  padding: 0 30px;
  border-radius: 6px;
  ${mediaQuery[1]} {
    font-size: 1.4rem;
    height: 25px;
    line-height: 25px;
    padding: 0 15px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }
`
