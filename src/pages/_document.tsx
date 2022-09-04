import { NextPage } from 'next'
import { Html, Head, Main, NextScript } from 'next/document'
import { seoType } from 'types/seoType'

const MyDocument: NextPage = () => {
  return (
    <Html>
      <Head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
