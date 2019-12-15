import { Link } from 'gatsby'
import React from 'react'
import Logo from './logo'

const Header = () => (
  <header>
    <Link to="/" className="block p-1">
      <Logo className="w-24" />
    </Link>
  </header>
)

export default Header
