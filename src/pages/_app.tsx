import '../styles/globals.scss'
import '../styles/destyle.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import Layout from '../components/templates/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <RecoilRoot>
        <Head>
          <title>Webのあれこれ</title>
        </Head>
        <Component {...pageProps} />
      </RecoilRoot>
    </Layout>
  )
}

export default MyApp
