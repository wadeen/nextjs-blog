/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import { AiOutlineFolder } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import { GrUpdate } from 'react-icons/gr'
import { mediaQuery } from 'src/utils/Breakpoints'
import { dateToString } from 'src/utils/dateToString'
import { MicrocmsData } from 'types/microcmsData'

const PostArchive: NextPage<{ post: MicrocmsData }> = ({ post }) => {
  return (
    <li css={list}>
      <Link href={`/posts/${post.id}`} prefetch={false}>
        <a css={link}>
          <div css={postView}>
            <img
              css={eyecatch}
              src={post.eyecatch.url}
              alt="アイキャッチアイコン"
            />
            <h2 css={textTitle}>{post.title}</h2>
          </div>
          <ul css={info}>
            <li>
              <span css={icon}>
                {post.updated_at ? (
                  <IconContext.Provider value={{ size: '11px' }}>
                    <GrUpdate style={{ marginRight: '4px' }} />
                  </IconContext.Provider>
                ) : (
                  <BiTimeFive />
                )}
              </span>
              {
                // 更新日がない場合は作成日を表示
                dateToString(post.updated_at || post.created_at, 'YYYY/MM/DD')
              }
            </li>
            <li>
              <span css={icon}>
                <AiOutlineFolder />
              </span>
              {post.category.name}
            </li>
          </ul>
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
  min-height: 123px;
  transition: opacity 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--cBorder);
  padding: 15px;
  ${mediaQuery[2]} {
    width: calc((100% - 10px) / 2);
  }
  ${mediaQuery[1]} {
    width: 100%;
  }
  &:hover {
    box-shadow: 2px 3px 10px 2px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--cSub);
    opacity: 0.85;
  }
`

const link = css`
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const postView = css`
  display: flex;
  align-items: center;
  gap: 10px;
  height: calc(100% - 20px);
`

const eyecatch = css`
  width: 72px;
  height: 72px;
  ${mediaQuery[2]} {
    width: 64px;
    height: 64px;
  }
  ${mediaQuery[1]} {
    width: 56px;
    height: 56px;
  }
`

const textTitle = css`
  font-size: 2.2rem;
  letter-spacing: 0.02em;
  line-height: 1.3;
  font-weight: 700;
  font-feature-settings: 'palt';
  font-family: var(--fontMain);
  ${mediaQuery[1]} {
    font-size: 1.8rem;
  }
`
const info = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 15px;
  margin-top: 6px;
  li {
    font-size: 1.4rem;
    display: flex;
    align-items: center;
  }
`

const icon = css`
  margin-right: 5px;
`
