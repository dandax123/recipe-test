import { ReactNode } from "react"
import { Head } from "blitz"
import { NavBar } from "../components"
import Footer from "../components/Footer"
type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "recipe-app"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className="">{children}</div>

      <Footer />
    </>
  )
}

export default Layout
