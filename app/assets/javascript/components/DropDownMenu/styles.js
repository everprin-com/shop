const styles = theme => ({
    root: {
      marginTop: "10px",
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      zIndex: 2,
      width: 1240
    },
    categoryItem: {
      fontSize: "16px",
      margin: "15px",
      cursor: "pointer",
      textTransform: "lowercase",
      [theme.breakpoints.down("sm")]: {
        margin: "0px",
        fontSize: "12px"
      },
      [theme.breakpoints.down("xs")]: {
        margin: "0px",
        fontSize: "10px"
      },
      "&:hover": {
        color: "#3f51b5"
      }
    },
    categoryList: {
      listStyle: "none",
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 15
      }
    },
    categoryBlock: {
      display: "flex",
      [theme.breakpoints.down("xs")]: {
        padding: "0 10px"
      }
    },
    cardImg: {
      maxHeight: 185,
      width: "auto",
      marginTop: 20,
      marginLeft: 50,
      boxShadow: "5px 5px 10px #ccc, -5px -5px 10px #ccc"
    },
    img: {
      maxHeight: 185,
      width: "auto"
    }
  });
  
export default styles