const styles = theme => ({
    root: {
      display: "flex",
      justifyContent: "space-around"
    },
    panel: {
      width: 560
    },
    icon: {
      fontSize: "40px",
      verticalAlign: "middle",
      cursor: "pointer"
    },
    cardText: {
      fontSize: "18px",
      fontWeight: "bold",
      verticalAlign: "middle",
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px"
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 0
      }
    },
    dialog: {
      [theme.breakpoints.down("xs")]: {
        width: '100vw',
      }
    },
    paper: {
      [theme.breakpoints.down("xs")]: {
        margin: 0
      }
    },
      dialogContent: {
      [theme.breakpoints.down("xs")]: {
        minWidth: "auto",
        padding: 5,
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
        display: "block",
      },
    },
    addedProduct: {
      marginLeft: 110,
      display: "inline-flex",
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
        marginLeft: 0,
      },
    }
  });

export default styles