import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    pageWidth: state.general.pageWidth
  };
};

function Logo({ classes, redirectToRoot, resetFilter, pageWidth, className }) {
  const handleClink = e => {
    e.preventDefault();
    resetFilter && resetFilter();
    if (redirectToRoot) {
      redirectToRoot();
      resetFilter();
    }
  };
  return (
    <Link to="/" onClick={handleClink} className={className}>
      <div className={classes.logoWrap}>
        <img
          src={pageWidth < 1000 ? "/imgs/logo-min.png" : "/imgs/logo.png"}
          className={classes.logo}
        />
      </div>
    </Link>
  );
}

export default connect(mapStateToProps)(Logo);
