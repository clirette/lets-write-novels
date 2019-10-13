import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"

export default ({ data }) => {
  return (
    <Layout>
      <div>Home page</div>
      <div>
        {data.allContentfulBlogPost.edges.map(({ node }, index) => {
          return (
            <div key={index}>
              <Link to={node.slug}>
                <img
                  src={node.heroImage.file.url}
                  alt="Blog Image"
                  height="250px"
                />
                <h1>{node.title}</h1>
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulBlogPost {
      edges {
        node {
          title
          slug
          heroImage {
            file {
              url
            }
          }
        }
      }
    }
  }
`
