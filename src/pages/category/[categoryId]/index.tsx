import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next'
import { client } from 'libs/client'

export default function CategoryId() {
  return
}

// SSG: データの取得
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  return {
    props: {},
  }
}

// カテゴリのパス生成
export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await client.get({ endpoint: 'categories' })
  const paths = categories.contents.map(
    (category: { id: string }) => `/category/${category.id}`
  )

  return {
    paths,
    fallback: false,
  }
}
