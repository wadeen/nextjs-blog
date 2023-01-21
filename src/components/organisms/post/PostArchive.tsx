/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import { AiOutlineFolder } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import { GrUpdate } from 'react-icons/gr'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { mediaQuery } from 'src/utils/Breakpoints'
import { PostDataType } from 'types/PostDataType'

const PostArchive: NextPage<{ post: PostDataType }> = ({ post }) => {
  return (
    <li css={list} className={post.isZenn ? 'isZenn' : ''}>
      <Link
        href={post.isZenn ? post.id : `/posts/${post.id}`}
        target={post.isZenn ? '_blank' : '_self'}
        css={link}
      >
        <div css={postView}>
          <img
            css={eyecatchIcon}
            /* ToDo: Zennの記事は`Zennカテゴリ`を作成してフィルタリングできるようにする = その後エラー解決する */ // @ts-ignore
            src={post.eyecatch.url || post.eyecatch}
            // src={post.eyecatch}
            alt="アイキャッチアイコン"
          />
          <h2 css={textTitle}>{post.title}</h2>
        </div>
        <ul css={info}>
          <li>
            <span css={icon}>
              {post.updatedAt ? (
                <IconContext.Provider value={{ size: '11px' }}>
                  <GrUpdate style={{ marginRight: '4px' }} />
                </IconContext.Provider>
              ) : (
                <BiTimeFive />
              )}
            </span>
            {/* 更新日がない場合は作成日を表示 */}
            {post.updatedAt || post.createdAt}
          </li>
          <li>
            <span css={icon}>
              {post.isZenn ? <HiOutlineExternalLink /> : <AiOutlineFolder />}
            </span>
            {post.categoryName}
          </li>
        </ul>
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

  // Zennの記事
  &.isZenn {
    background-color: rgba(46, 255, 248, 0.4);
    border-color: #50905a;
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

const eyecatchIcon = css`
  width: 72px;
  height: 72px;
  border-radius: 50%;
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
