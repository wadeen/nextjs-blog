/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import GitHubIcon from '@mui/icons-material/GitHub'
import TwitterIcon from '@mui/icons-material/Twitter'
import Image from 'next/image'
import Link from 'next/link'
import AsideTitle from '../../atoms/AsideTitle'

const AsideProfile = () => {
  return (
    <div css={container}>
      <AsideTitle text={'About me'} />
      <div css={wrapper}>
        <p css={imgBox}>
          <Image
            src="/images/me.jpeg"
            width={1200}
            height={1200}
            alt=""
            className="chara"
          />
        </p>
        <p css={imgBox}>
          <Image src="/images/chara.png" width={1200} height={1200} alt="" />
        </p>
      </div>
      <p css={nameInfo}>わでぃん</p>

      <div css={info}>
        <p>
          25歳のWeb制作コーダー。
          <br />
          年内にフロントエンジニアとして働くために学んだ知識をアウトプットしています。
        </p>
      </div>

      <div css={sns}>
        <p>SNSアカウント</p>
        <ul>
          <li>
            <Link href="/">
              <a>
                <GitHubIcon />
                Github
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <TwitterIcon />
                Twitter
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AsideProfile

const container = css`
  background-color: #fff;
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
  margin-top: 10px;
  font-weight: 500;
  p {
    margin-bottom: 6px;
  }
  ul {
    display: flex;
    height: 30px;
    line-height: 30px;
    li {
      width: 50%;
      &:first-child {
        background-color: #333;
        color: #fff;
      }
      &:last-child {
        background-color: #1d9bf0;
        color: #fff;
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
  font-weight: 500;
  text-align: center;
  margin: 10px 0;
`

const info = css`
  font-size: 1.4rem;
  letter-spacing: 0.04em;
  line-height: 1.4;
`
