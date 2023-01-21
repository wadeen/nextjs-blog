/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { memo } from 'react'
import ArticleTitle from '../components/atoms/articleTitle/ArticleTitle'
import Seo from '../components/molecules/Seo'
import fetchMicrocmsData from './api/fetchMicrocmsData'
import fetchZennData from './api/fetchZennData'
import { BasicPagination } from 'src/components/organisms/pagination/BasicPagination'
import PostArchive from 'src/components/organisms/post/PostArchive'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBase'
import AsideArchive from 'src/components/templates/aside/AsideArchive'
import { mediaQuery } from 'src/utils/Breakpoints'
import { PostDataType } from 'types/PostDataType'

// SSG
export const getStaticProps: GetStaticProps = async () => {
  // Zennデータの取得(api/fetchZennData.ts)
  const zennPostData = await fetchZennData()

  // microCMSデータの取得(api/fetchMicrocmsData.ts)
  const queries = { limit: 6 - zennPostData.length } // microCMS + Zenn合計で最大6件
  const microcmsPostData = await fetchMicrocmsData({ queries })

  // Zenn + microCMS合わせた記事
  const data = [...microcmsPostData, ...zennPostData]

  // データの並び替え: 投稿日順
  data.sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : 1
  })

  return {
    props: {
      data,
      totalCount: data.length,
    },
  }
}
const Home = memo(
  ({ data, totalCount }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
          <AsideArchive />
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
