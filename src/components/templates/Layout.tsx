import { NextPage } from 'next'
import { ReactNode } from 'react'
import Footer from '../organisms/Footer'
import Header from '../organisms/Header'

const Layout: NextPage<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main id="wrapper">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
