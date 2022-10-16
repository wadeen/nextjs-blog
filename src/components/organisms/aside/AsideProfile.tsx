import { css } from '@emotion/react'
import { NextPage } from 'next'
import Image from 'next/image'
import { FaTwitter, FaGithub } from 'react-icons/fa'
import AsideTitle from '../../atoms/aside/AsideTitle'

const AsideProfile: NextPage = () => {
  return (
    <div css={container}>
      <AsideTitle text={'About me'} />
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
      <p css={nameInfo}>わでぃん</p>

      <div css={info}>
        <p>
          25歳のWeb制作コーダー。
          <br />
          フロントエンジニアとして働くために学んだ知識をアウトプットしています。
        </p>
      </div>

      <div css={sns}>
        <p>Follow me!</p>
        <ul>
          <li>
            <a
              href="https://github.com/wadeen"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub style={{ marginRight: '6px' }} />
              Github
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/wadeen_net"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter style={{ marginRight: '6px' }} />
              Twitter
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AsideProfile

// css
const container = css`
  border-radius: 6px;
`

const wrapper = css`
  height: 120px;
  position: relative;
`

const imgBox = css`
  transform: translateX(-50%);
  position: absolute;
  top: 0;
  left: 50%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid var(--cSub);
  img {
    background-color: whitesmoke;
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

const sns = css`
  text-align: center;
  margin-top: 14px;
  font-weight: 700;
  p {
    margin-bottom: 8px;
  }

  ul {
    display: flex;
    height: 30px;
    line-height: 30px;
    li {
      width: 50%;
      color: #fff;
      &:first-of-type {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        background-color: #333;
      }
      &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        background-color: #1d9bf0;
      }
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.3s ease;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
`

const nameInfo = css`
  font-size: 2rem;
  font-weight: 400;
  text-align: center;
  margin: 10px 0;
`

const info = css`
  font-size: 1.4rem;
  letter-spacing: 0.04em;
  line-height: 1.4;
  font-family: var(--fontMain);
`
