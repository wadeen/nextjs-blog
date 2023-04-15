/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Failed from 'src/components/atoms/Failed'
import ArticleTitle from 'src/components/atoms/articleTitle/ArticleTitle'
import Seo from 'src/components/molecules/Seo'
import { CategoryPagination } from 'src/components/organisms/pagination/CategoryPagination'
import PostArchive from 'src/components/organisms/post/PostArchive'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBase from 'src/components/templates/BlogLayoutBase'
import AsideArchive from 'src/components/templates/aside/AsideArchive'
import { mediaQuery } from 'src/utils/Breakpoints'
import fetchAsideCategory from 'src/utils/fetchAsideCategory'
import fetchZennData from 'src/utils/fetchZennData'
import { PostDataType } from 'types/microCms'

export default function CategoryId({
  blog,
  totalCount,
  categoryData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (blog.length === 0) {
    return <Failed text={'カテゴリに該当する記事はありません。'} />
  }
  return (
    <BlogLayout>
      <Seo ogpTitle={` ${blog[0].categoryName} の記事一覧 | Webのあれこれ`} />
      <BlogLayoutBase>
        <ArticleTitle
          text={`カテゴリ： ${blog[0].categoryName} の記事一覧 (外部URLに遷移します)`}
        />
        <ul css={postLists}>
          {blog.map((post: PostDataType) => (
            <PostArchive key={post.id} post={post} />
          ))}
        </ul>

        <CategoryPagination category="zenn" totalCount={totalCount} />
      </BlogLayoutBase>
      <AsideArchive categoryData={categoryData} />
    </BlogLayout>
  )
}

// SSG: データの取得
export const getStaticProps: GetStaticProps = async () => {
  // Zennデータの取得(api/fetchZennData.ts)
  const zennPostData = await fetchZennData()

  // サイドバーのカテゴリ
  const categoryData = await fetchAsideCategory()

  return {
    props: {
      blog: zennPostData,
      totalCount: zennPostData.length,
      categoryData,
    },
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
