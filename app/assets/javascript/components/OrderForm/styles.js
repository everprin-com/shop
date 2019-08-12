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
      width: 375
    }
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  root: {
    width: "950px",
    margin: "70px auto 0",
    boxSizing: "border-box",
    [theme.breakpoints.down("xs")]: {
      width: "375px",
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
    overflow: "hidden"
  }
});

export default styles;
