const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 800,
    margin: "10 0",
    [theme.breakpoints.down("xs")]: {
      margin: 0,
      padding: 4
    }
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  title: {
    margin: "0 15px",
    [theme.breakpoints.down("xs")]: {
      margin: "0 2px",
      fontSize: 14
    }
  },
  totalBlock: {
    margin: 20,
    // flexDirection: 'column',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    fontFamily:
      'Arial,Helvetica,FreeSans,"Liberation Sans","Nimbus Sans",sans-serif',
    fontSize: 24,
    [theme.breakpoints.down("xs")]: {
      margin: "0 3px"
    }
  },
  button: {
    fontSize: 16,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
      padding: "4px 6px"
    }
  },
  imageWrapper: {
    width: 150,
    height: 150,
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      width: 100,
      height: 100
    }
  },
  image: {
    height: "100%"
  },
  buttonClose: {
    borderRadius: "50%",
    width: 64,
    height: 64
  },
  totalPrice: {
    marginBottom: 5,
    [theme.breakpoints.down("xs")]: {
      fontSize: 20
    }
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 50,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14
    }
  },
  price: {
    margin: "0 15px",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14
    }
  },
  inputAmount: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 14
    }
  },
  dialog: {
    [theme.breakpoints.down("xs")]: {
      width: "100vw"
    }
  },
  dialogOrderForm: {
    position: "static !important",
    [theme.breakpoints.down("xs")]: {
      width: "100vw"
    }
  },
  paper: {
    [theme.breakpoints.down("xs")]: {
      margin: 0
    }
  },
  cardBlock: {
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      margin: "5px 5px 5px 15px",
      [theme.breakpoints.down("sm")]: {
        margin: 10
      }
    }
  },
  cardTitleBlock: {
    display: "flex"
  },
  cardTitle: {
    display: "inline-flex",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      display: "block"
    }
  },
  addedProduct: {
    marginLeft: 110,
    display: "inline-flex",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      marginLeft: 0
    }
  },
  dialogContent: {
    [theme.breakpoints.down("xs")]: {
      minWidth: "auto",
      padding: 5
    },
    margin: 0,
    padding: theme.spacing.unit * 2,
    maxWidth: 900,
    minWidth: 700
  }
});

export default styles;
