const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
    fontSize: "16px !important",
    display: "block",
    [theme.breakpoints.down("xs")]: {
      width: 360
    }
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  root: {
    width: "950px",
    margin: "0 auto 0",
    minHeight: "100vh",
    padding: "70px 5px 0px",
    boxSizing: "border-box",
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    background: "#fff",
    boxShadow: "1px 1px 1px rgba(0,0,0,.1), -1px 1px 1px rgba(0,0,0,.1)",
    [theme.breakpoints.down("xs")]: {
      width: "360px",
      padding: 5,
      margin: "10px auto 0"
    }
    // [theme.breakpoints.down("xs")]: {
    //   width: "600px"
    // }
  },
  content: {
    marginTop: 50,
    display: "flex",
    justifyContent: "space-around",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
      marginTop: 10
    }
  },
  button: {
    marginTop: 15
  },
  askForm: {
    display: "none"
  },
  error: {
    color: "d00",
    width: 400
  },
  cartMicro: {
    maxWidth: 550,
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100vw"
    }
  },
  imgWrap: {
    [theme.breakpoints.down("xs")]: {
      height: 100
    }
  },
  logo: {
    [theme.breakpoints.down("xs")]: {
      height: "100%",
      width: "auto"
    }
  },
  form: {
    // overflow: "hidden"
  },
  commentTextarea: {
    resize: "none",
    width: "100%",
    padding: 10,
  },
  addComment: {
    fontSize: 16,
    color: "#303f9f",
    margin: "10px 0",
    cursor: "pointer",
  }
});

export default styles;
