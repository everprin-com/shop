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
  title: {
    textAlign: "center",
    marginBottom: "5px"
  },
  sizeItem: {
    display: "inline-block",
    verticalAlign: "top",
    lineHeight: "18px",
    minWidth: "auto",
    width: "auto",
    padding: "0 6px",
    margin: "0 8px 8px 0",
    borderRadius: 3,
    backgroundRolor: "#ffffff",
    cursor: "pointer",
    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.11)",
    "&:hover": {
      background: "#2C9925",
      color: "#fff"
    }
  },
  active: {
    background: "#2C9925",
    color: "#fff"
  }
});

export default styles