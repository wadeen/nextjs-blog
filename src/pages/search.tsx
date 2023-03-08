/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ReactLoading from 'react-loading'
import useSWR from 'swr'
import { PostDataType } from '../../types/PostDataType'
import { MicrocmsApi } from '../../types/microcmsApi'
import { MicrocmsData } from '../../types/microcmsData'
import ArticleTitle from '../components/atoms/articleTitle/ArticleTitle'
import AsideArchive from '../components/templates/aside/AsideArchive'
import fetchAsideCategory from './api/fetchAsideCategory'
import fetchZennData from './api/fetchZennData'
import Failed from 'src/components/atoms/Failed'
import Seo from 'src/components/molecules/Seo'
import PostArchive from 'src/components/organisms/post/PostArchive'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBase'
import { mediaQuery } from 'src/utils/Breakpoints'
import { dateToString } from 'src/utils/dateToString'
import { CategoryCountAndPost } from 'types/CategoryCountAndPost'

// SSG
export const getStaticProps: GetStaticProps = async () => {
  // サイドバーのカテゴリ
  const categoryData = await fetchAsideCategory()

  return {
    props: {
      categoryData,
    },
  }
}

const fetcher = (url: string, value: string): Promise<any> => {
  return fetch(`${url}?keyword=${value}`).then((res) => res.json())
}

const Search = ({ categoryData }: { categoryData: CategoryCountAndPost[] }) => {
  const router = useRouter()

  // apiでの検索結果を取得
  const { data, error } = useSWR<MicrocmsApi>(
    ['api/search', router.query.keyword],
    fetcher
  )

  if (error) {
    console.log(error)
    return (
      <BlogLayout>
        <BlogLayoutBody>
          <Failed text={'検索に失敗しました。'} />
        </BlogLayoutBody>
        <AsideArchive categoryData={categoryData} />
      </BlogLayout>
    )
  }

  if (!data) {
    return (
      <BlogLayout>
        <BlogLayoutBody>
          <div css={loadingIcon}>
            <ReactLoading type="spinningBubbles" color={'#1976D2'} />
          </div>
        </BlogLayoutBody>
        <AsideArchive categoryData={categoryData} />
      </BlogLayout>
    )
  }

  if (data) {
    const postData = data.contents.map((item: MicrocmsData) => {
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

    return (
      <BlogLayout>
        <Seo ogpTitle={`${router.query.keyword} の検索結果`} />
        <BlogLayoutBody>
          <ArticleTitle text={`"${router.query.keyword}" の検索結果`} />
          {/* 検索記事の有無を判定 */}
          {postData.length === 0 ? (
            <div css={notPost}>
              <p>{router.query.keyword} に関する記事はありませんでした。</p>
              <Link href="/">記事一覧へ戻る</Link>
            </div>
          ) : (
            <ul css={postLists}>
              {postData.map((post: PostDataType) => (
                <PostArchive key={post.id} post={post} />
              ))}
            </ul>
          )}
        </BlogLayoutBody>
        <AsideArchive categoryData={categoryData} />
      </BlogLayout>
    )
  }
}

export default Search

// css
const postLists = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  ${mediaQuery[2]} {
    gap: 10px;
  }
`

const loadingIcon = css`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const notPost = css`
  margin-top: 60px;
  p {
    margin-bottom: 30px;
  }
  a {
    color: var(--cLink);
    text-decoration: underline;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 0.8;
    }
  }
`
