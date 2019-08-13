const styles = theme => ({
  root: {
    width: "100%"
  },
  content: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  contentForBig: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap"
  },
  title: {
    marginBottom: "5px",
    fontSize: 14
  },
  sizeItem: {
    display: "inline-block",
    verticalAlign: "top",
    minWidth: "auto",
    width: "auto",
    margin: "0 2px 2px 0",
    borderRadius: 8,
    backgroundRolor: "#ffffff",
    cursor: "pointer",
    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.11)",
    fontSize: 12,
    "&:hover": {
      background: "#2C9925",
      color: "#fff"
    },
    [theme.breakpoints.up("xs")]: {
      padding: "2px 8px"
    },
    [theme.breakpoints.up("sm")]: {
      padding: "4px 14px"
    },
    [theme.breakpoints.up("md")]: {
      padding: "7px 20px"
    }
  },
  chipBig: {
    borderRadius: 4,
    minWidth: 50,
    width: "auto",
    fontSize: 16,
    padding: "0 8px",
    borderWidth: 0,
    lineHeight: "40px",
    boxShadow: "0 1px 3px 0 rgba(0,0,0,0.24), 0 1px 1px 0 rgba(0,0,0,0.08)",
    margin: 1,
    "&:hover": {
      backgroundColor: "#2C9925 !important",
      color: "eee"
    }
  },
  active: {
    background: "#2C9925",
    color: "#fff"
  },
  sizeSmall: {
    padding: "0 4px"
  }
});

export default styles;
