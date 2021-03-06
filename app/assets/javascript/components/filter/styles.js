const styles = {
  root: {
    color: "#111",
    width: "100%",
    pointerEvents: "auto"
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 16,
    width: "100%",
    background: "#eee",
    fontWeight: "bold",
    padding: 10,
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    boxSizing: "border-box"
  },
  container: {
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "center",
    paddingLeft: 10,
    margin: 5
  },
  checkbox: {
    padding: 0
  },
  list: {
    paddingLeft: 10,
    display: "block",
    width: "100%"
  },
  label: {
    fontSize: `15px`
  },
  titleReset: {
    fontSize: 13,
    cursor: "pointer",
    fontWeight: "normal",
    "&:hover": {
      color: "#555"
    }
  },
  contentWrap: {
    padding: "5px 15px",
    maxHeight: 130,
    overflowY: "auto"
  },
  inputWrap: {
    margin: "10px 0",
    fontSize: 17
  },
  fromTo: {
    margin: "0 4px"
  },
  inputNumber: {
    width: "65px !important",
    padding: 5,
    borderRadius: 5,
    outline: "none",
    border: "solid #ccc 1px",
  },
  inputLeft: {
    marginLeft: "5px !important"
  },
  inputRight: {
    marginLeft: "5px !important"
  }
};

export default styles;
