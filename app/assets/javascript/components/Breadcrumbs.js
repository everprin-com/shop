import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
    root: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 150,
      },
  });

 function SimpleBreadcrumbs({classes, links}) {

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
          {links.map((link, index)=> <Link to={link.href} >
            {`${link.title} ${links.length-1 == index ? " " : " /"}`}
          </Link>)}
      </Paper>
    </div>
  );
}

export default withStyles(styles)(SimpleBreadcrumbs)