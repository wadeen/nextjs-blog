import base64url from 'base64url'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useViewport } from '../hooks/useViewPort'
import { SeoType } from 'types/seoType'

const Seo: NextPage<SeoType> = ({
  ogpTitle,
  ogpDescription,
  width = 1200,
  height = 630,
}) => {
  const router = useRouter()
  const { viewport } = useViewport() // 375px以下は等倍縮小
  const baseUrl = process.env.NEXT_PUBLIC_HOST // ページURL
  const baseImageUrl = `${process.env.NEXT_PUBLIC_MICROCMS_OGP_ARTICLE}` // OGPベース画像

  // OGP画像: 記事別に自動生成
  const textImage = `https://images.microcms-assets.io/~text?txtsize=48&w=1000&h=400&txt-align=center,middle&txtfont=Hiragino%20Sans%20W6&txt=${ogpTitle}` // タイトルを画像化
  const textImageUrl = base64url(textImage) // タイトル画像のエンコード
  const ogpImage = `${baseImageUrl}?w=${width}&h=${height}&mark-align=center%2Cmiddle&mark64=${textImageUrl}` // 背景画像とタイトルの合成(改行可)

  // OGP画像: ベース(ブログ以外)
  const ogpBasic = process.env.NEXT_PUBLIC_MICROCMS_OGP_BASE

  return (
    <Head>
      <title>{ogpTitle ?? 'Webのあれこれ'}</title>
      <meta property="og:title" content={ogpTitle ?? 'Webのあれこれ'} />
      <meta
        property="og:description"
        content={
          ogpDescription ??
          'Webエンジニアの為の有益な情報を発信しています。Web制作やフロントエンドのモダン技術を中心にアウトプットしています。'
        }
      />
      <meta
        property="og:image"
        content={ogpTitle === undefined ? ogpBasic : ogpImage}
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
