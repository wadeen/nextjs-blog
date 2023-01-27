import { NextPage } from 'next'
import { Html, Head, Main, NextScript } from 'next/document'

const MyDocument: NextPage = () => {
  return (
    <Html lang="ja">
      <Head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#">
        <link rel="manifest" href="/manifest/manifest.json" />
        <link rel="apple-touch-icon" href="/manifest/icon.png" />
        <meta name="theme-color" content="#fff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
