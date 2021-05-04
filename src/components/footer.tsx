/** @jsx jsx */
import { Flex, jsx, NavLink } from 'theme-ui';
import { Link } from 'gatsby';

export default function Footer() {
  return (
    <Flex
      as="footer"
      sx={{
        justifyContent: 'space-around',
        p: 3,
      }}
    >
      <NavLink as={Link} to="https://github.com/wilsonparson">
        Github
      </NavLink>
      <NavLink as={Link} to="https://www.linkedin.com/in/wilsonparson">
        LinkedIn
      </NavLink>
    </Flex>
  );
}
