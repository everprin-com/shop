import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import MenuGenderPanel from './MenuGenderPanel'
import Panel from './Panel'
import DropDownMenu from './DropDownMenu';

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

const styles = theme => ({
  root: {
    marginTop: '10px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    zIndex: 2,
    width: 1240,
  },
  tab: {
    fontSize: '16px',
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
    position: 'fixed',
    zIndex: 3,
  }
});

class Header extends React.Component {
  state = {
    value: 100,
  };

  handleChange = (event, value) => this.setState({ value });

  hoverOn = value => this.handleChange("", value)

  resetDropDown = () => this.setState({ value: 100});

  render() {
    const { classes, redirectToRoot } = this.props;
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
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab className={classes.tab} label="Одежда" icon={<PhoneIcon />} onMouseEnter={this.hoverOn.bind(this, 0)} />
                <Tab className={classes.tab} label="Обувь" icon={<FavoriteIcon />} onMouseEnter={this.hoverOn.bind(this, 1)} />
                <Tab className={classes.tab} label="Аксессуары" icon={<PersonPinIcon />} onMouseEnter={this.hoverOn.bind(this, 2)} />
                <Panel />
              </Tabs>
            </AppBar>

            {this.state.value !==100 && <div className={classes.dropdownMenu} onMouseLeave={this.resetDropDown}>
              {true  && <TabContainer className={classes.tab_content}>
                <DropDownMenu redirectToRoot={redirectToRoot} />
              </TabContainer>}
              {/* {value === 1 && <TabContainer className={classes.tab_content}>
                {this.clothesList()}  
              </TabContainer>}
              {value === 2 && <TabContainer className={classes.tab_content}>
                {this.clothesList()}  
              </TabContainer>} */}
            </div>}
          </div>
        </div>
      </header>

    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header)