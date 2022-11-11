/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next'
import { useState } from 'react'
import { MicrocmsApi } from '../../../types/microcmsApi'
import ArticleTitle from '../../components/atoms/articleTitle/ArticleTitle'
import Seo from '../../components/molecules/Seo'
import PostArchive from '../../components/organisms/post/PostArchive'
import BlogLayout from '../../components/templates/BlogLayout'
import BlogLayoutBase from '../../components/templates/BlogLayoutBase'
import { paginationRange } from '../../utils/paginationRange'
import { client } from 'libs/client'
import Failed from 'src/components/atoms/Failed'
import { CategoryPagination } from 'src/components/organisms/pagination/CategoryPagination'
import AsideArchive from 'src/components/templates/aside/AsideArchive'
import { mediaQuery } from 'src/utils/Breakpoints'
import { MicrocmsData } from 'types/microcmsData'

const PER_PAGE = 2

export default function CategoryId({
  blog,
  totalCount,
}: // }:
InferGetStaticPropsType<typeof getStaticProps>) {
  // any) {
  if (blog.length === 0) {
    return <Failed text={'カテゴリに該当する記事はありません。'} />
  }
  return (
    <BlogLayout>
      <Seo ogpTitle={` ${blog[0].category.name} の記事一覧 | Webのあれこれ`} />
      <BlogLayoutBase>
        <ArticleTitle text={`カテゴリ： ${blog[0].category.name} の記事一覧`} />
        <ul css={postLists}>
          {blog.map((post: MicrocmsData) => (
            <PostArchive key={post.id} post={post} /> // 最新ページから取り出した記事
          ))}
        </ul>

        <CategoryPagination
          category={blog[0].category.id}
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
  const id = context?.params?.id
  const data = await client.get({
    endpoint: 'posts',
    queries: {
      filters: `category[equals]${id}`,
      // offset: (id - 1) * 2 as number,
      // offset: 0,
      // limit: 10,
    },
  })

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  }
}

export const getAllCategoryPagePaths = async () => {
  const categories = await client.get({ endpoint: 'categories' })

  const paths: string[] = await categories.contents.map(
    (category: MicrocmsApi) => {
      // 該当のページカテゴリ
      const result = client
        .get({
          endpoint: 'posts',
          queries: { filters: `category[equals]${category.id}` },
        })
        .then((post) => {
          return paginationRange(1, Math.ceil(post.totalCount / PER_PAGE)).map(
            (repo) => `/category/${category.id}/${repo}`
          )
        })
      return result
    }
  )
  return paths
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllCategoryPagePaths()
  return {
    // paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    paths,
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
