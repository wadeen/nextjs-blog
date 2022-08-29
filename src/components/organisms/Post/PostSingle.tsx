/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import FolderCopyIcon from '@mui/icons-material/FolderCopy'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import UpdateIcon from '@mui/icons-material/Update'
// import cheerio from 'cheerio'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
// import hljs from 'highlight.js'
import { microcmsData } from 'types/microcmsData'

const PostSingle = ({ post }: { post: microcmsData }) => {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  return (
    <div css={container}>
      <h1 css={title}>
        <img src={post.eyecatch.url} alt="アイキャッチアイコン" />
        {post.title}
      </h1>
      <p css={category}>
        <FolderCopyIcon />
        カテゴリ: {post.category.name}
      </p>
      <ul css={dateList}>
        <li>
          <QueryBuilderIcon />
          作成日：{dayjs.utc(post.date).tz('Asia/Tokyo').format('YYYY/MM/DD')}
        </li>
        {post.update && (
          <li>
            <UpdateIcon />
            更新日：
            {dayjs.utc(post.update).tz('Asia/Tokyo').format('YYYY/MM/DD')}
          </li>
        )}
      </ul>
      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        css={content}
      ></div>
    </div>
  )
}

export default PostSingle

const container = css`
  background-color: #fff;
  border-radius: 8px;
  padding: 30px 30px 80px;
`

const title = css`
  font-size: 3rem;
  letter-spacing: 0.04em;
  font-weight: 700;
  display: flex;
  align-items: center;
  img {
    width: 60px;
    height: 60px;
    margin-right: 15px;
  }
`

const category = css`
  font-size: 1.4rem;
  text-align: right;
  margin-top: 20px;
`

const dateList = css`
  display: flex;
  column-gap: 20px;
  margin-top: 10px;
  justify-content: flex-end;
  li {
    font-size: 1.4rem;
  }
`

const content = css`
  border-top: 1px dashed var(--cBorder);
  margin: 30px 0;
  padding: 30px 0;
  font-size: 1.6rem;
  letter-spacing: 0.06em;
  line-height: 1.4;
  font-feature-settings: 'palt';
  img {
    width: 100%;
    margin: 20px 0;
  }
`
