import { Link } from 'gatsby'
import React from 'react'
import Logo from './logo'

const Header: React.FunctionComponent = () => (
  <header>
    <Link to="/">
      <Logo />
    </Link>
  </header>
)

export default Header
