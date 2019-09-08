const styles = theme => ({
  root: {
    marginTop: 10,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    minHeight: "100vh",
    alignItems: "flex-start",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      justifyContent: "space-around"
    },
    [theme.breakpoints.down("xs")]: {
      justifyContent: "flex-start"
    }
  },
  rootCart: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // minHeight: "100vh",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center"
    }
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    padding: 50,
    marginLeft: 260
  },
  wraper: {
    zIndex: 2
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    padding: 30
  }
});

export default styles;
