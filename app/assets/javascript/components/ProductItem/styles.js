const styles = theme => ({
  card: {
    zIndex: 0,
    position: "relative",
    cursor: "pointer",
    width: 210,
    margin: "5px 5px 0 5px",
    // border: "10px solid transparent",
    transition: "transform .2s",
    overflow: "inherit",
    minHeight: 430,
    "&:hover": {
      zIndex: 1,
      // borderTop: '10px solid #eee',
      transform: "scale(1.05, 1.05)"
      // boxShadow: '2px 2px 16px rgba(0,0,0,.24), -2px -2px 16px rgba(0,0,0,.24) ',
    },
    [theme.breakpoints.down("xs")]: {
      width: 340
    }
  },

  cardDesctiption: {
    fontSize: "auto",
    textAlign: "center"
  },
  title: {
    color: "#333",
    fontSize: "14px",
    fontWeight: "bold"
  },
  category: {
    color: "#888",
    fontSize: "14px",
    margin: "0 auto 5px"
  },
  oldPrice: {
    color: "#a6a5a5",
    fontSize: "14px",
    textDecoration: "line-through",
    paddingBottom: "5px"
  },
  newPrice: {
    color: "f74137",
    fontSize: "17px",
    marginLeft: 15
  },
  price: {
    display: "flex",
    justifyContent: "center"
  },
  media: {
    height: 190,
    paddingTop: "56.25%", // 16:9
    backgroundSize: "contain"
  },
  actions: {
    display: "flex",
    padding: "0 4px 7px"
  },
  productItemLink: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    height: 430,
    // justifyContent: 'space-around',
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none"
    }
  },
  button: {
    margin: "0px auto 15px",
    width: "90%",
    fontSize: "15px"
  },
  cardIn: {
    // left: 0,
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // right: 0,
  },
  activeCard: {
    position: "absolute",
    textAlign: "center",
    top: "98%",
    // width: 209,
    left: 0,
    right: 0,
    display: "block",
    background: "#fff",
    boxShadow: "1px 1px rgba(0,0,0, 0.1), -1px 1px rgba(0,0,0,0.1)",
    [theme.breakpoints.down("xs")]: {
      position: "static",
      marginTop: 40
    }
  },
  cardContent: {
    padding: 5,
    "&:last-child": {
      paddingBottom: 0
    }
  },
  badge: {
    float: `left`,
    margin: `20px 30px`
  },
  navArr: {
    fontSize: 40,
    position: "absolute",
    top: "50%",
    background: "#fff",
    color: "#aaa",
    transform: "translate(0, -50%)"
  },
  navArrNext: {
    right: 0
  },
  navArrPrev: {
    left: 0
  },
  imgWrap: {
    position: "relative"
  }
});

export default styles;
