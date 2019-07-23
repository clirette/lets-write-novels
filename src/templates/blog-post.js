import React from "react"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Layout from "../components/Layout"

const BlogPost = ({ data: { contentfulBlogPost: post } }) => {
  return (
    <Layout>
      <h1>{post.title}</h1>
      <img src={post.heroImage.file.url} alt="" width="250px" />
      {documentToReactComponents(post.content.json)}
    </Layout>
  )
}

export const query = graphql`
  query blogPostQuery($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      content {
        json
      }
      heroImage {
        file {
          url
        }
      }
    }
  }
`

export default BlogPost
