import { NextPage } from 'next'
import CustomErrorPage from './404'

export const getStaticProps = async (context: any) => {
  const slug = context.params?.slug
  const draftKey = context.previewData?.draftKey
  const content = await fetch(
    `https://nextjs-blog-wadeen.microcms.io/api/v1/posts/${slug}${
      draftKey !== undefined ? `?draftKey=${draftKey}` : ''
    }`,
    { headers: { 'X-MICROCMS-API-KEY': process.env.apiKey || '' } }
  ).then((res) => res.json())
  return {
    props: {
      content,
    },
  }
}

const Page = ({ content }: any) => {
  if (!content) {
    return <CustomErrorPage />
  }
}


