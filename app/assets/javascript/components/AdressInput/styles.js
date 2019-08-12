const styles = theme => ({
    root: {
      width: "100%",
      display: "inline-block",
      [theme.breakpoints.up("sm")]: {
        width: "190px"
      },
      [theme.breakpoints.up("md")]: {
        width: "350px"
      },
      [theme.breakpoints.up("lg")]: {
        width: "450px"
      }
    },
    item: {
      display: "flex",
      alignItems: "center",
      margin: "3px 5px",
      margin: "2px 0",
      cursor: "pointer",
      padding: "2px 10px",
      "&:hover": {
        background: "#ccf"
      }
    },
    inputWrap: {
      position: "relative"
    },
    mainWrap: {
      display: "flex"
    },
    dropDown: {
      position: "absolute",
      width: 400,
      maxHeight: 500,
      overflowY: "auto",
      fontSize: "15px",
      zIndex: 1,
      boxShadow: "4px 4px 10px #ccc"
    },
    textContent: {
      marginLeft: 15
    },
    linkItem: {
      tesxtDecoration: "none"
    },
    category: {
      fontSize: "15px"
    },
    inputBase: {
      width: `400px !important`
    }
  });

  export default styles