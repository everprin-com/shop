const styles = theme => ({
  root: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    lineHeight: "1.3",
    fontSize: "16px",
    minHeight: "100vh",
    justifyContent: "space-between",
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    [theme.breakpoints.up("xs")]: {
      maxWidth: "360px"
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "600px"
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "1000px"
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1200px"
    }
  },
  price: {
    color: "#000",
    fontSize: 24,
    lineHeight: "32px"
  },
  button: {
    fontSize: 16,
    marginTop: 10,
    padding: "6px 20px",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column"
  },
  mainContentInner: {
    display: "flex",
    // maxHeight: `600px`,
    overflow: `visible`,
    [theme.breakpoints.between("xs", "xs")]: {
      flexDirection: "column"
    },
    [theme.breakpoints.down("xs")]: {
      maxHeight: `none`
    }
  },
  slider: {
    width: "100%",
    zIndex: 2,
    height: 250
  },
  img: {
    [theme.breakpoints.between("xs", "xs")]: {
      flexDirection: "column"
    },
    [theme.breakpoints.down("xs")]: {
      maxHeight: 600
    }
  },
  textContent: {
    marginLeft: 35,
    [theme.breakpoints.down("xs")]: {
      marginTop: 0
    }
  },
  gelleryItem: {
    objectFit: "contain"
  },
  gelleryItemWrap: {
    maxWidth: "1000px",
    maxHeight: "700px",
    display: "flex !important",
    justifyContent: "center",
    height: "100%",
  },
  galleryDot: {
    width: 40,
    height: 40
  },
  tableSize: {
    cursor: "pointer",
    color: "#303f9f",
    display: "block",
    padding: "10px 0px",
    width: 200,
  },
  title: {
    fontSize: 24,
  },
  advantagesIcon: {
    fontSize: 32,
    color: "#889",
    marginRight: 13,
  },
  advantagesIconBlock: {
    padding: 5,
    color: "#889",
    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.11)",
    border: "1px solid #eee",
    borderRadius: 5,
    width: 140,
    display: "flex",
    alignItems: "center",
    margin: "5px 5px 25px"
  },
  advantages: {
    display: "flex",
  }
});

export default styles;
