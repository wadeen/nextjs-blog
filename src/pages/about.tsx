import { NextPage } from 'next'
import Head from 'next/head'
const About: NextPage = () => {
  return (
    <>
    {/* OGPなどは全部外に出してOK! */}
      <Head>
        <title>自己紹介 | Webのあれこれ</title>
      </Head>
      自己紹介ページ
    </>
  )
}

export default About
