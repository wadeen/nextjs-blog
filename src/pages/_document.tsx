import App from 'next/app'
import { Html, Head, Main, NextScript } from 'next/document'
import { useRouter } from 'next/router'

const MyDocument = () => {
  const baseUrl = process.env.NEXT_PUBLIC_HOST
  return (
    <Html prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#">
      <Head>
        {/* <meta property="og:url" content={`${baseUrl}`} />
        <meta property="og:type" content=" website" />
        <meta property="og:title" content="Webのあれこれ" />
        <meta
          property="og:description"
          content=" ディスクリプションのテキストが入ります。"
        />
        <meta property="og:site_name" content="Webのあれこれ" />
        <meta property="og:image" content="https://placehold.jp/1200x630.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@wadeen_net" /> */}
      </Head>
      <Main />
      <NextScript />
    </Html>
  )
}

export default MyDocument
