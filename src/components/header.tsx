import { Link } from 'gatsby';
import * as React from 'react';
import tw from 'twin.macro';

const NavLink = tw(Link)`
  font-medium
  text-gray-600
  text-sm
`;

const Header = () => (
  <header className="container mx-auto px-4">
    <nav className="flex items-center justify-between">
      <Link to="/" aria-label="Home">
        <img src="/logomark.svg" alt="" className="w-16" />
      </Link>
      <NavLink to="/resume">Resume</NavLink>
    </nav>
  </header>
);

export default Header;
