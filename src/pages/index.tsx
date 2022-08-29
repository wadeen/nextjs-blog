/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import type { GetStaticProps } from 'next'
import { client } from 'libs/client'
import PostSingle from 'src/components/organisms/Post/PostSingle'
import { micrcmsData } from 'types/micrcmsData'

const Home = ({ data }: { data: micrcmsData[] }) => {
  return (
    <div css={article}>
      <div css={main}>
        {data.map((post: micrcmsData) => (
          // 最新ページから取り出した一覧記事
          <PostSingle key={post.id} post={post} />
        ))}
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
  background-color: tomato;
  display: flex;
  column-gap: 30px;
`

const main = css`
  background-color: aqua;
  width: calc(100% - 280px);
`

const aside = css`
  background-color: orange;
  width: 250px;
`
