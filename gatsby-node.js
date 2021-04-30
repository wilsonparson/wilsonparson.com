/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve(`src/templates/blog-template.tsx`);

  const result = await graphql(`
    query MyQuery {
      allMdx(filter: { fileAbsolutePath: { regex: "content/wiki/" } }) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: 'wiki/' + node.slug,
      component: blogPostTemplate,
      context: {
        slug: node.slug,
      }, // additional data can be passed via context
    });
  });
};
