import '../styles/globals.css'
import '../styles/destyle.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import Layout from '../components/templates/Layout'
// @ts-ignore
import * as gtag from '/src/utils/gtag'
import { GaScript } from 'src/utils/GaScript'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <RecoilRoot>
      <Layout>
        <GaScript />
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  )
}

export default MyApp
