import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "./Header";
// import { hot } from 'react-hot-loader/root'
import Home from "./Home";
import Dialog from "./Dialog";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import ChooseSize from "./ChooseSize";
import Footer from "./Footer";

const mapStateToProps = state => {
  return {
    orderform: state.orderform,
    scrolling: state.general.scrolling
  };
};

const styles = theme => ({
  root: {
    [theme.breakpoints.up("xs")]: {
      width: "375px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "600px"
    },
    [theme.breakpoints.up("md")]: {
      width: "1000px"
    },
    [theme.breakpoints.up("lg")]: {
      width: "1240px"
    },
    // [theme.breakpoints.between('lg')]: {
    //   width: '1240px',
    // },
    // width: '1240px',
    margin: "0 auto",
    positon: "relative"
  },
  appInner: {
    padding: "0 12px 12px 12px !important"
  }
});

class App extends React.PureComponent {
  componentDidUpdate(prevProps) {
    this.props.orderform && this.redirectToOrderForm();
    this.props.scrolling && this.scrolling();
  }

  scrolling = () => window.scrollTo({ top: 0, behavior: "smooth" });

  redirectToOrderForm = () => this.props.history.push("/orderform");

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid className={classes.appInner} item xs={12}>
            <Header withSmallMenu />
            <Home />
            <Footer />
          </Grid>
        </Grid>
        <Dialog title="Выберите размер" Component={ChooseSize} type="size" />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(withStyles(styles)(App));
