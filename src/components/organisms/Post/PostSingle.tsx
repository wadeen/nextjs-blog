/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import FolderCopyIcon from '@mui/icons-material/FolderCopy'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { micrcmsData } from 'types/micrcmsData'

const PostSingle = ({ post }: { post: micrcmsData }) => {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  console.log(post.title.length)

  return (
    <li css={list}>
      <p css={eyecatch}>{post.eyecatch}</p>
      <div css={textList}>
        <h2>{post.title}</h2>
        <ul css={info}>
          <li>
            <span css={icon}>
              <QueryBuilderIcon />
            </span>
            {dayjs
              // 更新日ない場合は作成日を表示
              .utc(post.update || post.date)
              .tz('Asia/Tokyo')
              .format('YYYY/MM/DD')}
          </li>
          <li>
            <span css={icon}>
              <FolderCopyIcon />
            </span>
            {post.category.name}
          </li>
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
  padding: 20px 20px 35px;
  column-gap: 20px;
  position: relative;
  min-height: 123px;
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
  display: flex;
  align-items: center;
  column-gap: 15px;
  position: absolute;
  bottom: 6px;
  right: 10px;
  li {
    font-size: 1.4rem;
  }
`

const icon = css`
  margin-right: 5px;
`
