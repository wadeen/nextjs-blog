/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import FolderCopyIcon from '@mui/icons-material/FolderCopy'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import UpdateIcon from '@mui/icons-material/Update'
import cheerio from 'cheerio'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import hljs from 'highlight.js'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { renderToc } from '../../../../libs/render-toc'
import { stateToc } from '../../../store/stateToc'
import Seo from '../../Seo'
import { TableOfContents } from '../../molecules/TableOfContents'
import { mq } from 'src/components/Breakpoints'
import { microcmsData } from 'types/microcmsData'
import 'highlight.js/styles/hybrid.css'

const PostSingle = ({ post }: { post: microcmsData }) => {
  const [toc, setToc] = useRecoilState(stateToc) // Recoil

  // 日時調整
  dayjs.extend(utc)
  dayjs.extend(timezone)

  // pre > code シンタックスハイライト
  const contentBody = cheerio.load(post.content) // eslint-disable-line
  contentBody('pre code').each((_, elm) => {
    const result = hljs.highlightAuto(contentBody(elm).text())
    contentBody(elm).html(result.value)
    contentBody(elm).addClass('hljs')
  })

  //目次
  useEffect(() => {
    // @ts-ignore ✋
    setToc(renderToc(post.content))
  }, [setToc, post.content])

  return (
    <>
      <Seo
        //自動OGP生成をする(v1.1 ~)🌟
        ogpImage="https://placehold.jp/3d4070/ffffff/1200x630.png"
        ogpTitle={post.title}
        ogpDescription={
          post.description ||
          'これはブログ記事です。〜ディスクリプション未記入時に表示されます。〜'
        }
      />
      <div css={container}>
        <h1 css={title}>
          <img src={post.eyecatch.url} alt="アイキャッチアイコン" />
          {post.title}
        </h1>
        <p css={category}>
          <Link href={`/category/${post.category.id}`}>
            <a>
              <FolderCopyIcon />
              カテゴリ: {post.category.name}
            </a>
          </Link>
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

        {post.toc_visible && <TableOfContents />}
        <div
          dangerouslySetInnerHTML={{ __html: contentBody.html() }}
          css={content}
        ></div>
      </div>
    </>
  )
}

export default PostSingle

const container = css`
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  ${mq[1]} {
    padding: 20px 10px;
    position: relative;
  }
`

const title = css`
  font-size: 3rem;
  letter-spacing: 0.04em;
  font-weight: 700;
  line-height: 1.4;
  display: flex;
  align-items: center;
  font-feature-settings: 'palt';
  font-family: var(--fontMain);
  ${mq[1]} {
    font-size: 2.2rem;
  }
  img {
    width: 60px;
    height: 60px;
    margin-right: 15px;
    ${mq[1]} {
      width: 72px;
      height: 72px;
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 0;
    }
  }
`

const category = css`
  font-size: 1.4rem;
  text-align: right;
  margin-top: 10px;
  a {
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 0.7;
    }
  }
`

const dateList = css`
  display: flex;
  column-gap: 20px;
  margin-top: 10px;
  justify-content: flex-end;
  border-bottom: 1px dashed var(--cBorder);
  padding-bottom: 20px;
  ${mq[1]} {
    flex-direction: column;
    gap: 3px 0;
    text-align: right;
  }
  li {
    font-size: 1.4rem;
  }
`

//  ブログ記事中身
const content = css`
  margin: 40px 0;
  font-size: 1.6rem;
  letter-spacing: 0.06em;
  line-height: 1.6;
  font-feature-settings: 'palt';
  font-family: var(--fontMain);
  overflow-wrap: break-word;

  h2 {
    font-size: 3rem;
    background-color: whitesmoke;
    padding-left: 10px;
    border-left: 7px solid var(--cSub);
    font-weight: 700;
    margin: 10px 0 20px;
    line-height: 2;
    scroll-margin-top: 80px;
    ${mq[1]} {
      font-size: 2.2rem;
      scroll-margin-top: 45px;
      line-height: 1.4;
      padding: 8px 0 8px 10px;
      border-left: 5px solid var(--cSub);
    }
  }

  h3 {
    font-size: 2.6rem;
    font-weight: 700;
    border-bottom: 1px dashed var(--cSub);
    margin: 10px 0 20px;
    scroll-margin-top: 80px;
    ${mq[1]} {
      font-size: 2.2rem;
      scroll-margin-top: 45px;
    }
  }

  h4 {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 10px 0 20px;
    ${mq[1]} {
      font-size: 2rem;
    }
  }

  h5 {
    font-size: 2rem;
    font-weight: 700;
    ${mq[1]} {
      font-size: 1.8rem;
    }
  }

  iframe {
    text-align: center;
    margin: 20px auto;
    width: 100%;
    height: 100%;
    min-height: 450px;
    display: flex;
    align-items: center;
    ${mq[1]} {
      min-height: 350px;
    }
    ${mq[0]} {
      min-height: 250px;
    }
  }

  sub {
    display: inline-block;
    font-size: 1.4rem;
    background: #e9e7e7;
    color: #000;
    padding: 15px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    bottom: -20px;
    font-weight: 500;
    font-family: var(--fontEn);
  }

  img {
    width: 100%;
    margin: 20px 0;
  }

  pre {
    margin: 20px 0;
  }

  blockquote {
    display: block;
    background-color: #f7faf9;
    padding: 40px;
    border-radius: 6px;
    margin: 20px 0;
    position: relative;
    color: #848484;
    height: 100%;
    &::before {
      content: '“';
      font-family: var(--fontEn);
      font-size: 6rem;
      font-weight: 500;
      position: absolute;
      top: 0;
      left: 10px;
    }
    &::after {
      content: '”';
      font-family: var(--fontEn);
      font-size: 6rem;
      font-weight: 500;
      position: absolute;
      right: 10px;
      bottom: -50px;
    }
  }

  ul {
    border: 1px solid #e2943a;
    padding: 30px;
    border-radius: 6px;
    margin: 20px 0;
    ${mq[1]} {
      padding: 20px;
    }
    li {
      font-weight: 500;
      padding-left: 1em;
      text-indent: -1em;
      &::before {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        background-color: #e2943a;
        border-radius: 50%;
        margin-right: 12px;
      }
      &:first-of-type {
        font-size: 2rem;
        font-weight: 700;
        color: #e2943a;
        margin-bottom: 15px;
        border-bottom: 1px dashed #e2943a;
        ${mq[1]} {
          font-size: 1.8rem;
          padding-bottom: 5px;
        }
        &::before {
          display: none;
        }
      }
    }
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
