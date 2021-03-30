import { Link } from 'gatsby'
import React from 'react'
import Logo from './logo'

const Header: React.FunctionComponent = () => (
  <header>
    <Link to="/" aria-label="Home">
      <Logo />
    </Link>
  </header>
)

export default Header
