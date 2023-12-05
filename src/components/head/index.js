import React from "react";

import PropTypes from "prop-types";
import './style.css';

function Head({title, className}) {
  return (
    <div className={`Head ${className}`}>
      <h1>{title}</h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
