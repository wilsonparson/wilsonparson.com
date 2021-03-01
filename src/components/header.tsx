/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import { Link } from 'gatsby'
import React from 'react'
import Logo from './logo'

const Header: React.FunctionComponent = () => (
  <header>
    <Link to="/" aria-label="Home">
      <Box
        sx={{
          width: [10],
        }}
      >
        <Logo />
      </Box>
    </Link>
  </header>
)

export default Header
