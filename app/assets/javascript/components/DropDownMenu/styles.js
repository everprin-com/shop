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
      margin: "10px",
      cursor: "pointer",
      textTransform: "lowercase",
      paddingBottom: 7,
      borderBottom: '1px solid #ccc',
      textAlign: 'center',
      [theme.breakpoints.down("sm")]: {
        margin: "0px",
        fontSize: "12px"
      },
      [theme.breakpoints.down("xs")]: {
        margin: "5px",
        fontSize: "15px"
      },
      "&:hover": {
        color: "#3f51b5"
      }
    },
    categoryList: {
      listStyle: "none",
      paddingLeft: 7
    },
    categoryBlock: {
      display: "flex",
      // background: "no-repeat right/29% url('https://alifaq.info/wp-content/uploads/2017/10/odezhda.jpg')",
      [theme.breakpoints.down("xs")]: {
        padding: "0 10px",
        justifyContent: "center",
      },
    },
    categoryTypeList: {
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