import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import WalletManager from "../components/WalletManager"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <WalletManager />
    <h1>Hi people</h1>
    <p>Connect your wallet to unlock custom content</p>
  </Layout>
)

export default IndexPage
