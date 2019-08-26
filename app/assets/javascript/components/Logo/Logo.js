import React from "react";
import { Link } from "react-router-dom";

function Logo({ classes, redirectToRoot, resetFilter }) {
    console.log(classes)
  const handleClink = e => {
    e.preventDefault();
    resetFilter && resetFilter();
    if (redirectToRoot) {
      redirectToRoot();
      resetFilter();
    }
  };
  return (
    <Link to="/" onClick={handleClink}>
      <div className={classes.logoWrap}>
        <img src="/imgs/logo.png" className={classes.logo} />
      </div>
    </Link>
  );
}

export default Logo;
