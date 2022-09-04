import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useViewport } from '../hooks/useViewPort'
import { seoType } from 'types/seoType'

const Seo: NextPage<seoType> = ({ ogpImage, ogpTitle, ogpDescription }) => {
  const baseUrl = process.env.NEXT_PUBLIC_HOST
  const router = useRouter()
  const { viewport } = useViewport() // 375px以下は等倍縮小

  return (
    <Head>
      <title>{ogpTitle ?? 'Webのあれこれ'} </title>
      <meta property="og:title" content={ogpTitle ?? 'Webのあれこれ'} />
      <meta
        property="og:description"
        content={
          ogpDescription ??
          'Webエンジニア為の有益な情報を発信しています。一般的なブログの説明'
        }
      />
      <meta
        property="og:image"
        content={ogpImage ?? 'https://placehold.jp/1200x630.png'}
      />

      {/* 以下は全ページ統一 */}
      <meta name="viewport" content={viewport} />
      <meta property="og:url" content={`${baseUrl}${router.asPath}`} />
      <meta property="og:type" content=" website" />
      <meta property="og:site_name" content="Webのあれこれ" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@wadeen_net" />
    </Head>
  )
}

export default Seo
