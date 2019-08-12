import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import { Route, withRouter } from "react-router-dom";

class ScrollToTopRoute extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;

    return <Route {...rest} render={props => <Component {...props} />} />;
  }
}

ScrollToTopRoute.propTypes = {
  path: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  component: PropTypes.instanceOf(Component)
};

export default withRouter(ScrollToTopRoute);
