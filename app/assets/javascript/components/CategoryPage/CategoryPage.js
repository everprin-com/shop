import React from "react";
import ProductList from "../ProductList/ProductList";
import SideBar from "../SideBar/SideBar";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import styles from "./styles";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { isEqualArr } from "../Utils";
import WidgetPanel from "../HelpWidget/WidgetPanel";
import TitleComponent from "../TitleComponent";
import DialogSwitcher from "../DialogSwitcher";

const mapStateToProps = state => {
  return {
    pageWidth: state.general.pageWidth,
    sex: state.filterData.filter.sex,
    orderform: state.orderform
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetProducts: () => dispatch({ type: "RESET_PRODUCTS" })
  };
};

class CategoryPage extends React.PureComponent {
  state = { data: [] };

  componentDidUpdate(prevProps) {
    this.props.orderform && this.redirectToOrderForm();
    this.props.scrolling && this.scrolling();
    !isEqualArr(prevProps.sex, this.props.sex) && this.forceUpdate();
  }

  componentDidMount() {
    this.props.resetProducts();
    // const { category } = this.props.match.params;
    // if (category) {
    //   document.title = `Модные ${category.toLocaleUpperCase()} 2019 - купить в kilo. Лучшие цены. Большой Ассортимент`;
    // }

    // this.props.history.listen(() => {
    //   this.props.resetProducts();
    //   this.forceUpdate();
    // });
  }

  scrolling = () => window.scrollTo({ top: 0, behavior: "smooth" });

  redirectToCategory = category => {
    this.props.resetProducts();
    document.title = `Модные ${category.toLocaleUpperCase()} 2020 - купить в kilo. Отличные цены. Большой Ассортимент`;
    this.props.history.push(`/categoryPage/${category}`);
  };

  redirectToOrderForm = () => this.props.history.push("/orderform");

  redirectToRoot = () => this.props.history.push("/");

  render() {
    const { classes, requestAndAddProducts, sex, pageWidth } = this.props;

    const { category } = this.props.match.params;
    return (
      <div className={classes.root}>
        <TitleComponent
          title={`Модные ${category.toLocaleUpperCase()} 2020 - купить в kilo. Отличные Цены. Большой Ассортимент`}
        />
        <Header
          withSmallMenu
          resetFilterWithoutSex
          redirectToCategory={this.redirectToCategory}
          redirectToRoot={this.redirectToRoot}
        />
        <WidgetPanel />
        <SideBar isMainSideBar />
        <div className={classes.main}>
          <ProductList
            productsParams={{
              per_page: pageWidth < 600 ? 3 : 9,
              sex,
              search_category: category
            }}
          />
        </div>
        <Footer />
        <DialogSwitcher
          dialogs={[
            { title: "Выберите размер", type: "size" },
            { title: "Нам жаль, что Вы нас покидаете...", type: "exit" },
          ]}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CategoryPage));
