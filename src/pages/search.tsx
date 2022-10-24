/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ReactLoading from 'react-loading'
import useSWR from 'swr'
import { MicrocmsApi } from '../../types/microcmsApi'
import { MicrocmsData } from '../../types/microcmsData'
import ArticleTitle from '../components/atoms/articleTitle/ArticleTitle'
import AsideArchive from '../components/templates/aside/AsideArchive'
import Failed from 'src/components/atoms/Failed'
import Seo from 'src/components/molecules/Seo'
import PostArchive from 'src/components/organisms/post/PostArchive'
// import { BasicPagination } from 'src/components/organisms/pagination/BasicPagination'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBase'
import { mediaQuery } from 'src/utils/Breakpoints'

const fetcher = (url: string, value: string): Promise<any> => {
  return fetch(`${url}?keyword=${value}`).then((res) => res.json())
}

const Search: NextPage = () => {
  const router = useRouter()

  // apiでの検索結果を取得
  const { data, error } = useSWR<MicrocmsApi>(
    ['/api/search', router.query.keyword],
    fetcher
  )

  if (error) return <Failed text={'検索に失敗しました。'} />
  if (!data)
    return (
      <BlogLayout>
        <BlogLayoutBody>
          <p css={loadingIcon}>
            <ReactLoading type="spinningBubbles" color={'#1976D2'} />
          </p>
        </BlogLayoutBody>
        <AsideArchive />
      </BlogLayout>
    )

  return (
    <BlogLayout>
      <Seo ogpTitle={`${router.query.keyword} の検索結果`} />
      <BlogLayoutBody>
        <ArticleTitle text={`"${router.query.keyword}" の検索結果`} />
        {/* 検索記事の有無を判定 */}
        {data.contents.length === 0 ? (
          <div css={notPost}>
            <p>[{router.query.keyword}]に関する記事はありませんでした。</p>
            <Link href="/">
              <a>記事一覧へ戻る</a>
            </Link>
          </div>
        ) : (
          <ul css={postLists}>
            {data.contents.map((post: MicrocmsData) => (
              <PostArchive key={post.id} post={post} />
            ))}
          </ul>
        )}
        {/* ページネーションは v1.2 ~で実装 */}
        {/* <BasicPagination totalCount={totalCount} /> */}
      </BlogLayoutBody>
      <AsideArchive />
    </BlogLayout>
  )
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
