/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace' // ✋
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import useSWR from 'swr'
import { microcmsData } from '../../types/microcmsData'
import ArticleTitle from '../components/atoms/articleTitle/ArticleTitle'
import AsideArchive from '../components/templates/aside/AsideArchive'
import { searchState } from '../store/searchState'
import { BasicPagination } from 'src/components/organisms/pagination/BasicPagination'
import PostArchive from 'src/components/organisms/post/PostArchive'
import BlogLayout from 'src/components/templates/BlogLayout'
import BlogLayoutBody from 'src/components/templates/BlogLayoutBase'

const fetcher = (url: string, value: string): any => {
  //✋ any
  return fetch(`${url}?keyword=${value}`).then((res) => res.json())
}

const Search = () => {
  const router = useRouter()

  // apiから検索結果の受け取り
  const { data, error } = useSWR<EmotionJSX.Element | undefined>( //✋ any
    ['/api/search', router.query.keyword],
    fetcher
  )

  if (error) return <div>failed to load</div>
  // if (!data)
  return (
    <>
      <BlogLayout>
        <BlogLayoutBody>
          <ArticleTitle text={`"${router.query.keyword}" の検索結果`} />
          <ul css={postLists}>
            {/* @ts-ignore ✋ */}
            {data.map((post: microcmsData) => (
              <PostArchive key={post.id} post={post} /> // 最新ページから取り出した記事
            ))}
          </ul>
          {/* <BasicPagination totalCount={totalCount} /> */}
        </BlogLayoutBody>
        <AsideArchive />
      </BlogLayout>
    </>
  )
}

export default Search

// css
const postLists = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`
