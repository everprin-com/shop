const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: 5,
    maxWidth: 800,
    margin: "10 0"
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  title: {
    margin: 0
  },
  totalBlock: {
    margin: 20,
    // flexDirection: 'column',
    display: "flex",
    alignItems: "flex-end",
    fontFamily:
      'Arial,Helvetica,FreeSans,"Liberation Sans","Nimbus Sans",sans-serif',
    fontSize: 24,
    justifyContent: "flex-end"
  },
  button: {
    fontSize: 16
  },
  imageWrapper: {
    width: 200,
    height: 200
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
    marginBottom: 5
  },
  contentText: {
    display: "flex",
    flexDirection: "column",
    minWidth: 100
  },
  contentTextBottom: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20
  }
});

export default styles;
