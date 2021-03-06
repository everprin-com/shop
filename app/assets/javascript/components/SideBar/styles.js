const styles = theme => ({
  root: {
    position: "fixed",
    marginTop: 70,
    width: "100%",
    maxWidth: 260,
    backgroundColor: theme.palette.background.paper,
    display: "inline-block",
    zIndex: 3,
    overflow: "auto",
    maxHeight: "calc(100vh - 220px)",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "100vh",
    }
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
  },
  link: {
    textDecoration: "none",
    color: "333",
    cursor: "pointer"
  },
  sideBarPanelItem: {
    padding: "5px 10px",
    borderBottom: "1px solid #eee",
    "&:hover": {
      background: "#ddd"
    }
  },
  sideBarPanel: {
    position: "absolute",
    maxHeight: "100vh",
    marginTop: 70,
    overflow: "auto",
  }
});

export default styles;
