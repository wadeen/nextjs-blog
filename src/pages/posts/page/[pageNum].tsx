/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { PER_PAGE } from 'libs/per-page'
import ArticleTitle from 'src/components/atoms/articleTitle/ArticleTitle'
import Seo from 'src/components/molecules/Seo'
import { BasicPagination } from 'src/components/organisms/pagination/BasicPagination'
import PostArchive from 'src/components/organisms/post/PostArchive'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBase'
import AsideArchive from 'src/components/templates/aside/AsideArchive'
import fetchAsideCategory from 'src/pages/api/fetchAsideCategory'
import fetchMicrocmsData from 'src/pages/api/fetchMicrocmsData'
import fetchZennData from 'src/pages/api/fetchZennData'
import { mediaQuery } from 'src/utils/Breakpoints'
import { paginationRange } from 'src/utils/paginationRange'
import { PostDataType } from 'types/PostDataType'

// SSG: データの取得
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const id = Number(context?.params?.pageNum) // 現在のページ数
  const offset = (id - 1) * PER_PAGE // 何記事目から始めるか

  // Zennデータの取得(api/fetchZennData.ts)
  const zennPostData = await fetchZennData()

  // microCMSデータの取得(api/fetchMicrocmsData.ts)
  const microcmsPostData = await fetchMicrocmsData()

  // Zenn + microCMS合わせた記事
  const data = [...microcmsPostData, ...zennPostData]

  // データの並び替え: 投稿日順
  data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))

  // [pageNum]に表示するデータ
  const displayData = data.slice(offset, offset + PER_PAGE)

  // サイドバーのカテゴリ
  const categoryData = await fetchAsideCategory()

  return {
    props: {
      data: displayData,
      totalCount: data.length,
      categoryData,
    },
  }
}

// 動的ページの作成
export const getStaticPaths = async () => {
  // microCMSデータの取得(api/fetchMicrocmsData.ts)
  const microcmsPostData = await fetchMicrocmsData()

  // Zennデータの取得(api/fetchZennData.ts)
  const zennPostData = await fetchZennData()

  // Zenn + microCMS合わせた記事全件
  const data = [...microcmsPostData, ...zennPostData]

  const paths = paginationRange(1, Math.ceil(data.length / PER_PAGE)).map(
    (repo) => `/posts/page/${repo}`
  )
  return { paths, fallback: false }
}

const PostPage = ({
  data,
  totalCount,
  categoryData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  return (
    <>
      <Seo ogpTitle="記事一覧 | Webのあれこれ" />
      <BlogLayout>
        <BlogLayoutBody>
          <ArticleTitle text={`記事一覧 　${router.query.pageNum}ページ目`} />
          <ul css={postLists}>
            {data.map((post: PostDataType) => (
              <PostArchive key={post.id} post={post} /> // 最新ページから取り出した一覧記事
            ))}
          </ul>
          <BasicPagination totalCount={totalCount} />
        </BlogLayoutBody>
        <AsideArchive categoryData={categoryData} />
      </BlogLayout>
    </>
  )
}

export default PostPage

// css
const postLists = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  ${mediaQuery[2]} {
    gap: 10px;
  }
`
