const styles = theme => ({
    root: {
      [theme.breakpoints.up("xs")]: {
        width: "345px"
      },
      [theme.breakpoints.up("sm")]: {
        width: "600px"
      },
      [theme.breakpoints.up("md")]: {
        width: "1000px"
      },
      [theme.breakpoints.up("lg")]: {
        width: "1240px"
      },
      marginTop: "10px",
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      zIndex: 2,
      overflow: "visible"
    },
    tab: {
      fontSize: "16px",
      padding: "1px 12px 0",
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
        padding: 0,
      },
      [theme.breakpoints.only("md")]: {
        minWidth: 105
      },
    },
    tabContent: {
      fontSize: "15px",
      padding: 5
    },
    dropdownMenu: {
      position: "absolute",
      zIndex: 800,
      boxShadow: "2px 2px 5px #ccc",
      borderRadius: "4px",
      width: "100%",
      background: "#fff",
      [theme.breakpoints.down("xs")]: {
        maxHeight: 250,
        overflow: "auto",
      },
     
    },
    chooseCategoryMenu: {
      position: "relative",
      display: "flex",
      flexDirection: "row"
    },
    header: {
      // position: 'sticky',
      top: "0px",
      position: "fixed",
      zIndex: 5,
      background: "#ffff",
    },
    overflow: {
      overflow: "visible !important",
      maxWidth: "100%"
    },
    tabs: {
      minHeight: 70,
      overflow: "visible",
    },
    icon: {
      width: 40,
      height: 40,
      margin: "0 !important",
    },
    img: {
      width: "100%"
    },
    flexContainer: {
      alignItems: "center"
    },
    logo: {
      height: "100%",
      cursor: "pointer",
      [theme.breakpoints.down("xs")]: {
        // marginTop: "-5px",
        marginLeft: "-2px"
      }
    },
    logoWrap: {
      height: 70,
      [theme.breakpoints.down("xs")]: {
        width: 70,
        overflow: "hidden"
      }
    },
  });

export default styles