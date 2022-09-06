/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import FolderCopyIcon from '@mui/icons-material/FolderCopy'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import UpdateIcon from '@mui/icons-material/Update'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { NextPage } from 'next'
import Link from 'next/link'
import { mq } from 'src/components/Breakpoints'
import { MicrocmsData } from 'types/microcmsData'

const PostArchive: NextPage<{ post: MicrocmsData }> = ({ post }) => {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  return (
    <li css={list}>
      <Link href={`/posts/${post.id}`}>
        <a css={link}>
          <img
            css={eyecatch}
            src={post.eyecatch.url}
            alt="アイキャッチアイコン"
          />
          <div css={textList}>
            <h2>{post.title}</h2>
            <ul css={info}>
              <li>
                <span css={icon}>
                  {post.update ? <UpdateIcon /> : <QueryBuilderIcon />}
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
        </a>
      </Link>
    </li>
  )
}

export default PostArchive

// css
const list = css`
  background-color: #fff;
  border-radius: 8px;
  width: calc((100% - 20px) / 2);
  position: relative;
  min-height: 123px;
  transition: opacity 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--cBorder);
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.05);
  ${mq[2]} {
    width: calc((100% - 10px) / 2);
  }
  ${mq[1]} {
    width: 100%;
  }
  &:hover {
    box-shadow: 2px 3px 10px 2px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--cSub);
    opacity: 0.85;
  }
`

const link = css`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 20px 35px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  ${mq[2]} {
    padding: 15px 15px 35px;
  }
`

const eyecatch = css`
  width: 72px;
  height: 72px;
  ${mq[2]} {
    width: 64px;
    height: 64px;
  }
  ${mq[1]} {
    width: 56px;
    height: 56px;
  }
`

const textList = css`
  h2 {
    font-size: 2.2rem;
    letter-spacing: 0.02em;
    line-height: 1.3;
    font-weight: 700;
    font-feature-settings: 'palt';
    font-family: var(--fontMain);
    ${mq[1]} {
      font-size: 1.8rem;
    }
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
