/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import type { GetStaticProps } from 'next'
import { client } from 'libs/client'
import PostSingle from 'src/components/organisms/Post/PostSingle'
import { microcmsData } from 'types/microcmsData'

const Home = ({ data }: { data: microcmsData[] }) => {
  return (
    <div css={article}>
      <div css={main}>
        <ul css={postLists}>
          {data.map((post: microcmsData) => (
            // 最新ページから取り出した一覧記事
            <PostSingle key={post.id} post={post} />
          ))}
        </ul>
      </div>
      <div css={aside}>サイドバー</div>
    </div>
  )
}

export default Home

// SSG
export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({
    endpoint: 'posts',
  })
  return {
    props: {
      data: data.contents,
    },
  }
}

// css
const article = css`
  display: flex;
  column-gap: 30px;
`

const main = css`
  width: calc(100% - 280px);
`

const aside = css`
  background-color: orange;
  width: 250px;
`

const postLists = css`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`
