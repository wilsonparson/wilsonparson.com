/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  // const { createNodeField } = actions;
  // if (node.internal.type === 'Mdx') {
  //   createNodeField({
  //     node,
  //     name: 'dir',
  //     value:
  //   })
  // }
};

function createWikiPages({ data, actions }) {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/templates/blog-template.tsx`);
  data.edges.forEach(({ node }) => {
    createPage({
      path: 'wiki/' + node.slug,
      component: blogPostTemplate,
      context: {
        slug: node.slug,
      }, // additional data can be passed via context
    });
  });
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { data, errors } = await graphql(`
    query {
      wiki: allMdx(filter: { fileAbsolutePath: { regex: "content/wiki/" } }) {
        edges {
          node {
            frontmatter {
              title
            }
            slug
            parent {
              ... on File {
                changeTime(formatString: "MMMM D, YYYY")
              }
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const { wiki } = data;

  createWikiPages({
    data: wiki,
    actions,
  });
};
