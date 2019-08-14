import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import MenuGenderPanel from "../MenuGenderPanel/MenuGenderPanel";
import Panel from "../Panel/Panel";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import Drawer from "../Drawer/Drawer";
import { Link } from "react-router-dom";
import styles from "./styles";

const mapStateToProps = state => {
  const isFemale =
    state.filterData.filter.sex &&
    state.filterData.filter.sex.includes("wooman");
    console.log(isFemale)
  if (state.metaData.headers)
    return {
      headers: state.metaData.headers[isFemale ? "female" : "male"]
    };
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    resetFilter: () => dispatch({ type: "RESET_FILTER" })
  };
};

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

function CastomIcon({ src, classes }) {
  return (
    <div className={classes.icon}>
      <img className={classes.img} src={`/imgs/${src}`} />
    </div>
  );
}

function Logo({ classes, redirectToRoot, resetFilter }) {
  const handleClink = e => {
    e.preventDefault();
    resetFilter();
    redirectToRoot && redirectToRoot();
  };
  return (
    <Link to="/" onClick={redirectToRoot ? handleClink : null}>
      <div className={classes.logoWrap}>
        <img src="/imgs/logo.png" className={classes.logo} />
      </div>
    </Link>
  );
}

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.dropDownRef = React.createRef();
    this.tabsRef = React.createRef();
  }

  state = {
    value: false
  };

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, false);
  }

  componentWillMount() {
    document.addEventListener("click", this.handleClickOutside, false);
  }

  productTypeList = type => {
    const { headers } = this.props;
    console.log(headers)
    if (!headers || !headers.filter) return;
    const typeCategory = headers.filter(header => header.group == type);
    const catalogues = Object.keys(typeCategory).map(
      key => typeCategory[key]["catalogue"]
    );
    return catalogues;
  };

  handleClickOutside = event => {
    const domNode = this.dropDownRef.current;
    const tabs = this.tabsRef.current;

    if (
      !domNode ||
      (!domNode.contains(event.target) && !tabs.contains(event.target))
    ) {
      this.resetDropDown();
    }
  };

  handleChange = (event, value) => this.setState({ value });

  hoverOn = value => this.handleChange("", value);

  resetDropDown = () => {
    this.setState({ value: false });
  };

  render() {
    const { classes, redirectToRoot, withSmallMenu, resetFilter } = this.props;
    const { value } = this.state;

    return (
      <header className={`${classes.header} header`}>
        <div className="header-content">
          <div className={classes.root}>
            <MenuGenderPanel />

            <AppBar
              position="static"
              color="default"
              className={classes.chooseCategoryMenu}
            >
              <Logo
                classes={classes}
                resetFilter={resetFilter}
                redirectToRoot={redirectToRoot}
              />
              <div ref={this.tabsRef}>
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  classes={{
                    root: classes.tabs,
                    scroller: classes.overflow,
                    flexContainer: classes.flexContainer
                  }}
                >
                  <Tab
                    className={classes.tab}
                    label="Одежда"
                    icon={<CastomIcon classes={classes} src="clothes.png" />}
                    onMouseEnter={this.hoverOn.bind(this, 0)}
                    onClick={this.hoverOn.bind(this, 0)}
                  />
                  <Tab
                    className={classes.tab}
                    label="Обувь"
                    icon={<CastomIcon classes={classes} src="shoe.png" />}
                    onMouseEnter={this.hoverOn.bind(this, 1)}
                    onClick={this.hoverOn.bind(this, 1)}
                  />
                  <Tab
                    className={classes.tab}
                    label="Аксессуары"
                    icon={<CastomIcon classes={classes} src="watch.svg" />}
                    onMouseEnter={this.hoverOn.bind(this, 2)}
                    onClick={this.hoverOn.bind(this, 2)}
                  />
                  <Panel />
                </Tabs>
              </div>
            </AppBar>
            {this.state.value !== false && (
              <div
                className={classes.dropdownMenu}
                ref={this.dropDownRef}
                onMouseLeave={this.resetDropDown}
              >
                {value === 0 && (
                  <DropDownMenu
                    redirectToRoot={redirectToRoot}
                    productTypeList={this.productTypeList("clothes")}
                    resetDropDown={this.resetDropDown}
                    mainPage={withSmallMenu}
                  />
                )}
                {value === 1 && (
                  <DropDownMenu
                    redirectToRoot={redirectToRoot}
                    productTypeList={this.productTypeList("footwear")}
                    resetDropDown={this.resetDropDown}
                    mainPage={withSmallMenu}
                  />
                )}
                {value === 2 && (
                  <DropDownMenu
                    redirectToRoot={redirectToRoot}
                    productTypeList={this.productTypeList("accessories")}
                    resetDropDown={this.resetDropDown}
                    mainPage={withSmallMenu}
                  />
                )}
              </div>
            )}
            {withSmallMenu && <Drawer />}
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));
