const styles = theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto",
      borderColor: "transparent",
      boxShadow: "none",
      display: "none"
    },
    cell: {
      fontSize: 14,
      padding: 3,
      border: "none"
    },
    table: {
      overflow: "hidden",
      [theme.breakpoints.down("sm")]: {
        minWidth: 300
      },
      [theme.breakpoints.up("sm")]: {
        minWidth: 360
      },
      [theme.breakpoints.up("md")]: {
        minWidth: 600
      },
      [theme.breakpoints.up("lg")]: {
        minWidth: 700
      }
    },
    title: {
      fontWeight: "bold"
    },
    row: {
      borderBottom: "1px solid #eee",
      outlineColor: "transparent",
      height: 35
    },
    aboutProduct: {
      fontSize: 20,
      fontWeight: "bold"
    },
    forMobile: {
      [theme.breakpoints.down("xs")]: {
        display: "block"
      }
    },
    forDesktop: {
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    }
  });

  export default styles