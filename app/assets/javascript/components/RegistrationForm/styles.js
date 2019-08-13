const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
    fontSize: "16px !important",
    display: "block"
  },
  root: {
    width: "900px",
    margin: "100px auto 0",
    display: "flex",
    justifyContent: "space-around"
  },
  button: {
    marginTop: 15
  }
});

export default styles;
