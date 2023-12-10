import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import './style.css';

function Nav({ to, children }) {
  return (
    <Link className="Nav" to={to}>{children}</Link>
  );
}

Nav.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Nav;