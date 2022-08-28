import '../styles/globals.scss'
import '../styles/destyle.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/templates/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
