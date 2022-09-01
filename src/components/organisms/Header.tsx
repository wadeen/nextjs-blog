/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Header: NextPage = () => {
  const router = useRouter()

  const [scrollHeight, setScrollHeight] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let height = window.pageYOffset
      height > 100 ? setScrollHeight(true) : setScrollHeight(false)
    })
  }, [scrollHeight])

  return (
    <>
      <header css={header}>
        {/* @ts-ignore */}
        <div css={headerTop} className={scrollHeight && 'is-hide'}>
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
                    router.pathname.startsWith('/posts')
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
        </div>
      </header>
    </>
  )
}
export default Header

const header = css`
  width: 100%;
  /* height: 145px; */
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
  transition: margin-top .3s ease;
  &.is-hide {
    margin-top: -100px;
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
    .starIcon {
      right: 120px;
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
`

const headerBottomWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(100%, 1200px);
  margin: 0 auto;
  padding: 0 30px;
  height: 100%;
  li {
    width: 200px;
    border-left: 1px solid var(--cBorder);
    height: 100%;
    text-align: center;
    line-height: 45px;
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
      }
      // カレントページの時にマーキング
      &.is-current {
        color: red;
        pointer-events: none;
        text-decoration: underline;
      }
    }
  }
`
