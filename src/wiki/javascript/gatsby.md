---
title: Gatsby
eleventyNavigation:
  key: Gatsby
---

## Queries

### Page Queries

- You must export a graphql query
- Only available on "Page" components
- Typically you export the query at the end of the file (outside of the component definition)

### Static Queries

- Lets non-page components (like a layout component) make graphql queries
- Use the `useStaticQuery` hook **inside** your component

### Query Syntax

```graphql
query MyQuery {
  site {
    siteMetadata {
      title
    }
  }
}
```

`query` is the graphql operation type. Gatsby only ever uses `query` so you can actually omit it. The other operation types are `mutation` and `subscription`.

`MyQuery` is the name of the operation. Similar to a JavaScript `function` you can leave it anonymous if you want.

Without naming the operation:

```diff
-query MyQuery {
+query {
  site {
    siteMetadata {
      title
    }
  }
}
```

Without naming the operation or operation type:

```diff
-query MyQuery {
site {
  siteMetadata {
    title
  }
}
-}
```

### Arguments

You can pass arguments to queries to specify things like how to **sort** or **filter** the nodes, how many nodes to **skip**, and choose the **limit** of how many nodes to retrieve.

## GraphiQL

Building new pages in Gatsby often starts in GraphiQL.

`Ctrl + Space` or `Shift + Space` = show autocomplete window
`Ctrl + Enter` or `Cmd + Enter` = run query

**Node** = a fancy name for an object in a graph

## gatsby-source-filesystem

Adds `file` and `allFile` as selections.

If I'm understanding correctly, it seems that the `edges` key generally returns an array of objects in the shape of `{ previous, node, next }`.

- `previous`: Lets you look into the previous node
- `node`: The current node
- `next`: Lets you look into the next node

It can be helpful to `console.log` out the data when you're building a page with Gatsby, just so you can verify the shape of the data

## Transformer Plugins

- Source plugins: bring data _into_ Gatsby
- Transformer plugins: _transform_ the raw content brought in by source plugins

For example, `gatsby-source-filesystem` on its own only lets you query metadata _about_ the files—it doesn't let you query data _inside_ the files. For that we need a transformer plugin.

### gatsby-transformer-remark

`gatsby-transformer-remark` transforms markdown files so that we can query the data inside the files and also have the markdown be output as html.

After you add `gatsby-transformer-remark` to your `gatsby-config.js`, you will see the following new selections in GraphiQL:

- `allMarkdownRemark`
- `markdownRemark`

> Side note: It appears that all the singular options in the GraphiQL left panel (e.g., `file` as opposed to `allFile`) return the first instance that matches, perhaps just for exploration? Similar to `querySelector` vs `querySelectorAll`.

`gatsby-transformer-remark` adds some cool metadata about markdown files!

- `html` - the html output of the markdown file
- `timeToRead` - an estimate in minutes of how long it takes to read?
- `tableOfContents` - Outputs a `<ul>` of links that correspond with the headings in your markdown file!
- `headings` - Returns an array of your headings and their depth
- `frontmatter` - Lets you query into the front matter of the markdown file
- `htmlAst` - Returns the HTML in an abstract syntax tree
- `rawMarkdownBody` - I think the purpose of this is to use things like regex to search for specific content
- `excerpt` - I'm not sure how this one works, but it seems like a way to grab an excerpt from the beginning of the content to display as a preview elsewhere.

There are a lot of other keys I didn't list here.

## Programmatically creating pages from data

Creating new pages has two distinct steps:

1. Generate the slug for the page.
2. Create the page

Two Gatsby APIs for creating the pages: `onCreateNode` and `createPages`.

To use Gatsby APIs, you export a function with the name of the API from `gatsby-node.js`.

### onCreateNode

Called by Gatsby whenever a new node is created or updated. (And I think a node refers to any GraphQL node that Gatsby picks up and adds to the schema, meaning it will be available via GraphiQL.)

