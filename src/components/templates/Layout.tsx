import { ReactNode } from 'react'
import Header from '../organisms/Header'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main id="wrapper">{children}</main>
    </>
  )
}

export default Layout
