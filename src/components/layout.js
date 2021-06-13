/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Img from "gatsby-image"
import { useSpring, animated } from "react-spring"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Archive from "./archive"
import "./layout.css"

const MainLayout = styled.main`
  max-width: 90%;
  margin: 1rem auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 40px;
`

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      file(relativePath: { regex: "/bg/" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const springProps = useSpring({
    from: { height: location.pathname === "/" ? "100px" : "200px" },
    to: { height: location.pathname === "/" ? "200px" : "100px" },
  })

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <animated.div style={{ overflow: "hidden", ...springProps }}>
        <Img fluid={data.file.childImageSharp.fluid} />
      </animated.div>
      <MainLayout>
        <div>{children}</div>
        <Archive />
      </MainLayout>
      <footer
        style={{
          marginTop: `2rem`,
        }}
      >
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
