import '../styles/globals.scss'
import '../styles/destyle.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import Layout from '../components/templates/Layout'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>Webのあれこれ</title>
          </Head>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Layout>
    </RecoilRoot>
  )
}

export default MyApp
