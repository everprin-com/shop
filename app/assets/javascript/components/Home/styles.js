const styles = theme => ({
    root: {
      display: "flex",
      marginTop: 60,
      paddingBottom: 60,
    },
    slider: {
      padding: 10,
      height: 305,
      position: "relative",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginLeft: 0
      }
    },
    main: {
      width: "100%",
      paddingTop: 70,
      boxSizing: "border-box",
      [theme.breakpoints.up("md")]: {
        paddingLeft: 260,
      },
    },
    sliderItem: {
      height: 250,
      cursor: "pointer",
    },
    img: {
      height: "100%",
      margin: "0 auto",
      borderRadius: "30%"
    },
    recImg: {
      height: "100%",
      margin: "0 auto",
      objectFit: "contain",
      maxWidth: "100%"
    },
    recImgWrap: {
      padding: "0 10px"
    },
    sliderContent: {
      textAlign: "center"
    },
    title: {
      fontSize: 20,
      color: "#333",
    },
    withoutTextDecoration: {
      textDecoration: "none",
    },
    recSlider: {
      height: 350,
      marginTop: 50,
      marginBottom: 50,
    },
    recTitle: {
      color: "#333",
      fontSize: "14px",
      fontWeight: "bold",
      paddingTop: 10,
    },
    recCategory: {
      color: "#888",
      fontSize: "14px",
      margin: "0 auto 5px"
    },
    price: {
      display: "flex",
      justifyContent: "center"
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
    linkToProductCart: {
      textDecoration: "none"
    },
    description: {
      fontSize: 16,
      padding: 30,
    },
    descriptionTitle: {
      fontSize: 18,
    }
  });

export default styles