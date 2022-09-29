/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import Image from 'next/image'
import { mediaQuery } from 'src/utils/Breakpoints'
import Seo from 'src/utils/Seo'
const About: NextPage = () => {
  return (
    <>
      <Seo ogpTitle="自己紹介 | Webのあれこれ" />
      <div css={container}>
        <h1>~ About me ~</h1>
        {/* プロフィール欄 */}
        <div css={profile}>
          <div css={wrapper}>
            <p css={imgBox}>
              <Image
                src="/images/profile/me.jpeg"
                width={1200}
                height={1200}
                alt="わでぃんのプロフィール写真"
                className="chara"
              />
            </p>
            <p css={imgBox}>
              <Image
                src="/images/profile/chara.png"
                width={1200}
                height={1200}
                alt="わでぃんのプロフィールアイコン画像"
              />
            </p>
          </div>

          <div css={profileText}>
            <p>わでぃん</p>
            <p>
              25歳のフリーランスWeb制作コーダー。
              <br />
              フロントエンド志望のため、Reactを中心にモダンJavaScriptを学習中です。
              <br />
              年内にフロントエンドエンジニアとして働くことを目標にしています。色々な現場を経験して成長/貢献していきたいと思っています。
              <br />
              将来的には個人開発のWebアプリをリリースし、多くの人に使ってもらうことが夢です。
            </p>
          </div>
        </div>

        {/* スキル */}
        <div css={box}>
          <h2>スキル</h2>
          <p className="subtitle">【言語 / フレームワーク】</p>
          <p>
            HTML (EJS) / CSS (Sass) / JavaScript (jQuery , TypeScript , React ,
            Next.js)
          </p>
          <br />
          <p className="subtitle">【その他】</p>
          <p>
            WorsPress /Git / GitHub / GitHub Actions / Gulp/ Webpack /
            Firebase（CloudFirestore , Authentication , Hosting）
          </p>
        </div>

        {/* 経歴 */}
        <div css={box}>
          <h2>経歴</h2>
          <p>
            九州の某工業高校を卒業後、都内にある業界最大手のインフラ系の会社に5年間勤務。
            <br />
            在職中は合格率10%台の難関国家資格を取得や、インターン説明など多数の実績を残す。
            <br />
            2021年4月より、フリーランスWeb制作コーダーとして活動開始。約50件程のWebサイトの制作に携わっています。
          </p>
        </div>

        {/* 趣味 */}
        <div css={box}>
          <h2>趣味</h2>
          <p>
            小学〜高校までの約10年間ずっと野球をしており、現在も観るのもやるのも好きです。
            <br />
            趣味は、自然を感じる場所に行くとやカフェ巡り等です(が、最近はずっとプログラミングに夢中...🐶)。
            <br />
          </p>
        </div>
      </div>
    </>
  )
}

export default About

// css
const container = css`
  background-color: #fff;
  padding: 40px;
  border: 2px solid var(--cBorder);
  border-radius: 10px;
  width: min(100%, 1000px);
  margin: 0 auto;
  ${mediaQuery[1]} {
    padding: 25px 15px 15px;
  }
  h1 {
    font-weight: 700;
    font-family: var(--fontSub);
    font-size: 3rem;
    text-align: center;
    ${mediaQuery[1]} {
      font-size: 2.4rem;
    }
  }
`
const profile = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(100%, 800px);
  margin: 50px auto 60px;
  gap: 0 25px;
  ${mediaQuery[1]} {
    flex-direction: column;
    margin: 30px auto 50px;
  }
`

const wrapper = css`
  position: relative;
  width: 150px;
  ${mediaQuery[1]} {
    width: 120px;
    height: 120px;
  }
`

const imgBox = css`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid var(--cSub);
  ${mediaQuery[1]} {
    width: 120px;
    height: 120px;
  }
  img {
    background-color: #fff;
    transition: opacity 0.3s ease;
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    &:hover {
      opacity: 0;
    }
  }
`

const profileText = css`
  width: calc(100% - 175px);
  font-family: var(--fontMain);
  ${mediaQuery[1]} {
    width: 100%;
  }
  p {
    font-size: 1.6rem;
    letter-spacing: 0.05em;
    line-height: 1.4;
    ${mediaQuery[1]} {
      font-size: 1.4rem;
    }
    &:first-of-type {
      font-weight: 700;
      font-size: 2.2rem;
      margin-bottom: 8px;
      ${mediaQuery[1]} {
        text-align: center;
        margin: 12px 0 6px;
        font-size: 1.8rem;
      }
    }
  }
`

const box = css`
  width: min(100%, 800px);
  margin: 40px auto;
  font-family: var(--fontMain);
  h2 {
    font-weight: 700;
    font-size: 2rem;
    display: inline-block;
    margin-bottom: 10px;
    padding-bottom: 2px;
    background: linear-gradient(transparent 60%, #f6f670 60%);
    ${mediaQuery[1]} {
      font-size: 1.8rem;
    }
  }
  p {
    line-height: 1.4;
    letter-spacing: 0.04em;
    ${mediaQuery[1]} {
      font-size: 1.4rem;
    }
    &.subtitle {
      font-weight: 700;
      font-size: 1.05em;
      ${mediaQuery[1]} {
        font-size: 1.6rem;
        margin-bottom: 4px;
      }
    }
  }
`
