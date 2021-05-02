import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="container mx-auto p-4">
      <h1 className="text-3xl pb-4">👋 Hi, I'm Wilson.</h1>
      <div className="pl-2">
        <p className="pb-2">
          🧑🏻‍💻 I'm a front-end software engineer living in Utah.
        </p>
        <p className="pb-2">
          🤠 This site is a work in progress.{' '}
          <Link
            to="https://github.com/wilsonparson/wilsonparson.com/issues"
            className="bg-green-100 border-green-900 border-opacity-25 border-b"
          >
            See what I'm adding next.
          </Link>
        </p>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
