/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { memo } from 'react'
import Parser from 'rss-parser'
import ArticleTitle from '../components/atoms/articleTitle/ArticleTitle'
import Seo from '../components/molecules/Seo'
import { client } from 'libs/client'
import { BasicPagination } from 'src/components/organisms/pagination/BasicPagination'
import PostArchive from 'src/components/organisms/post/PostArchive'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBase'
import AsideArchive from 'src/components/templates/aside/AsideArchive'
import { mediaQuery } from 'src/utils/Breakpoints'
import { dateToString } from 'src/utils/dateToString'
import { PostDataType } from 'types/PostDataType'
import { ZennPostType } from 'types/ZennPostType'
import { MicrocmsApi } from 'types/microcmsApi'
import { MicrocmsData } from 'types/microcmsData'
import zennLogo from '/public/images/icon/zenn_logo.png'

const zennId = 'wadeen'

// SSG
export const getStaticProps: GetStaticProps = async () => {
  const microcmsData = await client.get<MicrocmsApi>({
    endpoint: 'posts',
    queries: { limit: 6 },
  })

  // microCMS
  const postData: PostDataType[] = microcmsData.contents.map(
    (item: MicrocmsData) => {
      const createdAt = dateToString(item.createdAt, 'YYYY/MM/DD')
      const updatedAt = dateToString(item.updatedAt, 'YYYY/MM/DD')
      console.log('createdAt: ', createdAt)
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
    }
  )

  const parser: Parser<unknown, ZennPostType> = new Parser({
    customFields: {
      item: [
        'creator',
        'title',
        'pubDate',
        'link',
        'isoDate',
        'guid',
        'enclosure',
        'creator',
        'contentSnippet',
        'content',
      ],
    },
  })

  const { items } = await parser.parseURL(
    `https://zenn.dev/${zennId}/feed?all=1`
  )

  const zennPostData = items.map((item: ZennPostType) => {
    const createdAt = dateToString(item.pubDate, 'YYYY/MM/DD')
    return {
      id: item.link,
      title: item.title,
      content: item.content,
      createdAt,
      eyecatch: zennLogo.src,
      categoryName: 'Zenn',
      categoryId: 'Zenn',
      isZenn: true,
      description: '', // 詳細ページないため不要
      updatedAt: '', // 詳細ページないため不要(一覧ページも投稿日のみでOK)
    }
  })

  const data = [...postData, ...zennPostData]

  // データの並び替え: 投稿日順
  data.sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : 1
  })

  return {
    props: {
      data,
      totalCount: microcmsData.totalCount,
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
