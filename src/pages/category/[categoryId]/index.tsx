/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next'
import { client } from 'libs/client'
import Failed from 'src/components/atoms/Failed'
import ArticleTitle from 'src/components/atoms/articleTitle/ArticleTitle'
import Seo from 'src/components/molecules/Seo'
import { CategoryPagination } from 'src/components/organisms/pagination/CategoryPagination'
import PostArchive from 'src/components/organisms/post/PostArchive'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBase from 'src/components/templates/BlogLayoutBase'
import AsideArchive from 'src/components/templates/aside/AsideArchive'
import { mediaQuery } from 'src/utils/Breakpoints'
import { dateToString } from 'src/utils/dateToString'
import { PostDataType } from 'types/PostDataType'
import { microCmsPostData } from 'types/microCmsPostData'
import { MicrocmsApi } from 'types/microcmsApi'
import { MicrocmsData } from 'types/microcmsData'

export default function CategoryId({
  blog,
  totalCount,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (blog.length === 0) {
    return <Failed text={'カテゴリに該当する記事はありません。'} />
  }
  return (
    <BlogLayout>
      <Seo ogpTitle={` ${blog[0].categoryName} の記事一覧 | Webのあれこれ`} />
      <BlogLayoutBase>
        <ArticleTitle text={`カテゴリ： ${blog[0].categoryName} の記事一覧`} />
        <ul css={postLists}>
          {blog.map((post: PostDataType) => (
            <PostArchive key={post.id} post={post} />
          ))}
        </ul>

        <CategoryPagination
          category={blog[0].categoryId}
          totalCount={totalCount}
        />
      </BlogLayoutBase>
      <AsideArchive />
    </BlogLayout>
  )
}

// SSG: データの取得
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const params = context?.params?.categoryId

  const microcmsData = await client.get<MicrocmsApi>({
    endpoint: 'posts',
    queries: {
      filters: `category[equals]${params}`,
      limit: 6,
    },
  })

  const data = microcmsData.contents.map((item: MicrocmsData) => {
    const createdAt = dateToString(item.createdAt, 'YYYY/MM/DD')
    const updatedAt = dateToString(item.updatedAt, 'YYYY/MM/DD')
    return {
      id: item.id,
      title: item.title,
      content: item.content,
      description: item.description || null,
      categoryId: item.category.id,
      categoryName: item.category.name,
      updatedAt,
      createdAt,
      eyecatch: item.eyecatch.url,
    }
  })

  return {
    props: {
      blog: data,
      totalCount: data.length,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 全てのカテゴリAPI取得
  const categories = await client.get({ endpoint: 'categories' })
  // カテゴリIDのみ全て取得
  const allCategoryId = categories.contents.map(
    (category: microCmsPostData) => category.id
  )

  return {
    paths: allCategoryId.map((category: string) => `/category/${category}`),
    fallback: false,
  }
}

// css
const postLists = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  ${mediaQuery[2]} {
    gap: 10px;
  }
`
