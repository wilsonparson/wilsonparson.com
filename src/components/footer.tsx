import * as React from 'react';
import { Link } from 'gatsby';

export default function Footer() {
  return (
    <footer className="flex justify-around p-4">
      <Link to="https://github.com/wilsonparson">Github</Link>
      <Link to="https://www.linkedin.com/in/wilsonparson">LinkedIn</Link>
    </footer>
  );
}
