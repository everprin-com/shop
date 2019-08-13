const styles = theme => ({
  root: {
    margin: "0 auto",
    display: "flex",
    fontFamily: "Arial",
    flexDirection: "column",
    lineHeight: "1.3",
    fontSize: "16px",
    minHeight: "100vh",
    justifyContent: "space-between",
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
    fontSize: 16
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
    marginLeft: 20,
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
    justifyContent: "center"
  },
  galleryDot: {
    width: 40,
    height: 40
  }
});

export default styles;