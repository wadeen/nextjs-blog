/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { mediaQuery } from '../../utils/Breakpoints'

const Header: NextPage = () => {
  const router = useRouter()

  const [scrollHeight, setScrollHeight] = useState(false) // 基準高さでクラス付与
  const [isPost, setIsPost] = useState(false) // 投稿ページのみ戻るボタンあり

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let height = window.pageYOffset
      height > 100 ? setScrollHeight(true) : setScrollHeight(false)
    })
  }, [scrollHeight])

  useEffect(() => {
    router.pathname === '/posts/[id]' ? setIsPost(true) : setIsPost(false)
  }, [router])

  return (
    <>
      <header css={header}>
        <div css={headerTop} className={scrollHeight ? 'is-hide' : ''}>
          {router.pathname === '/' ? (
            <h1>
              <Image
                src="/images/star.svg"
                width={60}
                height={60}
                alt=""
                className="starIcon"
              />
              <Link href="/">
                <a>ウェブのあれこれ</a>
              </Link>
            </h1>
          ) : (
            <h2>
              <Image
                src="/images/star.svg"
                width={60}
                height={60}
                alt=""
                className="starIcon"
              />
              <Link href="/">
                <a>ウェブのあれこれ</a>
              </Link>
            </h2>
          )}
        </div>
        <div css={headerBottom}>
          <ul css={headerBottomWrapper}>
            <li>
              <Link href="/">
                <a
                  title="ブログページ"
                  className={
                    router.pathname === '/' ||
                    router.pathname.startsWith('/posts') ||
                    router.pathname.startsWith('/category/[id]') ||
                    router.pathname.startsWith('/search')
                      ? 'is-current'
                      : ''
                  }
                >
                  Blog
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a
                  title="自己紹介"
                  className={
                    router.pathname.startsWith('/about') ? 'is-current' : ''
                  }
                >
                  About me
                </a>
              </Link>
            </li>
            <li>
              <Link href="/strage">
                <a
                  title="アプリ倉庫"
                  className={
                    router.pathname.startsWith('/strage') ? 'is-current' : ''
                  }
                >
                  App strage
                </a>
              </Link>
            </li>
          </ul>
          {isPost && (
            <button
              css={back}
              aria-label="戻る"
              type="button"
              onClick={() => {
                router.push('/')
                // router.back() // 投稿記事：外部流入に対応できないため使用しない予定
              }}
            >
              <Image
                src="/images/icon/back.svg"
                width={50}
                height={50}
                alt="前のページへ戻る"
              />
            </button>
          )}
        </div>
      </header>
    </>
  )
}
export default Header

// css
const header = css`
  width: 100%;
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0px 2px 15px 2px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 10;
`

const headerTop = css`
  width: min(100%, 1200px);
  margin: 0 auto;
  height: 100px;
  position: relative;
  transition: margin-top 0.3s ease;
  ${mediaQuery[1]} {
    height: 60px;
  }
  &.is-hide {
    margin-top: -100px;
    ${mediaQuery[1]} {
      margin-top: -60px;
    }
  }
  h1,
  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-weight: 500;
    font-size: 3.4rem;
    font-family: 'Nikukyu', sans-serif;
    margin: 0 auto;
    line-height: 90px;
    padding: 0 30px;
    ${mediaQuery[1]} {
      font-size: 2.6rem;
      line-height: 60px;
    }
    .starIcon {
      ${mediaQuery[1]} {
        transform: scale(0.6) translateX(20px);
      }
    }
    a {
      transition: opacity 0.3s ease;
      &:hover {
        opacity: 0.85;
      }
    }
  }
`

const headerBottom = css`
  height: 45px;
  border-top: 1px solid var(--cBorder);
  border-bottom: 1px solid var(--cBorder);
  background-color: #fff;
  position: relative;
  ${mediaQuery[1]} {
    height: 40px;
  }
`

const headerBottomWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(100%, 1200px);
  margin: 0 auto;
  padding: 0 30px;
  height: 100%;
  ${mediaQuery[1]} {
    padding: 0 50px;
  }
  li {
    width: 200px;
    border-left: 1px solid var(--cBorder);
    height: 100%;
    text-align: center;
    line-height: 45px;
    ${mediaQuery[1]} {
      font-size: 1.4rem;
      line-height: 40px;
    }
    &:last-child {
      border-right: 1px solid var(--cBorder);
    }
    a {
      display: block;
      width: 100%;
      height: 100%;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: var(--cBorder);
        color: #fff;
        ${mediaQuery[2]} {
          background-color: #fff;
          color: #333;
        }
      }
      // カレントページの時にマーキング
      &.is-current {
        color: red;
        pointer-events: none;
        text-decoration: underline;
        ${mediaQuery[2]} {
          background-color: var(--cBorder);
          color: #fff;
        }
      }
    }
  }
`

const back = css`
  position: absolute;
  top: 46%;
  left: calc(50% - 370px);
  transform: translate(-50%, -50%);
  height: 43px;
  transition: opacity 0.3s ease;
  ${mediaQuery[2]} {
    left: calc(50% - 340px);
  }
  ${mediaQuery[1]} {
    transform: scale(0.8);
    top: -4px;
    left: 0;
  }
  &:hover {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.1);
    ${mediaQuery[1]} {
      opacity: 1;
      transform: scale(0.8);
    }
  }
  img {
    height: 100%;
  }
`
