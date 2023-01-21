/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios'
import type {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
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
import { PostDataType } from 'types/PostDataType'
import { ZennPostType } from 'types/ZennPostType'
import { MicrocmsData } from 'types/microcmsData'
import zennLogo from '/public/images/icon/zenn_logo.png'

const zennId = 'wadeen'

// SSG
export const getStaticProps: GetStaticProps = async () => {
  const microCmsData = await client.get({
    endpoint: 'posts',
    queries: { limit: 6 },
  })

  // microCMS
  const postData: PostDataType[] = microCmsData.contents.map(
    (item: MicrocmsData) => {
      return {
        id: item.id,
        title: item.title,
        content: item.content,
        description: item.description,
        categoryId: item.category.id,
        categoryName: item.category.name,
        updatedAt: item.updatedAt,
        createdAt: item.createdAt,
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

  console.log('items: ', `https://zenn.dev/${zennId}/feed?all=1`)

  const zennPostData = items.map((item: ZennPostType) => {
    return {
      id: item.link,
      title: item.title,
      content: item.content,
      createdAt: item.pubDate,
      eyecatch: zennLogo.src,
      categoryName: 'Zenn',
      categoryId: 'Zenn',
      isZenn: true,
      description: null, // 詳細ページないため不要
      updatedAt: null, // 詳細ページないため不要(一覧ページも投稿日のみでOK)
    }
  })

  const data = [...postData, ...zennPostData]

  return {
    props: {
      data: data,
      totalCount: microCmsData.totalCount,
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
