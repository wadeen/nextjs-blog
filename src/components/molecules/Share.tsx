import { css } from '@emotion/react'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Share: NextPage = () => {
  const router = useRouter()
  return (
    <div css={container}>
      <h3>\ 共有しましょう! /</h3>
      <p>
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
      </p>
    </div>
  )
}

export default Share

// css
const container = css`
  text-align: center;
  h3 {
    text-align: center;
    font-weight: 700;
  }
  a {
    img {
      transition: opacity 0.3s ease, transform 0.3s ease;
      &:hover {
        opacity: 0.85;
        transform: rotate(-5deg);
      }
    }
  }
`
