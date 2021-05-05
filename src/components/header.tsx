/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';

const Header = () => (
  <header
    sx={{
      px: 3,
    }}
  >
    <nav
      sx={{
        display: 'flex',
        gap: 4,
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
      <Link to="/wiki">Wiki</Link>
      <Link to="/resume">Resume</Link>
    </nav>
  </header>
);

export default Header;
