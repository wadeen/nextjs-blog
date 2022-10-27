import { Capriola, Noto_Sans_Javanese } from '@next/font/google'
import { NextPage } from 'next'
import { ReactNode } from 'react'
import Footer from '../organisms/Footer'
import Header from '../organisms/Header'

const capriola = Capriola({
  weight: '400',
})

const Layout: NextPage<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={`${capriola.className}`}>
      <Header />
      <main id="wrapper">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
