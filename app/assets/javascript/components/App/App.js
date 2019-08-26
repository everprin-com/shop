import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../Header/Header";
// import { hot } from 'react-hot-loader/root'
import Home from "../Home/Home";
import Dialog from "../Dialog/Dialog";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import ChooseSize from "../ChooseSize/ChooseSize";
import Footer from "../Footer/Footer";
import WidgetPanel from "../HelpWidget/WidgetPanel"
import styles from "./styles"

const mapStateToProps = state => {
  return {
    orderform: state.orderform,
    scrolling: state.general.scrolling
  };
};

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
            <Header withSmallMenu resetFilter />
            <WidgetPanel />
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
