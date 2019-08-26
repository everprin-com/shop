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
    padding: "5px !important",
    zIndex: 2,
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
    }
  },
  list: {
    listStyle: "none",
    margin: 5
  },
  link: {
    textDecoration: "none"
  },
  contacts: {
    width: 350,
    padding: 5,
    margin: "0 20px",
    display: "flex",
    alignItems: "center"
  },
  item: {
    cursor: "pointer",
    "&:hover": {
      color: "#303f9f"
    },
  },
  logoWrap: {
    maxHeight: 80
  },
  logo: {
    height: "100%",
    width: "auto"
  }
});

export default styles;
