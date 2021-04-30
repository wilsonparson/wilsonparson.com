import { Link } from 'gatsby';
import * as React from 'react';

const Header = () => (
  <header className="p-8">
    <Link to="/" aria-label="Home">
      <img src="/wp-logo.svg" alt="" className="w-16" />
    </Link>
  </header>
);

export default Header;
