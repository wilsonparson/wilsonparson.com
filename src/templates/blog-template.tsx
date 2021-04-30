import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { MDXRenderer, MDXRendererProps } from 'gatsby-plugin-mdx';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}: PageProps<MDXRendererProps>) {
  const { mdx } = data; // data.markdownRemark holds your post data
  const { frontmatter, body } = mdx;
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1 className="text-4xl">{frontmatter.title}</h1>
        <MDXRenderer>{body}</MDXRenderer>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(slug: { eq: $slug }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
      body
    }
  }
`;
