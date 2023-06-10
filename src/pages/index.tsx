/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { memo } from 'react'
import ArticleTitle from '../components/atoms/articleTitle/ArticleTitle'
import Seo from '../components/molecules/Seo'
import fetchAsideCategory from '../utils/fetchAsideCategory'
import { PER_PAGE } from 'libs/per-page'
import { BasicPagination } from 'src/components/organisms/pagination/BasicPagination'
import PostArchive from 'src/components/organisms/post/PostArchive'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBase'
import AsideArchive from 'src/components/templates/aside/AsideArchive'
import { mediaQuery } from 'src/utils/Breakpoints'
import fetchMicrocmsData from 'src/utils/fetchMicrocmsData'
import fetchZennData from 'src/utils/fetchZennData'
import { PostDataType } from 'types/microCms'

// ISR
export const getStaticProps: GetStaticProps = async () => {
  // Zennデータの取得(api/fetchZennData.ts)
  const zennPostData = await fetchZennData()

  // microCMSデータの取得(api/fetchMicrocmsData.ts)
  const microcmsPostData = await fetchMicrocmsData()

  // Zenn + microCMS合わせた記事
  const data = [...microcmsPostData, ...zennPostData]

  // データの並び替え: 投稿日順
  data.sort((a, b) => (a.created_at > b.created_at ? -1 : 1))

  // [pageNum]に表示するデータ
  const displayData = data.slice(0, PER_PAGE)

  // サイドバーのカテゴリ
  const categoryData = await fetchAsideCategory()

  return {
    props: {
      data: displayData,
      totalCount: data.length,
      categoryData,
    },
    revalidate: 60 * 60 * 6, // 6時間
  }
}
const Home = memo(
  ({
    data,
    totalCount,
    categoryData,
  }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
      <>
        <Seo />
        <BlogLayout>
          <BlogLayoutBody>
            <ArticleTitle text={'最新の記事一覧'} />
            <ul css={postLists}>
              {data.map((post: PostDataType) => (
                <PostArchive key={post.id} post={post} /> // 最新ページから取り出した記事
              ))}
            </ul>
            <BasicPagination totalCount={totalCount} />
          </BlogLayoutBody>
          <AsideArchive categoryData={categoryData} />
        </BlogLayout>
      </>
    )
  }
)

export default Home

// css
const postLists = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  ${mediaQuery[2]} {
    gap: 10px;
  }
`
