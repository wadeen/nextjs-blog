/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { micrcmsData } from 'types/micrcmsData'
const PostSingle = ({ post }: { post: micrcmsData }) => {
  return (
    <li css={list}>
      <p css={eyecatch}>{post.eyecatch}</p>
      <div css={textList}>
        <h2>{post.title}</h2>
        <ul css={info}>
          <li>{post.update || post.date}</li>
          <li>{post.category.name}</li>
        </ul>
      </div>
    </li>
  )
}

export default PostSingle

const list = css`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  width: calc((100% - 30px) / 2);
  padding: 20px;
  column-gap: 20px;
`

const eyecatch = css`
  font-size: 4rem;
`

const textList = css`
  h2 {
    font-size: 2.6rem;
    letter-spacing: 0.02em;
    line-height: 1.3;
    font-weight: 700;
  }
`


const info = css`
  
`;