/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `sqmyzfus4uit`,
        accessToken: `HZtDL7wD9fJy3o5rkxcAA0L8d-gX3G9yQoYs75pUpYE`,
      },
    },
  ],
}
