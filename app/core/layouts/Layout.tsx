import { ReactNode } from "react"
import { Head } from "blitz"
import { NavBar } from "../components"
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
      <div className="relative">{children}</div>
    </>
  )
}

export default Layout
