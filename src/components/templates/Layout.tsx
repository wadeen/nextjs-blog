import { ReactNode } from 'react'
import Footer from '../organisms/Footer'
import Header from '../organisms/Header'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main id="wrapper">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
