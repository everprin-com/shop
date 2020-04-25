import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../Header/Header";
// import { hot } from 'react-hot-loader/root'
import Home from "../Home/Home";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import DialogSwitcher from "../DialogSwitcher";
import Footer from "../Footer/Footer";
import WidgetPanel from "../HelpWidget/WidgetPanel";
import styles from "./styles";
import TitleComponent from "../TitleComponent";

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

  scrolling = () => window.scrollTo(0, 0)

  redirectToOrderForm = () => this.props.history.push("/orderform");

  redirectToCategory = category =>
    this.props.history.push(`/categoryPage/${category}`);

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <TitleComponent title="KILO магазин одежды и обуви. Широкий ассортимен! Доступные цены!" />
        <Grid container spacing={24}>
          <Grid className={classes.appInner} item xs={12}>
            <Header
              withSmallMenu
              mainPageHeader
              resetFilterWithoutSex
              redirectToCategory={this.redirectToCategory}
            />
            <WidgetPanel />
            <Home mainPage />
            <Footer />
          </Grid>
        </Grid>
        <DialogSwitcher
          dialogs={[
            { title: "Выберите размер", type: "size" },
            { title: "Нам жаль, что Вы нас покидаете...", type: "exit" }
          ]}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(App));
