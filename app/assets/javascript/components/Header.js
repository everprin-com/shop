import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MenuGenderPanel from './MenuGenderPanel'
import Panel from './Panel'
import DropDownMenu from './DropDownMenu';
import Drawer from './Drawer';

const mapStateToProps = state => {
  return {
    headers: state.metaData.headers,
  }
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function CastomIcon({src ,classes}) {
  return (
    <div className={classes.icon}>
      <img className={classes.img} src={`/imgs/${src}`} />
    </div>
  )
}

const styles = theme => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      width: '320px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '600px',
    },
    [theme.breakpoints.up('md')]: {
      width: '1000px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '1240px',
    },
    marginTop: '10px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    zIndex: 2,
    overflow: "visible"
  },
  tab: {
    fontSize: '16px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
    },
  },
  tab_content: {
    fontSize: '15px',
  },
  dropdownMenu: {
    position: 'absolute',
    zIndex: 9999,
    background: '#fff',
    boxShadow: '2px 2px 5px #ccc',
    borderRadius: '4px',
    width: '100%',
  },
  chooseCategoryMenu: {
    position: 'relative',
  },
  header: {
    // position: 'sticky',
    // top: '0px',
    position: 'fixed',
    zIndex: 3,
  },
  overflow: {
    overflow: "visible",
    maxWidth: "100%",
  },
  tabs: {
    minHeight: 80,
    overflow: "visible"
  },
  icon: {
    width: 40,
    height: 40,
  },
  img: {
    width: '100%'
  },
  flexContainer: {
    alignItems: 'center'
  },
});

class Header extends React.PureComponent {
  constructor(props) {
    super(props)
    this.dropDownRef = React.createRef()
  }

  state = {
    value: false,
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  productTypeList = type => {
    const { headers } = this.props;
    if (!headers) return
    const typeCategory = headers.filter(header => header.group == type)
    const catalogues = Object.keys(typeCategory).map(key => typeCategory[key]["catalogue"])
    return catalogues
  }

  handleClickOutside = event => {
    const domNode = this.dropDownRef.current

    if ((!domNode || !domNode.contains(event.target))) {
      this.resetDropDown()
    }
  }

  handleChange = (event, value) => this.setState({ value });

  hoverOn = value => this.handleChange("", value)

  resetDropDown = () => this.setState({ value: false});

  render() {
    const { classes, redirectToRoot, withSmallMenu } = this.props;
    const { value } = this.state;

    return (
      <header className={`${classes.header} header`}>
        <div className="header-content">
          <div className={classes.root}>
            <MenuGenderPanel />

            <AppBar position="static" color="default" className={classes.chooseCategoryMenu}>
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                classes={{
                  root: classes.tabs ,
                  scroller: classes.overflow,
                  flexContainer: classes.flexContainer}}
              >
                <Tab className={classes.tab} label="Одежда" icon={<CastomIcon classes={classes} src="clothes.png" />} onMouseEnter={this.hoverOn.bind(this, 0)} />
                <Tab className={classes.tab} label="Обувь" icon={<CastomIcon classes={classes} src="shoe.png" />} onMouseEnter={this.hoverOn.bind(this, 1)} />
                <Tab className={classes.tab} label="Аксессуары" icon={<CastomIcon classes={classes} src="watch.svg" />} onMouseEnter={this.hoverOn.bind(this, 2)} />
                <Panel />
              </Tabs>
            </AppBar>
            {this.state.value !== false && <div className={classes.dropdownMenu} ref={this.dropDownRef} onMouseLeave={this.resetDropDown}>
              {value === 0  && <TabContainer className={classes.tab_content}>
                <DropDownMenu productTypeList={this.productTypeList("clothes")} redirectToRoot={redirectToRoot} resetDropDown={this.resetDropDown} />
              </TabContainer>}
              {value === 1 && <TabContainer className={classes.tab_content}>
                <DropDownMenu productTypeList={this.productTypeList("footwear")} redirectToRoot={redirectToRoot} resetDropDown={this.resetDropDown} />
              </TabContainer>}
              {value === 2 && <TabContainer className={classes.tab_content}>
                <DropDownMenu productTypeList={this.productTypeList("accessories")} redirectToRoot={redirectToRoot} resetDropDown={this.resetDropDown} />
              </TabContainer>}
            </div>}
            {withSmallMenu && <Drawer />}
          </div>
        </div>
      </header>

    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(withStyles(styles)(Header))
