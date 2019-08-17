const styles = theme => ({
  root: {
    position: "fixed",
    marginTop: 100,
    width: "100%",
    maxWidth: 260,
    backgroundColor: theme.palette.background.paper,
    display: "inline-block",
    zIndex: 3,
    overflow: "auto",
    maxHeight: "calc(100vh - 260px)",
  },
  mainSideBar: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  smallSideBar: {
    width: 265,
    marginTop: 0
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  item: {
    padding: 0
  }
});

export default styles;
