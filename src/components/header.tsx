/** @jsx jsx */
import { jsx, Flex, NavLink, Container } from 'theme-ui';
import { Link } from 'gatsby';

const Header = () => (
  <Container
    as="header"
    sx={{
      px: 3,
    }}
  >
    <Flex
      as="nav"
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Link to="/" aria-label="Home">
        <img
          src="/logomark.svg"
          alt=""
          sx={{
            width: 16,
          }}
        />
      </Link>
      <NavLink as={Link} to="/resume">
        Resume
      </NavLink>
    </Flex>
  </Container>
);

export default Header;
