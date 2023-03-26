/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useScrollHeight from 'src/hooks/useScrollHeight'
import { mediaQuery } from 'src/utils/Breakpoints'

const Share: NextPage = () => {
  const router = useRouter()

  const scrollHeight = useScrollHeight()

  return (
    <div css={container} data-shown={scrollHeight}>
      <h3>\ 共有しましょう! /</h3>
      {scrollHeight}
      <a
        href={`http://twitter.com/share?url=${process.env.NEXT_PUBLIC_HOST}${router.asPath}&via=wadeen_net`}
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/images/icon/twitter.svg"
          width={72}
          height={72}
          alt="ツイッターで共有する"
        />
      </a>
    </div>
  )
}

export default Share

// css
const container = css`
  text-align: center;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  &[data-shown='false'] {
    opacity: 0;
    visibility: hidden;
  }
  ${mediaQuery[2]} {
    position: fixed;
    right: -2px;
    width: 75px;
    height: 80px;
    bottom: 75px;
  }
  h3 {
    text-align: center;
    font-weight: 700;
    ${mediaQuery[2]} {
      display: none;
    }
  }
  a {
    ${mediaQuery[2]} {
      display: grid;
      place-content: center;
      width: 100%;
      height: 100%;
      border-radius: 15px 0 0 15px;
      background-color: #fff;
      border: 2px solid teal;
      &:before {
        content: '＼共有／';
        display: block;
        font-size: 1.2rem;
        margin-bottom: -8px;
        font-weight: 700;
      }
    }
    img {
      transition: opacity 0.3s ease, transform 0.3s ease;
      ${mediaQuery[2]} {
        width: 60px;
        height: 60px;
        margin-bottom: -10px;
      }
      &:hover {
        opacity: 0.85;
        transform: rotate(-5deg);
      }
    }
  }
`
