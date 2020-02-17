const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: 15,
    display: "flex",
    justifyContent: "space-around",
    overflow: "hidden",
    boxSizing: "border-box",
    position: "fixed",
    bottom: 0,
    fontSize: 15,
    padding: "0px !important",
    zIndex: 2,
    maxWidth: "100%",
    [theme.breakpoints.up("xs")]: {
      width: "360px",
      fontSize: 12,
    },
    [theme.breakpoints.up("sm")]: {
      width: "600px"
    },
    [theme.breakpoints.up("md")]: {
      width: "1000px"
    },
    [theme.breakpoints.up("lg")]: {
      width: "1200px"
    },
  },
  list: {
    listStyle: "none",
    margin: 2,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 10,
    }
  },
  link: {
    textDecoration: "none"
  },
  contacts: {
    width: 350,
    padding: 5,
    margin: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    }
  },
  item: {
    cursor: "pointer",
    "&:hover": {
      color: "#303f9f"
    },
  },
  logoWrap: {
    maxHeight: 50
  },
  logo: {
    height: "100%",
    width: "auto",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    }
  },
  contactsRow: {
    margin: 0
  }
});

export default styles;