Apparently nodes of type `MarkdownRemark` (provided by `gatsby-transformer-remark`) are _children_ of `File` nodes (provided by `gatsby-source-filesystem`). So when you start your query looking specifically for `MarkdownRemark` node types, if you want to get metadata about the actual file, you have to traverse the node graph by moving from the `MarkdownRemark` node to its parent. To do that you use the `getNode` helper, which is available to be destructured from the parameters of `onCreateNode`:

```javascript
// gatsby-node.js

exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    console.log('\n', fileNode.relativePath);
  }
};
```

### Creating slugs

If you need to create slugs from a file name, use the `createFilePath` function that ships with `gatsby-source-filesystem`:

```javascript
// gatsby-node.js

const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === 'MarkdownRemark') {
    console.log(createFilePath({ node, getNode, basePath: 'pages' }));
  }
};
```

Once you have the slugs, you can add them directly to your `MarkdownRemark` nodes. (If you store the slug in your frontmatter, you don't need to do all this.) To actually add a custom field (we'll call the field 'slug') to a GraphQL node that was generated by a plugin, you can't directly mutate the node. (Only the original creator of the node can do that.) Instead, you have to use the `createNodeField` (which you pull out of the `actions` parameter) function to do it:

```javascript
// gatsby-node.js

const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};
```

Apparently custom-added fields (like what we just did) appear in the node under a new `fields` key. So to get the slugs we just added our query would look like this:

```graphql
query {
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
}
```

### Creating pages

Now that we have our slugs we're ready to create pages!

Steps for creating pages:

1. Query the data you need for the pages using GraphQL
2. Map the query results to pages

We need to use the `createPages` export from `gatsby-node.js`. This function is called after the GraphQL nodes are sourced and transformed, and the schema is complete. This is similar to a lifecycle hook (e.g., `ngOnInit`, `componentDidMount`): it's a function that is called at build time regardless of whether you implement it. So it's a lifecycle hook that is called at the right time for use to have all the data we need in order to use the data to generate pages.

```javascript
// gatsby-node.js

// Since the graphql function returns a promise, we need to make the parent function `async`
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Query for some data to use for creating pages
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // Create the pages using the data
  // Will probably call `createPage` inside of a loop
```

#### Page Templates

When we call `createPage`, we need to provide:

1. The `slug` (i.e., path)
2. A template (a file path to a component)
3. Any data we want to make available to the page via a page query (this parameter is called `context`)

```javascript
// gatsby-node.js

const path = require('path');

exports.onCreateNode = () => {
  // Defined in notes above
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Query for some data to use for creating pages
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  // Create the pages using the data
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: node.fields.slug,
      },
    });
  });
};
```

And here's the template:

```javascript
// src/templates/blog-post.js

import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export default function BlogPost({ data }) {
  const post = data.markdownRemark;
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
```

I'm not entirely sure what's happening with the query above (looks like I need to get more familiar with GraphQL), but here's my best guess:

- This is a page query
- It accepts a parameter `$slug`, which is a string
- This parameter is provided by the `context` argument that we passed to `createPage`, where we included `slug` as a field that would be available for page queries
- I don't fully understand the `$`. [GraphQL Docs - Passing Arguments](https://graphql.org/graphql-js/passing-arguments/) suggests using `$` as a way to build queries in code without manually constructing the entire query string for your graphql endpoint. In this sense the dollar sign appears to work in a similar fashion to prepared statements and argument injection in SQL. Gatsby must be doing something else behind the scenes to inject the variables into the query for us...
- The `!` after String means it is non-nullable (i.e., not optional)
- We are querying `markdownRemark`, rather than `allMarkdownRemark`, because we just want a subset (in this case, just one) of the `markdownRemark` nodes.
- We specify exactly which `markdownRemark` node we want by matching the slug passed in as the parameter to the slug in the result

Now that I understand you can pass arguments to the singular top-level GraphQL keys, (e.g., `markdownRemark`, `file`), the existence of those keys makes a lot more sense.
