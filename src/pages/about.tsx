/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import Seo from 'src/components/Seo'
const About: NextPage = () => {
  return (
    <>
      <Seo ogpTitle="自己紹介 | Webのあれこれ" />
      <div css={container}>自己紹介ページ</div>
    </>
  )
}

export default About

const container = css`
  background-color: tomato;
  height: 300px;
`
