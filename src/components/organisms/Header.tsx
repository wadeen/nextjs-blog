/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Header: NextPage = () => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/earlyaccess/nikukyu.css"
          rel="stylesheet"
        />
      </Head>
      <div css={header}>
        <div css={headerTop}>
          <h1>
            <Link href="/">
              <a>ウェブのあれこれ</a>
            </Link>
          </h1>
          {/* <p>
            <img src="chrara.png" alt="" />
          </p> */}
        </div>
        <div css={headerBottom}>
          <ul css={headerBottomWrapper}>
            <li>
              <Link href="/">
                <a title="ブログページ">Blog</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a title="自己紹介">About me</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a title="アプリ倉庫">App strage</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
export default Header

const header = css`
  width: 100%;
  height: 140px;
`

const headerTop = css`
  height: 90px;
  background-color: #fff;
  h1 {
    display: flex;
    height: 100%;
    font-weight: 500;
    font-size: 3.4rem;
    font-family: 'Nikukyu';
    width: min(100%, 1200px);
    margin: 0 auto;
    line-height: 80px;
    padding: 0 30px;
    a {
      transition: opacity 0.3s ease;
      &:hover {
        opacity: 0.85;
      }
    }
  }
`

const headerBottom = css`
  height: 50px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  background-color: #fff;
  box-shadow: 0px 2px 15px -5px rgba(0, 0, 0, 0.1);
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
    border-left: 1px solid gray;
    height: 100%;
    text-align: center;
    line-height: 48px;
    &:last-child {
      border-right: 1px solid gray;
    }
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
`
