import { NextPage } from 'next'
import { Html, Head, Main, NextScript } from 'next/document'
import { seoType } from 'types/seoType'

const MyDocument: NextPage = () => {
  return (
    <Html>
      <Head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#">
        {/* Nikukyu (Japanese): https://fonts.google.com/earlyaccess Google fonts: https://fonts.google.com/*/}
        <link
          href="https://fonts.googleapis.com/earlyaccess/nikukyu.css"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Capriola&family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument