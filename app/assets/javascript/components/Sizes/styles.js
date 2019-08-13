const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
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
  chipSmall: {
    display: "inline-block",
    verticalAlign: "top",
    lineHeight: "18px",
    minWidth: "auto",
    width: "auto",
    padding: "0 6px",
    margin: "0 8px 8px 0",
    "&:hover": {
      backgroundColor: "#2C9925 !important",
      color: "eee"
    }
  },
  active: {
    backgroundColor: "#2C9925 !important",
    color: "eee"
  },
  label: {
    padding: 0,
    color: "red"
  }
});

export default styles;
