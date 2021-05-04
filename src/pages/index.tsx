import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import { Box, Container, Heading, Paragraph, Link } from 'theme-ui';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Container
      sx={{
        p: 3,
      }}
    >
      <Heading as="h1">👋 Hi, I'm Wilson.</Heading>
      <Box p={2}>
        <Paragraph>
          🧑🏻‍💻 I'm a front-end software engineer living in Utah.
        </Paragraph>
        <Paragraph>
          🤠 This site is a work in progress.{' '}
          <Link
            as={GatsbyLink}
            to="https://github.com/wilsonparson/wilsonparson.com/issues"
            className="bg-green-100 border-green-900 border-opacity-25 border-b"
          >
            See what I'm adding next.
          </Link>
        </Paragraph>
      </Box>
    </Container>
  </Layout>
);

export default IndexPage;
